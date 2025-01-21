package controllers

import (
	"fmt"
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/gin-gonic/gin"
	"github.com/gocarina/gocsv"
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
	if err := lib.Database.Preload("Faculty.User").Preload("Course").Preload("Curriculum").Find(&sections, "curriculum_id = ?", curriculum.CurrID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Sections Not Found"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"sections": sections})
}

func (SectionController) GetByCourseNo(ctx *gin.Context) {
	currID := ctx.Param("currID")
	courseNo := ctx.Param("courseNo")

	if currID == "" || courseNo == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please include the Curriculum ID or Course No"})
		return
	}

	var prospectus models.Prospectus
	if err := lib.Database.First(&prospectus, "curriculum_id= ?", currID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Curriculum not found"})
		return
	}

	var course models.Course
	if err := lib.Database.Preload("Prospectus").First(&course, "course_no = ?", courseNo).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}

	var sections []models.Section
	if err := lib.Database.Preload("Faculty.User").Preload("Course").Preload("Curriculum").Find(&sections, "curriculum_id = ? AND course_id = ?", course.Prospectus.CurriculumID, course.ID).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Sections not found"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"sections": sections})
}

func (SectionController) BatchProcessSection(ctx *gin.Context) {
	file, err := ctx.FormFile("file")
	id := ctx.Param("currID")

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

	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide the Curriculum ID"})
		return
	}

	var prospectus models.Prospectus
	if err := lib.Database.First(&prospectus, "curriculum_id = ?", id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Prospectus not  found"})
		return
	}

	var sections []models.Section
	if err := gocsv.Unmarshal(uploadedFile, &sections); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse csv"})
		return
	}

	for i := range sections {
		sections[i].CurriculumID = id
		if sections[i].FacultyID != nil && *sections[i].FacultyID != "" {
			var faculty models.Faculty
			if err := lib.Database.First(&faculty, "user_id = ?", sections[i].FacultyID).Error; err != nil {
				message := fmt.Sprintf("%v Faculty ID does not exist", *sections[i].FacultyID)
				ctx.JSON(http.StatusNotFound, gin.H{"error": message})
				return
			}
			sections[i].FacultyKey = &faculty.ID
		}
		var courseofferings models.Course
		if err := lib.Database.Where("course_no = ? AND prospectus_id = ?", sections[i].Course_No, prospectus.ID).First(&courseofferings).Error; err != nil {
			message := fmt.Sprintf("%v Course Number does not exist", sections[i].Course_No)
			ctx.JSON(http.StatusNotFound, gin.H{"error": message})
			return
		}
		sections[i].CourseID = courseofferings.ID
	}

	if err := lib.Database.Create(sections).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save course"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"sections": sections})
}
