package db

import (
	"fmt"
	"log"
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	_ "github.com/lib/pq" // Postgres driver
)

var DB gorm.DB

// Connecting to db
func ConnectDB(dbType string) {
	if dbType == "" {
		dbType = "sqlite3"
	}

	if dbType == "postgres" {
		dsn := os.Getenv("POSTGRES_DSN")
		if dsn == "" {
			dbName := "Test"
			if os.Getenv("ENV") == "Production" {
				dbName = "Prod"
			}
			dsn = fmt.Sprintf("user=postgres host=43.205.211.80 dbname=%s sslmode=disable password=chikoo123", dbName)
		}
		db, err := gorm.Open("postgres", dsn)
		if err != nil {
			log.Fatal("Error Connecting to db")
		}
		DB = *db
	} else if dbType == "sqlite3" {
		path := os.Getenv("SQLITE_PATH")
		if path == "" {
			path = "./test.db"
		}
		db, err := gorm.Open("sqlite3", path)
		if err != nil {
			log.Fatal("Error Connecting to db")
		}
		DB = *db
	} else {
		log.Fatal("Invalid db type")
	}

}

// CloseDB closes the database connection. It should be called when the program
// is exiting to ensure that the connection is properly closed.
func CloseDB() {
	err := DB.Close()
	if err != nil {
		println("Failed to Close DB")
	}
}
