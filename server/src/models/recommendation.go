package models

type Recommendation struct {
	IntendedLearningOutcome   IntendedLearningOutcome
	Section                   Section
	Comment                   *string
	SectionID                 uint `gorm:"not null"`
	IntendedLearningOutcomeID uint `gorm:"not null"`
	ID                        uint
}
