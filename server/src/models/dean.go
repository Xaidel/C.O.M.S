package models

type Dean struct {
	User         User
	Department   Department
	UserID       uint `gorm:"unique;not null"`
	DepartmentID uint `gorm:"unique;not null"`
	ID           uint
}
