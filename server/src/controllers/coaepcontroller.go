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
	if err := lib.Database.
		Joins("JOIN coeap_courses ON coeap_courses.coeap_id = coeaps.id").
		Where("coeap_courses.course_id = ?", id).
		Preload("CourseOutcomes.IntendedLearningOutcomes.AssessmentTool").First(&coaep).Error; err != nil {
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

	var courses []models.Course
	if err := lib.Database.Where("course_name = ?", coaepRequest.CourseName).Find(&courses).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find courses"})
		return
	}

	if len(courses) == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "No courses found with that name"})
		return
	}

	coaep := models.Coeap{
		PeriodID: coaepRequest.PeriodID,
	}
	if err := lib.Database.Create(&coaep).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate COAEP"})
		return
	}

	if err := lib.Database.Model(&coaep).Association("Courses").Append(&courses); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to attach coaep to courses"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Success"})
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
