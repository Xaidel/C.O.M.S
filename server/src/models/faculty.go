package models

type Faculty struct {
	User
	ID     uint
	UserID uint `gorm:"not null"`
}
