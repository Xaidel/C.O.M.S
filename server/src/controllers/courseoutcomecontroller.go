package controllers

import (
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/types"
	"github.com/gin-gonic/gin"
)

type CourseOutcomeController struct{}

func (CourseOutcomeController) GET(ctx *gin.Context) {
	id := ctx.Param("id")

	if id != "" {
		var co models.CourseOutcome
		if err := lib.Database.First(&co, id).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Course Outcome not found"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"course_outcome": co})
	} else {
		var cos []models.CourseOutcome
		if err := lib.Database.Find(&cos).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"course_outcomes": cos})
	}
}

func (CourseOutcomeController) POST(ctx *gin.Context) {
	id := ctx.Param("planID")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Provide the Course Outcome Assessment and Evaluation Plan"})
		return
	}
	coRequest := types.CourseOutcomeRequest
	if err := ctx.ShouldBindJSON(&coRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var coaep models.Coeap

	if err := lib.Database.First(&coaep, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "COAEP not found"})
		return
	}

	co := models.CourseOutcome{
		Statement: coRequest.Statement,
	}

	if err := lib.Database.FirstOrCreate(&co, models.CourseOutcome{Statement: co.Statement, CoeapID: &coaep.ID}).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"course_outcome": co})
}

func (CourseOutcomeController) DELETE(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide the Course Outcome ID"})
		return
	}
	var co models.CourseOutcome
	if err := lib.Database.First((&co), id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Course Outcome does not exist"})
		return
	}

	if err := lib.Database.Delete(&co).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete Course Outcome"})
		return
	}
	ctx.JSON(http.StatusNoContent, gin.H{})
}
