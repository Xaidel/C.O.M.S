package models

type IntendedLearningOutcome struct {
	Statement        string        `gorm:"size:300;not null"`
	CourseOutcome    CourseOutcome `gorm:"foreignKey:CourseOutcomeID;references:ID"`
	TaxonomyLevel    TaxonomyLevel
	AssessmentTool   AssessmentTool
	AssessmentToolID uint `gorm:"not null"`
	TaxonomyLevelID  uint `gorm:"not null"`
	CourseOutcomeID  uint `gorm:"not null"`
}
