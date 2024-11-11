package models

type Dean struct {
	UserID       string `gorm:"unique;not null"`
	User         User
	Department   Department
	DepartmentID uint `gorm:"unique;not null"`
	ID           uint
}
