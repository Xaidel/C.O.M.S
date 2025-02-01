package models

type IloCriteria struct {
	IntendedLearningOutcome   IntendedLearningOutcome
	IntendedLearningOutcomeID uint `gorm:"not null"`
	Criteria                  uint `gorm:"not null"`
	ID                        uint
}
