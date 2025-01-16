package models

type Prospectus struct {
	Curriculum   Curriculum `gorm:"references:CurrID"`
	Courses      []Course
	CurriculumID string `gorm:"size:2; not null; unique"`
	ID           uint
}
