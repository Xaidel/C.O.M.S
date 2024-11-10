package models

type Department struct {
	Dean      *Dean  `gorm:"foreignKey:DepartmentID"`
	Dept_Name string `gorm:"size:100; not null"`
	Dept_Code string `gorm:"size:4; not null"`
	Programs  []Program
	ID        uint
}
