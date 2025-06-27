package main

import (
	"go-gin-api/db"
	router "go-gin-api/router"
	"log"
	"os"
	"runtime"

	"go-gin-api/models"

	"github.com/gin-gonic/gin"
)

var (
	Router *gin.Engine
)

func main() {
	runtime.GOMAXPROCS(2)
	env := os.Getenv("ENV")
	if env == "Production" || env == "Deployment" {
		gin.SetMode(gin.ReleaseMode)
	}

	dbType := os.Getenv("DB_TYPE")
	db.ConnectDB(dbType)
	Router = router.GetRouter()
	models.MigrateDB(db.DB)

	log.Fatal(Router.Run(":5000"))

}
