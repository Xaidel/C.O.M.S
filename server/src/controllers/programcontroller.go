package controllers

import (
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/types"
	"github.com/gin-gonic/gin"
)

type ProgramController struct{}

func (ProgramController) GET(ctx *gin.Context) {
	id := ctx.Param("id")

	if id != "" {
		var program models.Program
		if err := lib.Database.First(&program, id).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Program not Found"})
			return
		}
		ctx.JSON(http.StatusOK, program)
	} else {
		var programs []models.Program
		if result := lib.Database.Find(&programs); result.Error != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
			return
		}
		ctx.JSON(http.StatusOK, programs)
	}
}

func (ProgramController) POST(ctx *gin.Context) {
	progRequest := types.ProgramRequest

	if err := ctx.ShouldBindJSON(&progRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	program := models.Program{Program_Code: progRequest.ProgramCode, Program_Name: progRequest.ProgramName, DepartmentID: progRequest.DepartmentID}
	if result := lib.Database.Create(&program); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, program)
}

func (ProgramController) DELETE(ctx *gin.Context) {
	id := ctx.Param("id")
	if err := lib.Database.Delete(&models.Program{}, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Program does not exist"})
		return
	}
	ctx.JSON(http.StatusNoContent, gin.H{})
}
