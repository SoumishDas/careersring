package client

import (
	"go-gin-api/db"
	"go-gin-api/models"
)

func CreateClient(c models.Client) models.Client {
	db.DB.Create(&c)
	return c
}

func GetAllClients() []models.Client {
	var clients []models.Client
	db.DB.Preload("POCs").Find(&clients)
	return clients
}

func FindClientByID(id uint) (models.Client, error) {
	var c models.Client
	result := db.DB.Preload("POCs").First(&c, id)
	return c, result.Error
}

func UpdateClient(c models.Client) models.Client {
	db.DB.Save(&c)
	return c
}

func DeleteClient(c models.Client) {
	db.DB.Delete(&c)
}

func CreatePOC(p models.POC) models.POC {
	db.DB.Create(&p)
	return p
}

func GetPOC(id uint) (models.POC, error) {
	var p models.POC
	result := db.DB.First(&p, id)
	return p, result.Error
}

func UpdatePOC(p models.POC) models.POC {
	db.DB.Save(&p)
	return p
}

func DeletePOC(p models.POC) {
	db.DB.Delete(&p)
}

func ListPOCs() []models.POC {
	var p []models.POC
	db.DB.Find(&p)
	return p
}
