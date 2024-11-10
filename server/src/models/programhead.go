package models

type ProgramHead struct {
	User      User
	Program   Program `gorm:"foreignKey:ProgramID"`
	UserID    uint    `gorm:"unique;not null"`
	ProgramID uint    `gorm:"unique;not null"`
	ID        uint
}
