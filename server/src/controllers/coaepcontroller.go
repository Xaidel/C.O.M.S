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

	var course models.Course
	if err := lib.Database.First(&course, coaepRequest.CourseID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}

	var similarCourse models.Course

	err := lib.Database.
		Preload("Coeaps", "period_id = ?", coaepRequest.PeriodID).
		Where("course_name = ?", coaepRequest.CourseName).First(&similarCourse).Error

	if err == nil && len(similarCourse.Coeaps) > 0 {
		similarCoaep := similarCourse.Coeaps[0]
		if err := lib.Database.Model(&similarCoaep).Association("Courses").Append(&course); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"errpr": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"coaep": similarCoaep})
		return
	}

	newCoaep := models.Coeap{
		PeriodID: coaepRequest.PeriodID,
	}
	if err := lib.Database.Create(&newCoaep).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create new Coaep"})
		return
	}
	if err := lib.Database.Model(&newCoaep).Association("Courses").Append(&course); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"coaep": newCoaep})
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
