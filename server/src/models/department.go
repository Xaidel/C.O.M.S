package models

type Department struct {
	Dept_Code string `gorm:"size:4; not null"`
	Dept_Name string `gorm:"size:100; not null"`
	Programs  []Program
	ID        uint
}
