package main

import (
	"log"

	"github.com/Xaidel/server/config"
	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
)

var CourseOutcomes = []models.CourseOutcome{
	{
		Statement: "Demonstrate how to  implement the key object-oriented programming (OOP) concepts,  principles, and features using OOP language",
	},
	{
		Statement: "Illustrate object-oriented models and prototype designs for program solutions by conducting simple object-oriented analysis",
	},
	{
		Statement: "Develop object-oriented and graphical user interface (GUI) applications integrated with relational databases",
	},
}

var CourseOutcomes1 = []models.CourseOutcome{
	{
		Statement: "Demonstrate how to  implement the key object-oriented programming (OOP) concepts,  principles, and features using OOP language",
	},
	{
		Statement: "Illustrate object-oriented models and prototype designs for program solutions by conducting simple object-oriented analysis",
	},
	{
		Statement: "Develop object-oriented and graphical user interface (GUI) applications integrated with relational databases",
	},
}

var Coaep = models.Coeap{
	CourseID:       1,
	PeriodID:       1,
	CourseOutcomes: CourseOutcomes,
}

var Coaep1 = models.Coeap{
	CourseID:       2,
	PeriodID:       1,
	CourseOutcomes: CourseOutcomes1,
}

var ILOS = []models.IntendedLearningOutcome{
	{
		Statement:       "Distinguish the program elements, statements, and standard packages of Java for object-oriented programming",
		CourseOutcomeID: 1,
	},
	{
		Statement:       "Determine how to implement  the concepts and principles of object-oriented programming using Java",
		CourseOutcomeID: 1,
	},
	{
		Statement:       "Apply the object-oriented programming concepts, principles, and features to create program solutions in Java",
		CourseOutcomeID: 1,
	},
	{
		Statement:       "Determine the concepts and techniques in conducting basic object-oriented analysis and creating user-interface design",
		CourseOutcomeID: 2,
	},
	{
		Statement:       "Demonstrate how to create object-oriented system models using  basic Unified Modeling Language (UML) and integrate an UI/UX design with JavaFX",
		CourseOutcomeID: 2,
	},
	{
		Statement:       "Create program solution prototypes based on the system model using JavaFX",
		CourseOutcomeID: 2,
	},
	{
		Statement:       "Determine the commonly used design patterns in application development and how they implement in Java",
		CourseOutcomeID: 3,
	},
	{
		Statement:       "Demonstrate how to do relational database record manipulation using JDBC and data presentation in JavaFX",
		CourseOutcomeID: 3,
	},
	{
		Statement:       "Build an object-oriented and database-driven  desktop application by implementing  the system models  and designs of program solution using Java",
		CourseOutcomeID: 3,
	},
}

var ILOS1 = []models.IntendedLearningOutcome{
	{
		Statement:       "Distinguish the program elements, statements, and standard packages of Java for object-oriented programming",
		CourseOutcomeID: 4,
	},
	{
		Statement:       "Determine how to implement  the concepts and principles of object-oriented programming using Java",
		CourseOutcomeID: 4,
	},
	{
		Statement:       "Apply the object-oriented programming concepts, principles, and features to create program solutions in Java",
		CourseOutcomeID: 5,
	},
	{
		Statement:       "Determine the concepts and techniques in conducting basic object-oriented analysis and creating user-interface design",
		CourseOutcomeID: 5,
	},
	{
		Statement:       "Demonstrate how to create object-oriented system models using  basic Unified Modeling Language (UML) and integrate an UI/UX design with JavaFX",
		CourseOutcomeID: 5,
	},
	{
		Statement:       "Create program solution prototypes based on the system model using JavaFX",
		CourseOutcomeID: 6,
	},
	{
		Statement:       "Determine the commonly used design patterns in application development and how they implement in Java",
		CourseOutcomeID: 6,
	},
	{
		Statement:       "Demonstrate how to do relational database record manipulation using JDBC and data presentation in JavaFX",
		CourseOutcomeID: 6,
	},
	{
		Statement:       "Build an object-oriented and database-driven  desktop application by implementing  the system models  and designs of program solution using Java",
		CourseOutcomeID: 6,
	},
}

func init() {
	config.Load()
	lib.ConnectDatabase()
}

func main() {
	if err := lib.Database.Create(&Coaep).Error; err != nil {
		log.Printf("Error in seeding COAEP %v", err)
	}

	for _, ilo := range ILOS {
		if err := lib.Database.Create(&ilo).Error; err != nil {
			log.Printf("Error in seeding ILO %v", err)
		}
	}

	if err := lib.Database.Create(&Coaep1).Error; err != nil {
		log.Printf("Error in seeding COAEP %v", err)
	}

	for _, ilo := range ILOS1 {
		if err := lib.Database.Create(&ilo).Error; err != nil {
			log.Printf("Error in seeding ILO %v", err)
		}
	}
}
