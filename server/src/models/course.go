package models

type Course struct {
	Course_No    string
	Course_Name  string
	Students     []*Student `csv:"-" gorm:"many2many:enrolled_courses"`
	Sections     []Section  `csv:"-"`
	Prospectus   Prospectus `csv:"-"`
	Lec_Unit     string
	Lab_Unit     *string
	Sem          uint
	Year_Level   uint
	ProspectusID uint `gorm:"not null"`
	ID           uint
}
