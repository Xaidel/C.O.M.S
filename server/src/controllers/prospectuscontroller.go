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
	if err := lib.Database.Preload("Courses").FirstOrCreate(&prospectus, map[string]interface{}{"curriculum_id": currID}).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create or retrieve prospectus"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"prospectus": prospectus})
}
