package models

type Course struct {
	Course_No    string
	CurriculumID string `gorm:"size:2; not null"`
	Course_Name  string
	FacultyID    *uint      `csv:"-"`
	Curriculum   Curriculum `csv:"-" gorm:"references:CurrID"`
	Students     []*Student `csv:"-" gorm:"many2many:enrolled_courses"`
	Faculty      Faculty    `csv:"-"`
	Lec_Unit     uint
	Lab_Unit     uint
	Sem          uint
	Year_Level   uint
	ID           uint
}
