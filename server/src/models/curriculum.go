package models

type Curriculum struct {
	Effectivity_Sem string `gorm:"not null"`
	Effectivity_SY  string `gorm:"size:4; not null"`
	CMO_Name        string `gorm:"not null"`
	IsActive        uint   `gorm:"type:tinyint;not null"`
	Revision_No     uint   `gorm:"not null"`
	ID              uint
}
