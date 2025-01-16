package models

type Course struct {
	Course_No    string `gorm:"primaryKey"`
	Course_Name  string
	FacultyID    *uint      `csv:"-"`
	Students     []*Student `csv:"-" gorm:"many2many:enrolled_courses"`
	Sections     []Section  `csv:"-"`
	Faculty      Faculty    `csv:"-"`
	Prospectus   Prospectus `csv:"-"`
	Lec_Unit     string
	Lab_Unit     *string
	Sem          uint
	Year_Level   uint
	ProspectusID uint `gorm:"not null"`
}
