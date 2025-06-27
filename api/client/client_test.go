package client

import (
	"os"
	"testing"

	"go-gin-api/db"
	"go-gin-api/models"
)

func TestClientCRUDSQLite(t *testing.T) {
	os.Setenv("SQLITE_PATH", "./client_test.db")
	db.ConnectDB("sqlite3")
	defer func() { db.CloseDB(); os.Remove("./client_test.db") }()
	models.MigrateDB(db.DB)

	c := CreateClient(models.Client{Name: "Acme"})
	if c.ID == 0 {
		t.Fatal("client not created")
	}

	p := CreatePOC(models.POC{Name: "Bob", ClientID: c.ID})
	if p.ID == 0 {
		t.Fatal("poc not created")
	}

	fetched, err := FindClientByID(c.ID)
	if err != nil || len(fetched.POCs) != 1 {
		t.Fatalf("fetch failed: %v", err)
	}
}
