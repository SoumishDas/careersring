package models

import "github.com/jinzhu/gorm"

// Client represents an organisation using the platform.
type Client struct {
	gorm.Model
	Name    string `gorm:"not null"`
	Address *string
	POCs    []POC
}

// POC stands for point of contact for a client.
type POC struct {
	gorm.Model
	ClientID uint
	Name     string `gorm:"not null"`
	Email    *string
	Phone    *string
}
