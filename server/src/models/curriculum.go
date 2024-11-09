package models

type Curriculum struct {
	CMO_Name        string  `gorm:"not null"`
	Effectivity_SY  string  `gorm:"size:4; not null"`
	CurrID          string  `gorm:"primaryKey"`
	Program         Program `gorm:"foreignKey:ProgramID;references:ID"`
	Effectivity_Sem uint    `gorm:"not null;constrains:OnUpdate:CASCADE,OnDelete:CASCADE"`
	IsActive        uint    `gorm:"type:tinyint;not null"`
	Revision_No     uint    `gorm:"not null"`
	ProgramID       uint    `gorm:"not null"`
}
