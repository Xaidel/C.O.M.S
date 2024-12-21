package controllers

import (
	"fmt"
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/types"
	"github.com/gin-gonic/gin"
	"github.com/gocarina/gocsv"
)

type StudentController struct{}

func (StudentController) GET(ctx *gin.Context) {
	id := ctx.Param("id")
	if id != "" {
		var student models.Student
		if err := lib.Database.First(&student, id).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"student": student})
	} else {
		var students []models.Student
		if err := lib.Database.Preload("User").Find(&students).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"students": students})
	}
}

func (StudentController) BatchProcessStudent(ctx *gin.Context) {
	file, err := ctx.FormFile("file")
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

	var students []*models.Student
	if err := gocsv.Unmarshal(uploadedFile, &students); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse CSV"})
		return
	}

	if err := lib.Database.Create(&students).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save courses"})
		return
	}
	message := fmt.Sprintf("%v student(s) uploaded successfully", len(students))
	ctx.JSON(http.StatusOK, gin.H{"message": message})
}

func (StudentController) POST(ctx *gin.Context) {
	studentRequest := types.StudentRequest
	if err := ctx.ShouldBindJSON(&studentRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	student := models.Student{
		UserID: studentRequest.UserID,
	}

	if err := lib.Database.FirstOrCreate(&student, student.UserID).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"student": student})
}

func (StudentController) DELETE(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide the student id"})
		return
	}
	var student models.Student
	if err := lib.Database.First(&student, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Student does not exist"})
		return
	}

	if err := lib.Database.Delete(&student).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete student"})
		return
	}
	ctx.JSON(http.StatusNoContent, gin.H{})
}
