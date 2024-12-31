package models

type Coeap struct {
	CourseOutcomes []CourseOutcome
	Period         Period
	Course         Course
	PeriodID       uint `gorm:"not null"`
	CourseID       uint
	ID             uint `gorm:"primaryKey;autoIncrement"`
}
