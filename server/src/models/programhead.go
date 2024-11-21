package models

type ProgramHead struct {
	UserID   string `gorm:"type:varchar(255); not null"`
	User     User
	Programs []Program `gorm:"foreignKey:ProgramHeadID"`
	Periods  []*Period `gorm:"many2many:period_programheads"`
	ID       uint
}
