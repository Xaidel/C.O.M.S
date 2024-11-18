package seed

import (
	"github.com/Xaidel/server/src/models"
)

var Departments = []models.Department{
	{
		Dept_Code: "SCIS",
		Dept_Name: "School of Computer and Information Sciences",
	},
	{
		Dept_Code: "SSNS",
		Dept_Name: "School of Social and Natural Sciences",
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
		Program_Name: "Bachelor of Library in Information Science",
		DepartmentID: 1,
	},
	{
		Program_Code: "ACT",
		Program_Name: "Associate in Computer Technology",
		DepartmentID: 1,
	},
	{
		Program_Code: "BSP",
		Program_Name: "Bachelor of Science in Psychology",
		DepartmentID: 2,
	},
	{
		Program_Code: "BSPS",
		Program_Name: "Bachelor of Science in Political Science",
		DepartmentID: 2,
	},
}

var Curriculum = []models.Curriculum{
	{
		Effectivity_Sem: 1,
		Effectivity_SY:  "2324",
		CMO_Name:        "CMO no.15, series of 2022",
		Revision_No:     1,
		IsActive:        1,
		CurrID:          "PK",
	},
}

var Course = []models.Course{
	{
		Course_No:    "OOP1",
		Course_Name:  "Object Oriented Programming 1",
		Lec_Unit:     3,
		Lab_Unit:     2,
		Sem:          1,
		Year_Level:   2122,
		CurriculumID: "PK",
	},
	{
		Course_No:    "OOP2",
		Course_Name:  "Object Oriented Programming 2",
		Lec_Unit:     3,
		Lab_Unit:     2,
		Sem:          2,
		Year_Level:   2222,
		CurriculumID: "PK",
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
	{
		UserID:     "1000",
		Password:   "password123",
		Firstname:  "Camille",
		Middlename: "Elevado",
		Lastname:   "Abang",
	},
	{
		UserID:     "1010",
		Password:   "password123",
		Firstname:  "Christine Joy",
		Middlename: "Paja",
		Lastname:   "Cleofe",
	},
	{
		UserID:     "21-28239",
		Password:   "password123",
		Firstname:  "Jerico",
		Middlename: "Reid",
		Lastname:   "Nacion",
	},
	{
		UserID:     "1001",
		Password:   "password123",
		Firstname:  "Philip Cesar",
		Middlename: "Mota",
		Lastname:   "Custodio",
	},
	{
		UserID:     "111",
		Password:   "password123",
		Firstname:  "Juan",
		Middlename: "Rodriguez",
		Lastname:   "Dela Cruz",
	},
	{
		UserID:     "112",
		Password:   "password123",
		Firstname:  "Emilio",
		Middlename: "Famy",
		Lastname:   "Aguinaldo",
	},
	{
		UserID:     "113",
		Password:   "password123",
		Firstname:  "Jose",
		Middlename: "Protacio",
		Lastname:   "Rizal",
	},
}

var Dean = []models.Dean{
	{
		UserID:       "735",
		DepartmentID: 1,
	},
	{
		UserID:       "113",
		DepartmentID: 2,
	},
}

var AssistantDean = []models.AssistantDean{
	{
		UserID:       "1034",
		DepartmentID: 1,
	},
	{
		UserID:       "112",
		DepartmentID: 2,
	},
}

var ProgramHead = []models.ProgramHead{
	{
		ProgramID: 1,
		UserID:    "1034",
	},
	{
		ProgramID: 6,
		UserID:    "112",
	},
}

var Faculty = []models.Faculty{
	{
		UserID:       "735",
		DepartmentID: 1,
	},
	{
		UserID:       "1034",
		DepartmentID: 1,
	},
	{
		UserID:       "1000",
		DepartmentID: 1,
	},
	{
		UserID:       "1010",
		DepartmentID: 1,
	},
	{
		UserID:       "1001",
		DepartmentID: 1,
	},
	{
		UserID:       "111",
		DepartmentID: 2,
	},
	{
		UserID:       "112",
		DepartmentID: 2,
	},
	{
		UserID:       "113",
		DepartmentID: 2,
	},
}

var Student = []models.Student{{
	ProgramID: 1,
	UserID:    "21-28238",
}, {
	ProgramID: 1,
	UserID:    "21-28239",
}}
