package models

type Period struct {
	School_Year  string         `gorm:"type:varchar(4)"`
	ProgramHeads []*ProgramHead `gorm:"many2many:period_programheads"`
	Semester     uint
	IsCurrent    uint `gorm:"type:tinyint;default:1"`
	ID           uint
}
