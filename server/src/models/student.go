package models

type Student struct {
	Sections       []*Section `csv:"-" gorm:"many2many:enrolled_courses"`
	UserID         string     `gorm:"unique;not null"`
	User           User       `csv:"-"`
	CurrentYearLvl uint
	Program        Program `csv:"-"`
	ProgramID      uint    `csv:"-" gorm:"not null"`
	ID             uint    `csv:"-"`
}
