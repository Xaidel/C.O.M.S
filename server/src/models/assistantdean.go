package models

type AssistantDean struct {
	User         User
	Department   Department
	DepartmentID uint `gorm:"unique;not null"`
	UserID       uint `gorm:"unique;not null"`
	ID           uint
}
