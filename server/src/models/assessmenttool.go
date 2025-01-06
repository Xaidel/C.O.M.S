package models

type AssessmentTool struct {
	Tool             string `gorm:"not null"`
	TotalScore       uint   `gorm:"not null"`
	TargetPopulation uint   `gorm:"not null"`
	TargetScore      uint   `gorm:"not null"`
	ID               uint
}
