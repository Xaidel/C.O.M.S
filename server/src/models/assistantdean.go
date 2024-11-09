package models

type AssistantDean struct {
	User
	UserID uint `gorm:"not null"`
	ID     uint
}
