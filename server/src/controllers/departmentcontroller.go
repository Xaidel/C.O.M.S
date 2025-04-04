package controllers

import (
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/types"
	"github.com/gin-gonic/gin"
)

type DepartmentController struct{}

func (DepartmentController) GET(ctx *gin.Context) {
	id := ctx.Param("id")

	if id != "" {
		var department models.Department
		if err := lib.Database.Preload("Programs.ProgramHead.User").First(&department, id).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Department not Found"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"department": department})
	} else {
		var departments []models.Department
		if result := lib.Database.Preload("Programs").Find(&departments); result.Error != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"departments": departments})
		return
	}
}

func (DepartmentController) POST(ctx *gin.Context) {
	deptRequest := types.DepartmentRequest
	if err := ctx.ShouldBindJSON(&deptRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	department := models.Department{Dept_Code: deptRequest.DeptCode, Dept_Name: deptRequest.DeptName}
	if result := lib.Database.FirstOrCreate(&department, models.Department{Dept_Code: department.Dept_Code, Dept_Name: department.Dept_Name}); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"department": department})
}

func (DepartmentController) DELETE(ctx *gin.Context) {
	id := ctx.Param("id")

	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide an department id on your request"})
		return
	}

	var department models.Department

	if err := lib.Database.First(&department, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Department does not exist"})
		return
	}

	if err := lib.Database.Delete(&department).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete department"})
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{})
}
