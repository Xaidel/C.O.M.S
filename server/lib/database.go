package lib

import (
	"fmt"
	"log"

	"github.com/Xaidel/server/config"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var Database *gorm.DB

func ConnectDatabase() {
	config.Load()
	username := config.Get("DB_USERNAME")
	password := config.Get("DB_PASSWORD")
	host := config.Get("DB_HOST")
	port := config.Get("DB_PORT")
	db := config.Get("DATABASE")
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", username, password, host, port, db)
	var err error
	Database, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	} else {
		fmt.Println("Database connected successfully")
	}
}
