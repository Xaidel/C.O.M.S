package models

type CourseOutcome struct {
	IntendedLearningOutcomes []*IntendedLearningOutcome
	CoeapID                  *uint
	Statement                string `gorm:"size:300; not null"`
	Coeap                    Coeap  `gorm:"foreignKey:CoeapID;references:ID;"`
	ID                       uint
}
