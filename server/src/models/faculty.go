package models

type Faculty struct {
	User   User
	UserID uint `gorm:"not null"`
	ID     uint
}
