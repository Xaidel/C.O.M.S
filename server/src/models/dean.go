package models

type Dean struct {
	Department   Department
	User         User
	UserID       uint `gorm:"not null"`
	DepartmentID uint `gorm:"not null"`
	ID           uint
}
