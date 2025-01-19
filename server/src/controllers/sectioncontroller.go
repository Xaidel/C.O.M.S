package controllers

import (
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/gin-gonic/gin"
)

type SectionController struct{}

func (SectionController) GET(ctx *gin.Context) {
	currID := ctx.Param("currID")

	if currID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide the Curriculum ID"})
		return
	}

	var curriculum models.Curriculum
	if err := lib.Database.First(&curriculum, "curr_id = ?", currID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Curriculum not found"})
		return
	}

	var sections []models.Section
	if err := lib.Database.Find(&sections, "curriculum_id = ?", curriculum.CurrID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Sections Not Found"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"sections": sections})
}

func (SectionController) BatchProcessSection(ctx *gin.Context) {
}
