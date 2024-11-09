package models

type Dean struct {
	User
	ID     uint
	UserID uint `gorm:"not null"`
}
