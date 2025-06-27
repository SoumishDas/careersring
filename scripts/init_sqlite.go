package main

import (
	"go-gin-api/db"
	"go-gin-api/models"
)

func main() {
	db.ConnectDB("sqlite3")
	models.MigrateDB(&db.DB)

	sample := models.MasterCandidate{FullName: "Test User", Email: ptr("test@example.com")}
	db.DB.Create(&sample)
	db.CloseDB()
}

func ptr(s string) *string { return &s }
