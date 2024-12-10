package models

type Student struct {
  Courses []*Course`gorm:"many2many:enrolled_courses"`
	UserID    string `gorm:"unique;not null"`
	User      User
	Program   Program
	ProgramID uint `gorm:"not null"`
	ID        uint
}
