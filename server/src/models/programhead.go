package models

type ProgramHead struct {
	UserID    string `gorm:"unique;not null"`
	User      User
	Program   Program `gorm:"foreignKey:ProgramID"`
	ProgramID uint    `gorm:"unique;not null"`
	ID        uint
}
