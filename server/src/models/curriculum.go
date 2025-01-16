package models

type Curriculum struct {
	CMO_Name        string `gorm:"not null"`
	Effectivity_SY  string `gorm:"size:4; not null"`
	CurrID          string `gorm:"primaryKey; size:2"`
	Program         Program
	Effectivity_Sem int `gorm:"not null"`
	ProgramID       uint
	IsActive        uint `gorm:"type:tinyint;not null"`
	Revision_No     uint `gorm:"not null"`
}
