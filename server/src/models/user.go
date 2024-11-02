package models

type User struct {
	UserID     string `gorm:"not null"`
	Password   string `gorm:"not null"`
	Firstname  string `gorm:"not null"`
	Middlename string `gorm:"not null"`
	Lastname   string `gorm:"not null"`
	ID         uint
}
