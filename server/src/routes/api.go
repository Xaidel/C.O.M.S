package routes

import (
	"server/src/controllers"
	"server/src/middlewares"

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
		user := api.Group("/users").Use(middlewares.Authenticate)
		{
			user.GET("/", controllers.User.GET)
			user.GET("/:id", controllers.User.GET)
			user.POST("/", controllers.User.POST)
			user.DELETE("/:id", controllers.User.DELETE)
		}
	}
}
