package routes

import (
	"net/http"

	"github.com/Xaidel/server/src/controllers"

	"github.com/gin-gonic/gin"
)

func APIRoutes(router *gin.Engine) {
	controllers := &controllers.Controller{}

	api := router.Group("/api/v1")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/login", controllers.Auth.Login)
			auth.GET("/validate", controllers.Auth.Validate)
		}
		user := api.Group("/users")
		{
			user.GET("/ping", func(ctx *gin.Context) {
				ctx.JSON(http.StatusOK, gin.H{"message": "pong"})
			})
			user.GET("", controllers.User.GET)
			user.GET("/:id", controllers.User.GET)
			user.POST("", controllers.User.POST)
			user.DELETE("/:id", controllers.User.DELETE)
		}
		department := api.Group("/departments")
		{
			department.GET("", controllers.Department.GET)
			department.GET("/:id", controllers.Department.GET)
			department.POST("", controllers.Department.POST)
			department.DELETE("/:id", controllers.Department.DELETE)
		}
		program := api.Group("/programs")
		{
			program.GET("", controllers.Program.GET)
			program.GET("/:id", controllers.Program.GET)
			program.POST("", controllers.Program.POST)
			program.DELETE("/:id", controllers.Program.DELETE)
		}
		programHead := api.Group("/program-heads")
		{
			programHead.GET("", controllers.ProgramHead.GET)
			programHead.GET("/:id", controllers.ProgramHead.GET)
			programHead.POST("", controllers.ProgramHead.POST)
			programHead.DELETE("/:id", controllers.ProgramHead.DELETE)
		}
		faculty := api.Group("/faculties")
		{
			faculty.GET("", controllers.Faculty.GET)
			faculty.GET("/:id", controllers.Faculty.GET)
			faculty.GET("/departments/:deptID", controllers.Faculty.GetFacultyFromDepartment)
			faculty.GET("/not-program-head", controllers.Faculty.GetNonProgramHeadFaculties)
			faculty.GET("/not-program-head/:id", controllers.Faculty.GetNonProgramHeadFaculties)
			faculty.POST("", controllers.Faculty.POST)
			faculty.DELETE("/:id", controllers.Faculty.DELETE)
		}

		student := api.Group("/students")
		{
			student.GET("", controllers.Student.GET)
			student.GET("/:id", controllers.Student.GET)
			student.GET("/course/:id", controllers.Student.GetByCourse)
			student.POST("", controllers.Student.POST)
			student.POST("/:courseID", controllers.Student.BatchProcessStudent)
			student.DELETE("/:id", controllers.Student.DELETE)
		}

		curriculum := api.Group("/curriculums")
		{
			curriculum.GET("", controllers.Curriculum.GET)
			curriculum.GET("/:code", controllers.Curriculum.GET)
			curriculum.GET("/programs/:id", controllers.Curriculum.GetByProgram)
			curriculum.POST("", controllers.Curriculum.POST)
			curriculum.DELETE("/:code", controllers.Curriculum.DELETE)
		}
		course := api.Group("/courses")
		{
			course.GET("", controllers.Course.GET)
			course.GET("/:id", controllers.Course.GET)
			course.POST("/faculty/:id", controllers.Course.AssignFaculty)
			course.POST("/:currID", controllers.Course.BatchProcessCourse)
			//	course.POST("", controllers.Course.POST)
			course.DELETE("/:id", controllers.Course.DELETE)
		}
		period := api.Group("/periods")
		{
			period.GET("", controllers.Period.GET)
			period.GET("/:id", controllers.Period.GET)
			period.GET("/current", controllers.Period.GetCurrent)
		}
		coaep := api.Group("coaep")
		{
			coaep.GET("", controllers.Coaep.GET)
			coaep.GET("/:id", controllers.Coaep.GET)
			coaep.POST("", controllers.Coaep.POST)
			coaep.DELETE("/:id", controllers.Coaep.DELETE)
		}

		courseOutcome := api.Group("/course-outcomes")
		{
			courseOutcome.GET("", controllers.CourseOutcome.GET)
			courseOutcome.GET("/:id", controllers.CourseOutcome.GET)
			courseOutcome.POST("/:planID", controllers.CourseOutcome.POST)
			courseOutcome.DELETE("/:id", controllers.CourseOutcome.DELETE)
		}
		ilo := api.Group("/intended-learning-outcomes")
		{
			ilo.GET("", controllers.IntendedLearningOutcome.GET)
			ilo.GET("/:id", controllers.IntendedLearningOutcome.GET)
			ilo.POST("/:coID", controllers.IntendedLearningOutcome.POST)
			ilo.DELETE("/:id", controllers.IntendedLearningOutcome.DELETE)
		}
	}
}
