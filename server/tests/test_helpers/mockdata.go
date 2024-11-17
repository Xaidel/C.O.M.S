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

	db.AutoMigrate(&models.User{}, &models.Department{})
	db.Create(&models.Department{
		Dept_Code: "SCIS",
		Dept_Name: "School of Computer and Information Sciences",
	})

	hash, _ := services.Encrypt("password123")
	db.Create(&models.User{
		UserID:     "1034",
		Password:   hash,
		Firstname:  "John Mark",
		Middlename: "Salvador",
		Lastname:   "Ralota",
	})
}

func MockDeptData() {
	db, err := lib.ConnectMockDatabase()
	if err != nil {
		log.Panicf("Failed to connect to the database: %v", err)
	}

	db.AutoMigrate(&models.Department{}, &models.Program{})
	db.Create(&models.Department{
		Dept_Code: "SCIS",
		Dept_Name: "School of Computer and Information Sciences",
	})
	db.Create(&models.Program{
		Program_Code: "BSIT",
		Program_Name: "Bachelor of Science in Information Technology",
		DepartmentID: 1,
	})
}

func MockProgData() {
	db, err := lib.ConnectMockDatabase()
	if err != nil {
		log.Panicf("Failed to connect to the database: %v", err)
	}

	db.AutoMigrate(&models.Department{}, &models.Program{}, &models.Curriculum{})
	db.Create(&models.Department{
		Dept_Code: "SCIS",
		Dept_Name: "School of Computer and Information Sciences",
	})
	db.Create(&models.Program{
		Program_Code: "BSIT",
		Program_Name: "Bachelor of Science in Information Technology",
		DepartmentID: 1,
	})
	db.Create(&models.Curriculum{
		Effectivity_Sem: 1,
		Effectivity_SY:  "2324",
		CMO_Name:        "CMO no.15, series of 2022",
		Revision_No:     1,
		IsActive:        1,
		CurrID:          "PK",
	})
}
