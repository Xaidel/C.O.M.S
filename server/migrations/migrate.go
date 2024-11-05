package main

import (
	"fmt"

	"github.com/Xaidel/server/lib"

	"github.com/Xaidel/server/config"
	"github.com/Xaidel/server/src/models"
)

func init() {
	config.Load()
	lib.ConnectDatabase()
}

func main() {
	if err := lib.Database.AutoMigrate(&models.User{}, &models.Curriculum{}, &models.Department{}, &models.Program{}); err != nil {
		fmt.Println("Error Migrating")
		return
	}
	fmt.Println("Tables successfully migrated")
}
