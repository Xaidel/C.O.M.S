package models

type IntendedLearningOutcome struct {
	Statement        string        `gorm:"size:300;not null"`
	CourseOutcome    CourseOutcome `gorm:"foreignKey:CourseOutcomeID;references:ID"`
	AssessmentTool   AssessmentTool
	Recommendation   Recommendation
	RecommendationID *uint
	AssessmentToolID uint
	CourseOutcomeID  uint
	ID               uint
}
