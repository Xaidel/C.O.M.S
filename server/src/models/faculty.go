package models

type Faculty struct {
	UserID       string `gorm:"unique;not null"`
	User         User
	Department   Department `gorm:"foreignKey:DepartmentID"`
	DepartmentID uint       `gorm:"not null"`
	ID           uint
}
