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

func (StudentController) GetByCourse(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide the Course ID"})
		return
	}
	var course models.Course
	if err := lib.Database.Preload("Students.User").First(&course, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"classlist": course.Students})
}

func (StudentController) BatchProcessStudent(ctx *gin.Context) {
	file, err := ctx.FormFile("file")
	courseID := ctx.Param("courseID")

	if courseID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide the course id"})
		return
	}

	var course models.Course

	if err := lib.Database.First(&course, courseID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Course does not exist"})
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

	var csvStudents []*models.Student
	if err := gocsv.Unmarshal(uploadedFile, &csvStudents); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse CSV"})
		return
	}

	userIDs := make([]string, len(csvStudents))
	for i, student := range csvStudents {
		userIDs[i] = student.UserID
	}

	var enrolledStudents []*models.Student

	if err := lib.Database.Where("user_id IN ?", userIDs).Find(&enrolledStudents).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save courses"})
		return
	}

	enrolledStudentMapLookup := make(map[string]*models.Student)
	for _, student := range enrolledStudents {
		enrolledStudentMapLookup[student.UserID] = student
	}

	var missingStudent []string
	for _, student := range csvStudents {
		if _, exists := enrolledStudentMapLookup[student.UserID]; !exists {
			missingStudent = append(missingStudent, student.UserID)
		}
	}

	if len(missingStudent) > 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error":   "Some students do not exist in the database",
			"missing": missingStudent,
		})
		return
	}

	for _, student := range enrolledStudents {
		if err := lib.Database.Model(student).Association("Courses").Append(&course); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to associate student with course"})
			return
		}
	}
	message := fmt.Sprintf("%d student(s) enrolled in %v successfully", len(enrolledStudents), course.Course_No)
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
