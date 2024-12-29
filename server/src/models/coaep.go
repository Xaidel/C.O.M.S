package models

type Coeap struct {
	ID             uint
	CourseOutcomes []CourseOutcome
	Period         Period
	Course         Course
	PeriodID       uint `gorm:"not null"`
	CourseID       uint
}
