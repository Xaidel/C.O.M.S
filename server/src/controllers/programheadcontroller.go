package controllers

import (
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/types"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
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

	var period models.Period

	if err := lib.Database.First(&period, "is_current = ?", 1).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Period not found"})
		return
	}

	var program models.Program
	if err := lib.Database.First(&program, progHeadRequest.ProgramID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Program Not Found"})
		return
	}

	var programHead models.ProgramHead

	if err := lib.Database.Preload("Programs").First(&programHead, "user_id = ?", progHeadRequest.UserID).Error; err == gorm.ErrRecordNotFound {
		programHead = models.ProgramHead{
			UserID:   progHeadRequest.UserID,
			Programs: []models.Program{program},
			Periods:  []*models.Period{&period},
		}

		if err := lib.Database.Create(&programHead).Error; err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	} else {

		programHead.Programs = append(programHead.Programs, program)
		programHead.Periods = append(programHead.Periods, &period)
		if err := lib.Database.Save(&programHead).Error; err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}
	ctx.JSON(http.StatusCreated, gin.H{"program_head": programHead})
}

func (ProgramHeadController) EditPHAssignment(ctx *gin.Context) {
	id := ctx.Param("programID")

	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please specify a Program Head ID to reassign"})
		return
	}

	var program models.Program

	if err := lib.Database.Preload("ProgramHead").First(&program, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Program Head not found"})
		return
	}

	var request struct {
		UserID string `json:"userID" binding:"required"`
	}

	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide User ID to be assigned"})
		return
	}

	var newProgramHead models.User

	if err := lib.Database.First(&newProgramHead, "user_id = ?", request.UserID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "User not Found"})
		return
	}

	if err := lib.Database.Model(&program).Update("program_head_id", request.UserID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Failed to reassign Program Head"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"program": program})
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
