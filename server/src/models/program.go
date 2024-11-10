package models

type Program struct {
	Students     []Student
	Program_Code string     `gorm:"size:10; not null"`
	Program_Name string     `gorm:"size:100; not null"`
	Department   Department `gorm:"foreignKey:DepartmentID"`
	DepartmentID uint       `gorm:"not null"`
	ID           uint
}
