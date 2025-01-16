package controllers

import (
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/gin-gonic/gin"
)

type ProspectusController struct{}

func (ProspectusController) GET(ctx *gin.Context) {
	currID := ctx.Param("id")

	if currID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Specify the Curriculum ID"})
		return
	}

	var prospectus models.Prospectus
	if err := lib.Database.Preload("Courses").First(&prospectus, "curriculum_id = ?", currID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Prospectus not found"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"prospectus": prospectus})
}
