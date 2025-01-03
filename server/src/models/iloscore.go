package models

type ILOScore struct {
	IntendedLearningOutcome   IntendedLearningOutcome
	Student                   Student
	Coeap                     Coeap `json:"-"`
	IntendedLearningOutcomeID uint  `gorm:"not null"`
	StudentID                 uint  `gorm:"not null"`
	CoeapID                   uint  `gorm:"not null"`
	Value                     uint
	ID                        uint
}
