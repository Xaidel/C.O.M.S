package models

type Section struct {
	Course       Course
	Curriculum   Curriculum `gorm:"references:CurrID"`
	Section_Name string
	Students     []*Student `csv:"-" gorm:"many2many:enrolled_courses"`
	Faculty      Faculty    `csv:"-"`
	FacultyID    uint
	CourseID     uint `gorm:"not null"`
	CurriculumID string
	ID           uint
}
