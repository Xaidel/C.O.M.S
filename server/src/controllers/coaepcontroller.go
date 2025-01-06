package controllers

import (
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/types"
	"github.com/gin-gonic/gin"
)

type COAEPController struct{}

func (COAEPController) GET(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		var coaep models.Coeap
		if err := lib.Database.Preload("CourseOutcomes.IntendedLearningOutcomes").
			Omit("CourseOutcomes.Coaep").
			Omit("CourseOutcomes.IntendedLearningOutcomes.AssessmentToolID").
			Omit("CourseOutcomes.IntendedLearningOutcomes.CourseOutcome").
			First(&coaep, id).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Course Outcome Assessment Plan not found"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"coaep": coaep})
	} else {
		var coaeps []models.Coeap
		if err := lib.Database.Find(&coaeps).
			Omit("CourseOutcomes.Coaep").
			Omit("CourseOutcomes.IntendedLearningOutcomes.AssessmentToolID").
			Omit("CourseOutcomes.IntendedLearningOutcomes.CourseOutcome").
			Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"coaeps": coaeps})
	}
}

func (COAEPController) GetByCourse(ctx *gin.Context) {
	id := ctx.Param("id")

	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Provide the course id"})
		return
	}

	var coaep models.Coeap
	if err := lib.Database.Preload("CourseOutcomes.IntendedLearningOutcomes.AssessmentTool").Find(&coaep, "course_id = ?", id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "COAEP not found"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"coaep": coaep})
}

func (COAEPController) POST(ctx *gin.Context) {
	coaepRequest := types.CoaepRequest
	if err := ctx.ShouldBindJSON(&coaepRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	coaep := models.Coeap{
		PeriodID: coaepRequest.PeriodID,
		CourseID: coaepRequest.CourseID,
	}

	if err := lib.Database.FirstOrCreate(&coaep, models.Coeap{PeriodID: coaep.PeriodID, CourseID: coaep.CourseID}).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"coaep": coaep})
}

func (COAEPController) DELETE(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide the COAEP id"})
		return
	}
	var coaep models.Coeap
	if err := lib.Database.First(&coaep, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "COAEP not found"})
		return
	}
	if err := lib.Database.Delete(&coaep).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete COAEP"})
		return
	}
	ctx.JSON(http.StatusNoContent, gin.H{})
}
