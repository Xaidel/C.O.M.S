package main

import (
	"github.com/Xaidel/server/config"
	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	config.Load()
	lib.ConnectDatabase()
}

func main() {
	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	router.Use(cors.New(cors.Config{
    AllowOrigins:     []string{"http://172.23.0.1", "http://192.168.1.10:5173", "http://localhost:5173", "http://172.25.128.1"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))
	router.Static("/assets", "./static/assets")
	router.StaticFile("/", "./static/index.html")
	router.StaticFile("/vite.svg", "./static/vite.svg")
	router.NoRoute(func(ctx *gin.Context) {
		ctx.File("./static/index.html")
	})
	routes.APIRoutes(router)
	router.Run()
}
