package models

type Recommendation struct {
	Section   Section
	Comment   *string
	SectionID uint `gorm:"not null"`
	ID        uint
}
