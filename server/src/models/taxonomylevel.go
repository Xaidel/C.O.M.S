package models

type TaxonomyLevel struct {
	Level string `gorm:"not null"`
	ID    uint
}
