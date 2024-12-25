package models

type Student struct {
	Courses   []*Course `csv:"-" gorm:"many2many:enrolled_courses"`
	UserID    string    `gorm:"unique;not null"`
	User      User
	Program   Program
	ProgramID uint `csv:"-" gorm:"not null"`
	ID        uint `csv:"-"`
}
