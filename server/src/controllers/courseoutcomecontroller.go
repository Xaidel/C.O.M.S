package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/types"
	"github.com/gin-gonic/gin"
	"github.com/gocarina/gocsv"
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

func (CourseOutcomeController) BatchProcessCO(ctx *gin.Context) {
	file, err := ctx.FormFile("file")
	coaepID := ctx.Param("coaepID")

	if coaepID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "COAEP ID not found"})
		return
	}
	var coaep models.Coeap
	if err := lib.Database.First(&coaep, coaepID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "COAEP not found"})
		return
	}

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "File upload failed"})
		return
	}

	uploadedFile, err := file.Open()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Cannot open file"})
		return
	}

	defer uploadedFile.Close()

	var csvCO []*models.Coeap
	if err := gocsv.Unmarshal(uploadedFile, &csvCO); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse CSV"})
		return
	}

	if err := lib.Database.Create(&csvCO).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save Course Outcomes"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"CO": csvCO})
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
		Level:     coRequest.Level,
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

func (CourseOutcomeController) UploadCO(ctx *gin.Context) {
	file, err := ctx.FormFile("file")
	periodID := ctx.Param("periodID")

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "File not found"})
		return
	}
	if periodID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Provide period ID"})
		return
	}

	var csvCourses []struct {
		Course_Name string `csv:"Course_Name"`
		Statement   string `csv:"Statement"`
		Level       string `csv:"Level"`
	}
	uploadedFile, err := file.Open()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Cannot open file"})
		return
	}
	if err := gocsv.Unmarshal(uploadedFile, &csvCourses); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse CSV"})
		return
	}

	intPeriodID, err := strconv.ParseUint(periodID, 0, 64)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse period id"})
		return
	}

	courseOutcomeMap := make(map[string][]models.CourseOutcome)

	for _, row := range csvCourses {
		outcome := models.CourseOutcome{
			Statement: row.Statement,
			Level:     row.Level,
		}
		courseOutcomeMap[row.Course_Name] = append(courseOutcomeMap[row.Course_Name], outcome)
	}

	for courseName, outcomes := range courseOutcomeMap {
		var matchedCourses []*models.Course
		if err := lib.Database.Where("course_name = ?", courseName).Find(&matchedCourses).Error; err != nil {
			message := fmt.Sprintf("Failed to find courses named '%s'", courseName)
			ctx.JSON(http.StatusNotFound, gin.H{"error": message})
			return
		}

		if len(matchedCourses) == 0 {
			message := fmt.Sprintf("No courses found with name '%s'", courseName)
			ctx.JSON(http.StatusNotFound, gin.H{"error": message})
			return
		}

		coeap := models.Coeap{
			PeriodID: uint(intPeriodID),
			Courses:  matchedCourses,
		}

		if err := lib.Database.Create(&coeap).Error; err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create COAEP"})
			return
		}

		// Save each outcome with the CoeapID
		for _, outcome := range outcomes {
			outcome.CoeapID = &coeap.ID
			if err := lib.Database.Create(&outcome).Error; err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save course outcome"})
				return
			}
		}
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Course Outcomes uploaded successfully"})
}
