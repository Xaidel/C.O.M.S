package models

type Faculty struct {
	User         User
	Department   Department `gorm:"foreignKey:DepartmentID"`
	UserID       uint       `gorm:"unique;not null"`
	DepartmentID uint       `gorm:"not null"`
	ID           uint
}
