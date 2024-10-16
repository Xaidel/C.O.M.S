package main

import (
	"fmt"
	"server/config"
	"server/lib"
	"server/src/models"
)

func init() {
	config.Load()
	lib.ConnectDatabase()
}

func main() {
	if err := lib.Database.AutoMigrate(&models.User{}); err != nil {
		fmt.Println("Error Migrating")
		return
	}
	fmt.Println("Tables successfully migrated")
}
