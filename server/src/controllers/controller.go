package controllers

type Controller struct {
	Auth                    AuthController
	User                    UserController
	Department              DepartmentController
	Program                 ProgramController
	Curriculum              CurriculumController
	ProgramHead             ProgramHeadController
	Faculty                 FacultyController
	Course                  CourseController
	Period                  PeriodController
	Coaep                   COAEPController
	CourseOutcome           CourseOutcomeController
	IntendedLearningOutcome ILOController
}
