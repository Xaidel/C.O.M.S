package models

type CourseOutcome struct {
	IntendedLearningOutcomes []*IntendedLearningOutcome
	CoeapID                  *uint
	Statement                string `gorm:"size:300; not null"`
	Level                    string `gorm:"size:50; not null"`
	Coeap                    Coeap  `gorm:"foreignKey:CoeapID;references:ID;"`
	ID                       uint
}
