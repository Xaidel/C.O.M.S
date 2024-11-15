package models

type Course struct {
	Course_No    string
	Curriculum   Curriculum
	Lec_Unit     uint
	Lab_Unit     uint
	Sem          uint
	Year_Level   uint
	CurriculumID uint `gorm:"not null"`
	ID           uint
}
