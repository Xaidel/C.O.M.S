package controllers

import (
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/types"
	"github.com/gin-gonic/gin"
)

type ILOController struct{}

func (ILOController) GET(ctx *gin.Context) {
	id := ctx.Param("id")
	if id != "" {
		var ilo models.IntendedLearningOutcome
		if err := lib.Database.First(&ilo, id).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Intended Learning Outcome not found"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"ilo": ilo})
	} else {
		var ilos []models.IntendedLearningOutcome
		if err := lib.Database.Find(&ilos).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"ilos": ilos})
	}
}

func (ILOController) POST(ctx *gin.Context) {
	id := ctx.Param("coID")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide a Course Outcome"})
		return
	}
	iloRequest := types.IntendedLearningOutcomeRequest
	if err := ctx.ShouldBindJSON(&iloRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var co models.CourseOutcome

	if err := lib.Database.First(&co, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Course Outcome not found"})
		return
	}

	ilo := models.IntendedLearningOutcome{
		Statement:       iloRequest.Statement,
		CourseOutcomeID: co.ID,
	}

	if err := lib.Database.FirstOrCreate(&ilo, models.IntendedLearningOutcome{Statement: ilo.Statement, CourseOutcomeID: ilo.CourseOutcomeID}).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"ilo": ilo})
}

func (ILOController) DELETE(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide an id for ILo"})
		return
	}
	var ilo models.IntendedLearningOutcome
	if err := lib.Database.First(&ilo, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "ILO does not exist "})
		return
	}

	if err := lib.Database.Delete(&ilo).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete ILO"})
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{})
}
