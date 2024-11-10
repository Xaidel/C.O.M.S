package models

type AssistantDean struct {
	Department   Department
	User         User
	DepartmentID uint `gorm:"not null"`
	UserID       uint `gorm:"not null"`
	ID           uint
}
