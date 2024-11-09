package models

type ProgramHead struct {
	User
	Program
	UserID    uint `gorm:"not null"`
	ProgramID uint `gorm:"not null"`
	ID        uint
}
