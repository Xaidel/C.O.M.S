package models

type Student struct {
	User      User
	Program   Program
	ProgramID uint `gorm:"not null"`
	UserID    uint `gorm:"not null"`
	ID        uint
}
