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
	}
}
