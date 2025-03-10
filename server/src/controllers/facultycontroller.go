package controllers

import (
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/types"
	"github.com/gin-gonic/gin"
)

type FacultyController struct{}

func (FacultyController) GET(ctx *gin.Context) {
	id := ctx.Param("id")
	if id != "" {
		var faculty models.Faculty
		if err := lib.Database.Preload("User").Preload("Courses").First(&faculty, id).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Faculty not Found"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"faculty": faculty})
	} else {
		var faculties []models.Faculty
		if err := lib.Database.Preload("User").Find(&faculties).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"faculties": faculties})
	}
}

func (FacultyController) GetFacultyFromDepartment(ctx *gin.Context) {
	id := ctx.Param("deptID")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide a department id"})
		return
	}
	var faculties []models.Faculty
	if err := lib.Database.Preload("User").Find(&faculties, "department_id = ?", id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Faculty list not found"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"faculties": faculties})
}

func (FacultyController) GetNonProgramHeadFaculties(ctx *gin.Context) {
	id := ctx.Param("id")

	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please specify which department"})
		return
	}

	var faculties []models.Faculty

	subQuery := lib.Database.Model(&models.ProgramHead{}).Select("user_id")
	if subQuery.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch Program Heads"})
		return
	}

	lib.Database.Model(&models.Faculty{}).
		Where("user_id NOT IN (?)", subQuery).
		Where("department_id = ?", id).
		Preload("User").
		Find(&faculties)

	ctx.JSON(http.StatusOK, gin.H{"faculties": faculties})
}

func (FacultyController) POST(ctx *gin.Context) {
	facultyRequest := types.FacultyRequest
	if err := ctx.ShouldBindJSON(&facultyRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	faculty := models.Faculty{UserID: facultyRequest.UserID, DepartmentID: facultyRequest.Dept_ID}
	if err := lib.Database.FirstOrCreate(&faculty, faculty.UserID).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"faculty": faculty})
}

func (FacultyController) DELETE(ctx *gin.Context) {
	id := ctx.Param("id")

	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide a faculty id on your request"})
		return
	}

	var faculty models.Faculty

	if err := lib.Database.First(&faculty, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Faculty does not exist"})
		return
	}

	if err := lib.Database.Delete(&faculty).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete program"})
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{})
}
