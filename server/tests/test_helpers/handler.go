package test_helpers

import (
	"github.com/Xaidel/server/src/routes"
	"github.com/gin-gonic/gin"
)

var Router *gin.Engine

func init() {
	MockData()
	Router = SetupRouter()
}

func SetupRouter() *gin.Engine {
	r := gin.Default()
	routes.APIRoutes(r)
	return r
}
