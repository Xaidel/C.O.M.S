package models

type ILOScore struct {
	IntendedLearningOutcome   IntendedLearningOutcome
	Student                   Student `json:"-" gorm:"references:UserID"`
	Coeap                     Coeap   `json:"-"`
	Section                   Section `json:"-"`
	IntendedLearningOutcomeID uint    `gorm:"primaryKey;autoIncrement:false;not null"`
	StudentID                 string  `gorm:"primaryKey;autoIncrement:false;not null"`
	CoeapID                   uint    `gorm:"primaryKey;autoIncrement:false;not null"`
	SectionID                 uint    `gorm:"primaryKey;autoIncrement:false;not null"`
	Value                     uint
	Status                    *int `gorm:"type:TINYINT(1)"`
}
