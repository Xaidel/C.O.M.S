package models

type Course struct {
	Course_No    string
	Course_Name  string
	Sections     []Section  `csv:"-"`
	Prospectus   Prospectus `csv:"-"`
	Coeaps       []*Coeap   `gorm:"many2many:coeap_courses" csv:"-"`
	Lec_Unit     string
	Lab_Unit     *string
	Sem          uint
	Year_Level   uint
	ProspectusID uint `gorm:"not null"`
	ID           uint
}
