package models

type Program struct {
	ProgramHeadID *uint `gorm:"default:null"`
	Students      []Student
	Curriculums   []*Curriculum `gorm:"many2many:curriculum_programs"`
	ProgramHead   ProgramHead
	Program_Code  string     `gorm:"size:10; not null"`
	Program_Name  string     `gorm:"size:100; not null"`
	Department    Department `gorm:"foreignKey:DepartmentID"`
	DepartmentID  uint       `gorm:"not null"`
	ID            uint
}
