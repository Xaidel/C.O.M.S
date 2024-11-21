package models

type Period struct {
	School_Year string `gorm:"type:varchar(4)"`
	Semester    uint
}
