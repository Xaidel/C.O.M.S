package lib

import (
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

func ConnectMockDatabase() (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	Database = db
	return db, nil
}
