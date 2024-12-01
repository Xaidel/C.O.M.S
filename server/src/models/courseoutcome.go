package models

type CourseOutcome struct {
	IntendedLearningOutcomes []*IntendedLearningOutcome
	Statement                string `gorm:"size:300; not null"`
	Coeap                    Coeap  `gorm:"foreignKey:CoeapID;references:ID;"`
	CoeapID                  uint   `gorm:"not null"`
	ID                       uint
}
