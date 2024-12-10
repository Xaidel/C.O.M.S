package models

type ProgramHead struct {
	UserID   string `gorm:"unique; not null"`
	User     User
	Programs []Program `gorm:"foreignKey:ProgramHeadID"`
	Periods  []*Period `gorm:"many2many:period_programheads"`
	ID       uint
}
