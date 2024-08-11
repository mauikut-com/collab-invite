docker compose up
curl localhost:8000/events
dbmate up
?? dbmate dump, sqlx migrate

DATABASE_URL=postgres://pguser:changeme@0.0.0.0:5432/$POSTGRES_USER?sslmode=disable
