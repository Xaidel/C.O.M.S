package main

import (
	"log"

	"github.com/Xaidel/server/config"
	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
)

var AssessmentTools = []models.AssessmentTool{
	{
		Tool:             "CP Findings",
		TargetPopulation: 80,
		TargetScore:      75,
	},
	{
		Tool:             "CP Software",
		TargetPopulation: 80,
		TargetScore:      75,
	},
	{
		Tool:             "CP Proposal",
		TargetPopulation: 80,
		TargetScore:      75,
	},
	{
		Tool:             "System Development Plan",
		TargetPopulation: 80,
		TargetScore:      75,
	},
	{
		Tool:             "System Requirement Specifications and Design",
		TargetPopulation: 80,
		TargetScore:      75,
	},
	{
		Tool:             "CP Individual Task and Assignment Evaluation",
		TargetPopulation: 80,
		TargetScore:      75,
	},
	{
		Tool:             "CP Individual Task and Assignment Evaluation",
		TargetPopulation: 80,
		TargetScore:      75,
	},
}

var CourseOutcomes = []models.CourseOutcome{
	{
		Statement: "Demonstrate how to  implement the key object-oriented programming (OOP) concepts,  principles, and features using OOP language",
		Level:     "Introductory",
	},
	{
		Statement: "Illustrate object-oriented models and prototype designs for program solutions by conducting simple object-oriented analysis",
		Level:     "Enabling",
	},
	{
		Statement: "Develop object-oriented and graphical user interface (GUI) applications integrated with relational databases",
		Level:     "Demonstrative",
	},
	{
		Statement: "Develop object-oriented and graphical user interface (GUI) applications integrated with relational databases",
		Level:     "Demonstrative",
	},
}

var CourseOutcomes1 = []models.CourseOutcome{
	{
		Statement: "Demonstrate how to  implement the key object-oriented programming (OOP) concepts,  principles, and features using OOP language",
		Level:     "Introductory",
	},
	{
		Statement: "Illustrate object-oriented models and prototype designs for program solutions by conducting simple object-oriented analysis",
		Level:     "Enabling",
	},
	{
		Statement: "Develop object-oriented and graphical user interface (GUI) applications integrated with relational databases",
		Level:     "Demonstrative",
	},
	{
		Statement: "Develop object-oriented and graphical user interface (GUI) applications integrated with relational databases",
		Level:     "Demonstrative",
	},
}

var Coaep = models.Coeap{
	PeriodID:       1,
	CourseOutcomes: CourseOutcomes,
}

var Coaep1 = models.Coeap{
	PeriodID:       1,
	CourseOutcomes: CourseOutcomes1,
}

var ILOS = []models.IntendedLearningOutcome{
	{
		Statement:        "Distinguish the program elements, statements, and standard packages of Java for object-oriented programming",
		CourseOutcomeID:  1,
		AssessmentToolID: 2,
	},
	{
		Statement:        "Determine how to implement  the concepts and principles of object-oriented programming using Java",
		CourseOutcomeID:  1,
		AssessmentToolID: 3,
	},
	{
		Statement:        "Apply the object-oriented programming concepts, principles, and features to create program solutions in Java",
		CourseOutcomeID:  1,
		AssessmentToolID: 1,
	},
	{
		Statement:        "Determine the concepts and techniques in conducting basic object-oriented analysis and creating user-interface design",
		CourseOutcomeID:  2,
		AssessmentToolID: 1,
	},
	{
		Statement:        "Demonstrate how to create object-oriented system models using  basic Unified Modeling Language (UML) and integrate an UI/UX design with JavaFX",
		CourseOutcomeID:  2,
		AssessmentToolID: 3,
	},
	{
		Statement:        "Create program solution prototypes based on the system model using JavaFX",
		CourseOutcomeID:  2,
		AssessmentToolID: 2,
	},
	{
		Statement:        "Determine the commonly used design patterns in application development and how they implement in Java",
		CourseOutcomeID:  3,
		AssessmentToolID: 4,
	},
	{
		Statement:        "Demonstrate how to do relational database record manipulation using JDBC and data presentation in JavaFX",
		CourseOutcomeID:  3,
		AssessmentToolID: 1,
	},
	{
		Statement:        "Build an object-oriented and database-driven  desktop application by implementing  the system models  and designs of program solution using Java",
		CourseOutcomeID:  3,
		AssessmentToolID: 5,
	},
}

var ILOS1 = []models.IntendedLearningOutcome{
	{
		Statement:        "Distinguish the program elements, statements, and standard packages of Java for object-oriented programming",
		CourseOutcomeID:  4,
		AssessmentToolID: 1,
	},
	{
		Statement:        "Determine how to implement  the concepts and principles of object-oriented programming using Java",
		CourseOutcomeID:  4,
		AssessmentToolID: 1,
	},
	{
		Statement:        "Apply the object-oriented programming concepts, principles, and features to create program solutions in Java",
		CourseOutcomeID:  5,
		AssessmentToolID: 2,
	},
	{
		Statement:        "Determine the concepts and techniques in conducting basic object-oriented analysis and creating user-interface design",
		CourseOutcomeID:  5,
		AssessmentToolID: 3,
	},
	{
		Statement:        "Demonstrate how to create object-oriented system models using  basic Unified Modeling Language (UML) and integrate an UI/UX design with JavaFX",
		CourseOutcomeID:  5,
		AssessmentToolID: 2,
	},
	{
		Statement:        "Create program solution prototypes based on the system model using JavaFX",
		CourseOutcomeID:  6,
		AssessmentToolID: 5,
	},
	{
		Statement:        "Determine the commonly used design patterns in application development and how they implement in Java",
		CourseOutcomeID:  6,
		AssessmentToolID: 1,
	},
	{
		Statement:        "Demonstrate how to do relational database record manipulation using JDBC and data presentation in JavaFX",
		CourseOutcomeID:  6,
		AssessmentToolID: 2,
	},
	{
		Statement:        "Build an object-oriented and database-driven  desktop application by implementing  the system models  and designs of program solution using Java",
		CourseOutcomeID:  6,
		AssessmentToolID: 3,
	},
}

func init() {
	config.Load()
	lib.ConnectDatabase()
}

func main() {
	var course1 models.Course
	var course2 models.Course
	if err := lib.Database.First(&course1, 1).Error; err != nil {
		log.Printf("error: %v", err.Error())
	}
	if err := lib.Database.First(&course2, 32).Error; err != nil {
		log.Printf("error: %v", err.Error())
	}
	if err := lib.Database.Create(&AssessmentTools).Error; err != nil {
		log.Printf("Error in Seeding AssessmentTools %v", err)
	}

	Coaep.Courses = append(Coaep.Courses, &course1, &course2)

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
