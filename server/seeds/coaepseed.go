package seed

import "github.com/Xaidel/server/src/models"

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

var Coaep = models.Coeap{
	CourseID:       1,
	PeriodID:       1,
	CourseOutcomes: CourseOutcomes,
}

var TaxLevel = []models.TaxonomyLevel{
	{
		Level: "Create",
	},
	{
		Level: "Evaluate",
	},
	{
		Level: "Analyze",
	},
	{
		Level: "Apply",
	},
	{
		Level: "Understand",
	},
	{
		Level: "Remember",
	},
}

var Tools = []models.AssessmentTool{
	{
		Tool:             "Object-Type Quiz",
		TargetPopulation: 80,
		TargetScore:      60,
	},
	{
		Tool:             "Object-Type Exam",
		TargetPopulation: 80,
		TargetScore:      60,
	},
	{
		Tool:             "Coding Activity & OO Programming Task",
		TargetPopulation: 80,
		TargetScore:      60,
	},
	{
		Tool:             "UI/UX Prototyping Activity",
		TargetPopulation: 80,
		TargetScore:      60,
	},
	{
		Tool:             "Object-Oriented Data Recording Application Proposal",
		TargetPopulation: 80,
		TargetScore:      60,
	},
	{
		Tool:             "GUI+DB Programming Task",
		TargetPopulation: 80,
		TargetScore:      60,
	},
	{
		Tool:             "Object-Oriented Database Application",
		TargetPopulation: 80,
		TargetScore:      60,
	},
}

/*var ILOS = []models.IntendedLearningOutcome{
	{
		Statement:        "Distinguish the program elements, statements, and standard packages of Java for object-oriented programming",
		AssessmentToolID: nil,
		TaxonomyLevelID:  nil,
		CourseOutcomeID:  1,
	},
	{
		Statement:        "Determine how to implement  the concepts and principles of object-oriented programming using Java",
		AssessmentToolID: nil,
		TaxonomyLevelID:  nil,
		CourseOutcomeID:  1,
	},
	{
		Statement:        "Apply the object-oriented programming concepts, principles, and features to create program solutions in Java",
		AssessmentToolID: nil,
		TaxonomyLevelID:  nil,
		CourseOutcomeID:  1,
	},
	{
		Statement:        "Determine the concepts and techniques in conducting basic object-oriented analysis and creating user-interface design",
		AssessmentToolID: nil,
		TaxonomyLevelID:  nil,
		CourseOutcomeID:  2,
	},
	{
		Statement:        "Demonstrate how to create object-oriented system models using  basic Unified Modeling Language (UML) and integrate an UI/UX design with JavaFX",
		AssessmentToolID: nil,
		TaxonomyLevelID:  nil,
		CourseOutcomeID:  2,
	},
	{
		Statement:        "Create program solution prototypes based on the system model using JavaFX",
		AssessmentToolID: nil,
		TaxonomyLevelID:  nil,
		CourseOutcomeID:  2,
	},
	{
		Statement:        "Determine the commonly used design patterns in application development and how they implement in Java",
		AssessmentToolID: nil,
		TaxonomyLevelID:  nil,
		CourseOutcomeID:  3,
	},
	{
		Statement:        "Demonstrate how to do relational database record manipulation using JDBC and data presentation in JavaFX",
		AssessmentToolID: nil,
		TaxonomyLevelID:  nil,
		CourseOutcomeID:  3,
	},
	{
		Statement:        "Build an object-oriented and database-driven  desktop application by implementing  the system models  and designs of program solution using Java",
		AssessmentToolID: nil,
		TaxonomyLevelID:  nil,
		CourseOutcomeID:  3,
	},
}*/
