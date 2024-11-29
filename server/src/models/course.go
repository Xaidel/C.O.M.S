package models

type Course struct {
	Course_No    string
	CurriculumID string `gorm:"size:2; not null"`
	Course_Name  string
	FacultyID    *uint
	Curriculum   Curriculum `gorm:"references:CurrID"`
	Faculty      Faculty
	Lec_Unit     uint
	Lab_Unit     uint
	Sem          uint
	Year_Level   uint
	ID           uint
}
