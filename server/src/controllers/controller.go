package controllers

type Controller struct {
	Auth                     AuthController
	User                     UserController
	Department               DepartmentController
	Program                  ProgramController
	Curriculum               CurriculumController
	ProgramHead              ProgramHeadController
	Faculty                  FacultyController
	Student                  StudentController
	Course                   CourseController
	Period                   PeriodController
	Coaep                    COAEPController
	CourseOutcome            CourseOutcomeController
	IntendedLearningOutcome  ILOController
	ScoreController          ScoreController
	ProspectusController     ProspectusController
	SectionController        SectionController
	RecommendationController RecommendationController
	CriteriaController       CriteriaController
}
