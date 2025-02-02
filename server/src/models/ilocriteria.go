package models

type IloCriteria struct {
	Criteria                  uint                    `gorm:"not null"`
	Section                   Section                 `json:"-"`
	IntendedLearningOutcome   IntendedLearningOutcome `json:"-"`
	IntendedLearningOutcomeID uint                    `gorm:"primaryKey;autoIncrement:false"`
	SectionID                 uint                    `gorm:"primaryKey;autoIncrement:false"`
}
