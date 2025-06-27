package client

import (
	"net/http"
	"strconv"

	"go-gin-api/models"

	"github.com/gin-gonic/gin"
)

type Controller struct{}

func NewController() *Controller { return &Controller{} }

func (ctl *Controller) CreateClient(c *gin.Context) {
	var body models.Client
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	client := CreateClient(body)
	c.JSON(http.StatusCreated, client)
}

func (ctl *Controller) ListClients(c *gin.Context) {
	c.JSON(http.StatusOK, GetAllClients())
}

func (ctl *Controller) GetClient(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	cl, err := FindClientByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, cl)
}

func (ctl *Controller) UpdateClient(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var body models.Client
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	body.ID = uint(id)
	c.JSON(http.StatusOK, UpdateClient(body))
}

func (ctl *Controller) DeleteClient(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	cl, err := FindClientByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	DeleteClient(cl)
	c.Status(http.StatusNoContent)
}

func (ctl *Controller) CreatePOC(c *gin.Context) {
	var body models.POC
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	p := CreatePOC(body)
	c.JSON(http.StatusCreated, p)
}

func (ctl *Controller) ListPOCs(c *gin.Context) {
	c.JSON(http.StatusOK, ListPOCs())
}

func (ctl *Controller) GetPOC(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	p, err := GetPOC(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, p)
}

func (ctl *Controller) UpdatePOC(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var body models.POC
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	body.ID = uint(id)
	c.JSON(http.StatusOK, UpdatePOC(body))
}

func (ctl *Controller) DeletePOC(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	p, err := GetPOC(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	DeletePOC(p)
	c.Status(http.StatusNoContent)
}
