package models

type Coeap struct {
	CourseOutcomes []CourseOutcome
	Period         Period
	Courses        []*Course `gorm:"many2many:coeap_courses"`
	PeriodID       uint      `gorm:"not null"`
	ID             uint      `gorm:"primaryKey;autoIncrement"`
}
