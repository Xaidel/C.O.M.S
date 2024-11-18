package models

type Curriculum struct {
	CMO_Name        string     `gorm:"not null"`
	Effectivity_SY  string     `gorm:"size:4; not null"`
	CurrID          string     `gorm:"primaryKey; size:2"`
	Programs        []*Program `gorm:"many2many:curriculum_programs"`
	Courses         []Course
	Effectivity_Sem uint `gorm:"not null"`
	IsActive        uint `gorm:"type:tinyint;not null"`
	Revision_No     uint `gorm:"not null"`
}
