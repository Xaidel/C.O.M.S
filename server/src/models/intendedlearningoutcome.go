package models

type IntendedLearningOutcome struct {
	AssessmentToolID *uint
	TaxonomyLevelID  *uint
	Statement        string        `gorm:"size:300;not null"`
	CourseOutcome    CourseOutcome `gorm:"foreignKey:CourseOutcomeID;references:ID"`
	TaxonomyLevel    TaxonomyLevel
	AssessmentTool   AssessmentTool
	CourseOutcomeID  uint
	ID               uint
}
