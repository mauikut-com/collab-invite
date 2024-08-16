use axum::{response::Html, routing::{get, post}, Router, http::{Method, HeaderValue, StatusCode}};
use tower_http::cors::CorsLayer;
use std::env;
use dotenv::dotenv;

#[tokio::main]
async fn main() {
    dotenv().ok();
    let db_connection_str = env::var("DATABASE_URL").expect("DATABASE_URL must be set.");
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .acquire_timeout(std::time::Duration::from_secs(3))
        .connect(&db_connection_str)
        .await
        .expect("can't connect to database");

    let app = Router::new()
        .route("/events", post(event_create))
        .route("/events", get(event_read))
        // https://github.com/tokio-rs/axum/blob/main/examples/cors/src/main.rs
        // https://docs.rs/tower-http/latest/tower_http/cors/index.html
        .layer(CorsLayer::new()
               .allow_origin("http://localhost:3000".parse::<HeaderValue>().unwrap())  // ?? env FRONTEND_PORT
               .allow_methods([Method::GET, Method::POST])
               .allow_headers([axum::http::header::CONTENT_TYPE])).with_state(pool);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8000")
        .await
        .unwrap();
    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Clone)]
struct Event {
    name: String,
    location: String,
    // #[serde(flatten)]
    // extra: Map<String, Value>,
}

async fn db_insert(pool: &PgPool, event: Event) -> anyhow::Result<i64> {
    let rec = sqlx::query!(
        r#"
INSERT INTO event ( name, location )
VALUES ( $1, $2 )
RETURNING id
        "#,
        event.name,
        event.location
    )
    .fetch_one(pool)
    .await?;

    Ok(rec.id)
}

use axum::{
    response::Json,
};

async fn event_create(
    State(pool): State<PgPool>,
    Json(ev): Json<Event>,
) -> Html<String> {
    let Event{name, location }= ev;
    let res = db_insert(&pool, Event {name, location}).await;
    match res {
        _ => Html(String::from("todo"))
    }
}

async fn event_read() -> Html<&'static str> {
    Html("<h1>yea of events</h1>")
}

// docker compose up rds-postgres
// dbmate new event_tables; psql -h 0.0.0.0 -p 5432 -U pguser
//
// post("localhost:8000/events")
// fetch("localhost:8000/events")

// ?? mod db

use sqlx::postgres::{PgPool, PgPoolOptions};
use axum::extract::State;

fn internal_error<E>(err: E) -> (StatusCode, String)
where
    E: std::error::Error,
{
    (StatusCode::INTERNAL_SERVER_ERROR, err.to_string())
}
