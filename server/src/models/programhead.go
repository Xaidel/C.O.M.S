package models

type ProgramHead struct {
	UserID   string `gorm:"type:varchar(255); not null"`
	User     User
	Programs []Program `gorm:"foreignKey:ProgramHeadID"`
	ID       uint
}
