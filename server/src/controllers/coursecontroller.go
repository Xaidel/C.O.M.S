package controllers

import (
	"fmt"
	"net/http"
	"os"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/types"
	"github.com/gin-gonic/gin"
	"github.com/gocarina/gocsv"
)

type CourseController struct{}

func (CourseController) GET(ctx *gin.Context) {
	id := ctx.Param("id")

	if id != "" {
		var course models.Course
		if err := lib.Database.First(&course, id).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"course": course})
	} else {
		var courses []models.Course
		if err := lib.Database.Model(&models.Course{}).Preload("Students").Find(&courses).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"courses": courses})
	}
}

func (CourseController) AssignFaculty(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide a course id on your request"})
		return
	}

	var request struct {
		UserID string `json:"userID" binding:"required"`
	}

	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var faculty models.Faculty

	if err := lib.Database.First(&faculty, "user_id = ?", request.UserID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Faculty not found"})
		return
	}

	var course models.Course

	if err := lib.Database.First(&course, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Course not Found"})
		return
	}

	course.FacultyID = &faculty.ID
	if err := lib.Database.Save(&course).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"success": "successfully assigned"})
}

func (CourseController) BatchProcessCourse(ctx *gin.Context) {
	file, err := ctx.FormFile("file")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tempFile := fmt.Sprintf("../../%s", file.Filename)
	if err := ctx.SaveUploadedFile(file, tempFile); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to save csv file"})
		return
	}
	defer os.Remove(tempFile)

	var courses []*models.Course
	csvFile, err := os.Open(tempFile)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to open csv file"})
		return
	}
	defer csvFile.Close()

	if err := gocsv.UnmarshalFile(csvFile, &courses); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid CSV format"})
		return
	}
}

func (CourseController) POST(ctx *gin.Context) {
	courseRequest := types.CourseRequest
	if err := ctx.ShouldBindJSON(&courseRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	course := models.Course{
		Course_No:    courseRequest.Course_Number,
		Lec_Unit:     courseRequest.Lec_Unit,
		Lab_Unit:     courseRequest.Lab_Unit,
		Course_Name:  courseRequest.Course_Name,
		Sem:          courseRequest.Sem,
		Year_Level:   courseRequest.Year_Level,
		CurriculumID: courseRequest.CurriculumID,
	}

	if err := lib.Database.FirstOrCreate(&course, course.ID).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"course": course})
}

func (CourseController) DELETE(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide a course id on your request"})
		return
	}

	var course models.Course

	if err := lib.Database.First(&course, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Course does not exist"})
		return
	}

	if err := lib.Database.Delete(&course).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete program"})
		return
	}
	ctx.JSON(http.StatusNoContent, gin.H{})
}
