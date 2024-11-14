package controllers

import (
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/types"
	"github.com/gin-gonic/gin"
)

type ProgramHeadController struct{}

func (ProgramHeadController) GET(ctx *gin.Context) {
	id := ctx.Param("id")
	if id != "" {
		var programHead models.ProgramHead
		if err := lib.Database.First(&programHead, id).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Program Head not Found"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"program_head": programHead})
	} else {
		var programHeads []models.ProgramHead
		if err := lib.Database.Preload("User").Find(&programHeads).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"program_heads": programHeads})
	}
}

func (ProgramHeadController) POST(ctx *gin.Context) {
	progHeadRequest := types.ProgramHeadRequest

	if err := ctx.ShouldBindJSON(&progHeadRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	programHead := models.ProgramHead{UserID: progHeadRequest.UserID, ProgramID: progHeadRequest.ProgramID}
	if err := lib.Database.FirstOrCreate(&programHead, models.ProgramHead{UserID: programHead.UserID, ProgramID: programHead.ProgramID}).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"program_head": programHead})
}

func (ProgramHeadController) DELETE(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide a Program Head id on your request"})
		return
	}

	var programHead models.ProgramHead

	if err := lib.Database.First(&programHead, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Program Head does not exist"})
		return
	}

	if err := lib.Database.Delete(&programHead).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete Program Head"})
		return
	}
	ctx.JSON(http.StatusNoContent, gin.H{})
}