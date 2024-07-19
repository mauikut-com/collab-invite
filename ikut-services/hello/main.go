package main

import (
	"context"
	"fmt"
	"os"

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
		_, txErr = tryInviterInsert(tx, event_id)
		return txErr
	})
	return err
}

func main() {
	conn, err := pgx.Connect(context.Background(), os.Getenv("CONNECT_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	err = eventCreate(conn, 1, "kb jeruk")
	if err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
	}
}
