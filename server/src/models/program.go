package models

type Program struct {
	Program_Code string     `gorm:"size:10; not null"`
	Program_Name string     `gorm:"size:100; not null"`
	Department   Department `gorm:"foreignKey:DepartmentID"`
	DepartmentID uint       `gorm:"not null"`
	ID           uint
}
