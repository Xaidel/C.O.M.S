package models

type Student struct {
	UserID    string `gorm:"unique;not null"`
	User      User
	Program   Program
	ProgramID uint `gorm:"not null"`
	ID        uint
}
