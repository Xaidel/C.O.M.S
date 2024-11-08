package test_helpers

import (
	"log"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/services"
)

func MockUserData() {
	db, err := lib.ConnectMockDatabase()
	if err != nil {
		log.Panicf("Failed to connect the database: %v", err)
	}

	db.AutoMigrate(&models.User{}, &models.Department{}, &models.Program{})
	db.Create(&models.Department{
		Dept_Code: "SCIS",
		Dept_Name: "School of Computer and Information Sciences",
	})

	hash, _ := services.Encrypt("password123")
	db.Create(&models.User{
		UserID:       "1034",
		Password:     hash,
		Firstname:    "John Mark",
		Middlename:   "Salvador",
		Lastname:     "Ralota",
		DepartmentID: 1,
	})
}
