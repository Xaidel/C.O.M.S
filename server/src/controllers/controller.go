package controllers

type Controller struct {
	Auth       AuthController
	User       UserController
	Department DepartmentController
	Program    ProgramController
	Curriculum CurriculumController
}
