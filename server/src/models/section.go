package models

type Section struct {
	Course       Course
	Curriculum   Curriculum `gorm:"references:CurrID"`
	Students     []*Student `csv:"-" gorm:"many2many:enrolled_courses"`
	Faculty      Faculty    `csv:"-"`
	FacultyID    uint
	Section_Name string
	CourseID     uint
	CurriculumID string
	SectionCode  string
	ID           uint
}
