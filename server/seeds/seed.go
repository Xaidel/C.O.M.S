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
		UserID:     "1034",
		Password:   "password123",
		Firstname:  "John Mark",
		Middlename: "Salvador",
		Lastname:   "Ralota",
	},
	{
		UserID:     "735",
		Password:   "password123",
		Firstname:  "Aliyah Patrice",
		Middlename: "Panis",
		Lastname:   "Luntok",
	},
	{
		UserID:     "21-28238",
		Password:   "password123",
		Firstname:  "Karl Cydil Dwight",
		Middlename: "Paa",
		Lastname:   "Abechuela",
	},
}

var Dean = models.Dean{
	UserID:       2,
	DepartmentID: 1,
}

var AssistantDean = models.AssistantDean{
	UserID:       1,
	DepartmentID: 1,
}

var ProgramHead = models.ProgramHead{
	ProgramID: 1,
	UserID:    1,
}

var Faculty = []models.Faculty{
	{
		UserID:       1,
		DepartmentID: 1,
	},
	{
		UserID:       2,
		DepartmentID: 1,
	},
}

var Student = models.Student{
	ProgramID: 1,
	UserID:    3,
}
