package seed

import (
	"github.com/Xaidel/server/src/models"
)

var Departments = []models.Department{
	{
		Dept_Code: "SCIS",
		Dept_Name: "School of Computer and Information Sciences",
	},
}

var Programs = []models.Program{
	{
		Program_Code: "BSIT",
		Program_Name: "Bachelor of Science in Information Technology",
		DepartmentID: 1,
	},
	{
		Program_Code: "BSCS",
		Program_Name: "Bachelor of Science in Computer Science",
		DepartmentID: 1,
	},
	{
		Program_Code: "BLIS",
		Program_Name: "Bachelor of Library in INformation Science",
		DepartmentID: 1,
	},
	{
		Program_Code: "ACT",
		Program_Name: "Associate in Computer Technology",
		DepartmentID: 1,
	},
}

var Curriculum = []models.Curriculum{
	{
		Effectivity_Sem: 1,
		Effectivity_SY:  "2324",
		CMO_Name:        "CMO no.15, series of 2022",
		Revision_No:     1,
		IsActive:        1,
		ProgramID:       1,
		CurrID:          "PK",
	},
}

var Users = []models.User{
	{
		UserID:       "1034",
		Password:     "password123",
		Firstname:    "John Mark",
		Middlename:   "Salvador",
		Lastname:     "Ralota",
		DepartmentID: 1,
	},
	{
		UserID:       "735",
		Password:     "password123",
		Firstname:    "Aliyah Patrice",
		Middlename:   "Panis",
		Lastname:     "Luntok",
		DepartmentID: 1,
	},
	{
		UserID:       "21-28238",
		Password:     "password123",
		Firstname:    "Karl Cydil Dwight",
		Middlename:   "Paa",
		Lastname:     "Abechuela",
		DepartmentID: 1,
	},
}
