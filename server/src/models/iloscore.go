package models

type ILOScore struct {
	IntendedLearningOutcome   IntendedLearningOutcome `json:"-"`
	Student                   Student                 `json:"-" gorm:"references:UserID"`
	Coeap                     Coeap                   `json:"-"`
	IntendedLearningOutcomeID uint                    `gorm:"primaryKey;autoIncrement:false;not null"`
	StudentID                 string                  `gorm:"primaryKey;autoIncrement:false;not null"`
	CoeapID                   uint                    `gorm:"primaryKey;autoIncrement:false;not null"`
	Value                     uint
}
