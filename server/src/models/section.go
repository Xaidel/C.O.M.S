package models

type Section struct {
	Course       Course     `csv:"-"`
	Curriculum   Curriculum `csv:"-" gorm:"foreignKey:CurriculumID;references:CurrID"`
	Students     []*Student `csv:"-" gorm:"many2many:enrolled_courses"`
	Faculty      Faculty    `csv:"-" gorm:"foreignKey:FacultyKey;references:ID"`
	Section_Name string
	CurriculumID string `csv:"-" gorm:"size:2; not null"`
	SectionCode  string
	Course_No    string  `gorm:"-"`
	FacultyID    *string `gorm:"-"`
	FacultyKey   *uint
	CourseID     uint `csv:"-"`
	ID           uint `csv:"-"`
}
