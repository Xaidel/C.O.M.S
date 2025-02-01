package models

type IloCriteria struct {
	Criteria                  uint                    `gorm:"not null"`
	Section                   Section                 `json:"-"`
	IntendedLearningOutcome   IntendedLearningOutcome `json:"-"`
	IntendedLearningOutcomeID uint
	SectionID                 uint
	ID                        uint
}
