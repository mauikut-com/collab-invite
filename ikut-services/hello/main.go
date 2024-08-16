package main

import (
	"context"
	"fmt"
	// "html"
	// "log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
	"github.com/jackc/pgx/v5"
)

// effects: `event` `inviter`
func eventCreate(conn *pgx.Conn, inviter_user_id int, location string) error {
	tryEventInsert := func(tx pgx.Tx) (int, error) {
		sql := fmt.Sprintf(`
		INSERT INTO event (start, "end", location)
		VALUES ('now()'::timestamp without time zone, 'now()'::timestamp without time zone, '%s'::text)
		RETURNING id`,
		location)

		var event_id int
		txErr := tx.QueryRow(context.Background(), sql).Scan(&event_id)
		return event_id, txErr
	}

	tryInviterInsert := func(tx pgx.Tx, event_id int) (int, error) {
		sql := fmt.Sprintf(`
		INSERT INTO inviter (event_id, user_id)
		VALUES (%d, %d)
		RETURNING id`,
		event_id, inviter_user_id)

		var inviter_id int
		txErr := tx.QueryRow(context.Background(), sql).Scan(&inviter_id)
		return inviter_id, txErr
	}

	err := pgx.BeginFunc(context.Background(), conn, func(tx pgx.Tx) error {
		event_id, txErr := tryEventInsert(tx)
		_, txErr         = tryInviterInsert(tx, event_id)
		return txErr
	})
	return err
}

type Event struct {
	// ?? ordering, nobackdate
	Start    string `json:"start"    binding:"datetime=2006-01-02T15:04:05Z07:00,required"`
	End      string `json:"end"      binding:"datetime=2006-01-02T15:04:05Z07:00"`
	Location string `json:"location" binding:"required"`
}

// Validations: No backdates for Start; Start End ordering.
func EventStructLevel(sl validator.StructLevel) {
	item := sl.Current().Interface().(Event)
	startAsTime, _ := time.Parse(time.RFC3339, item.Start)
	endAsTime, _ := time.Parse(time.RFC3339, item.End)

	if time.Now().After(startAsTime) {
		sl.ReportError(item.Start, "Start", "start", "nobackdate", "")
	}

	if startAsTime.After(endAsTime) {
		sl.ReportError(item.End, "End", "end", "endgtestart", "")
	}
}


// // "use a single instance of Validate, it caches struct info"
// // 
// // https://github.com/go-playground/validator/blob/master/_examples/struct-level/main.go
// var vali *validator.Validate

func connectOrExit() *pgx.Conn {
	connUrl := os.Getenv("CONNECT_URL")
	conn, err := pgx.Connect(context.Background(), connUrl)
	if err != nil {
		fmt.Fprintf(os.Stderr, "CONNECT_URL=%s\n%v", connUrl, err)
		os.Exit(1)
	}
	return conn
}

func noCors() gin.HandlerFunc {
	return func(gc *gin.Context) {
		gc.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		gc.Next()
	}
}


func main() {
	conn := connectOrExit()
	defer conn.Close(context.Background())

	router := gin.Default()
	router.SetTrustedProxies([]string{"127.0.0.1",})
	router.Use(noCors())  // ?? config dev

	if ginV, ok := binding.Validator.Engine().(*validator.Validate); ok {
		ginV.RegisterStructValidation(EventStructLevel, Event{})
	}

	router.POST("/event", func(gc *gin.Context) {
		live := true

		var item Event
		bindingErr := gc.ShouldBindJSON(&item)
		if bindingErr != nil {
			live = false
			fmt.Fprintf(os.Stderr, "%v\n", bindingErr)
		}

		user_id := 1
		connErr := eventCreate(conn, user_id, item.Location)
		// connErr := eventCreate(conn, user_id, item.location)
		if connErr != nil {
			live = false
			fmt.Fprintf(os.Stderr, "%v\n", connErr)
		}

		if live {
			gc.JSON(http.StatusOK, gin.H{ "itemok": item })
		} else {
			gc.JSON(http.StatusInternalServerError, "todo:formy")
		}

	})

	router.Run()
}
