package models

type ProgramHead struct {
	User      User
	Program   Program
	UserID    uint `gorm:"not null;constraints:OnUpdate:CASCADE,OnDELETE:CASCADE"`
	ProgramID uint `gorm:"not null;constraints:OnUpdate:CASCADE,OnDELETE:CASCADE"`
	ID        uint
}
