package controllers

import (
	"fmt"
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/types"
	"github.com/gin-gonic/gin"
)

type CurriculumController struct{}

func (CurriculumController) GET(ctx *gin.Context) {
	id := ctx.Param("code")
	if id != "" {
		var curriculum models.Curriculum
		if err := lib.Database.Preload("Program").First(&curriculum, "curr_id = ?", id).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Curriculum not Found"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"curriculum": curriculum})
	} else {
		var curriculums []models.Curriculum
		if result := lib.Database.Preload("Program").Find(&curriculums); result.Error != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"curriculums": curriculums})
		return
	}
}

func (CurriculumController) POST(ctx *gin.Context) {
	currRequest := types.CurriculumRequest

	if err := ctx.ShouldBindJSON(&currRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	curriculum := models.Curriculum{
		CMO_Name:        currRequest.CMO_Name,
		Effectivity_SY:  currRequest.Effectivity_SY,
		CurrID:          currRequest.CurrID,
		Effectivity_Sem: currRequest.Effectivity_Sem,
		IsActive:        currRequest.IsActive,
		ProgramID:       currRequest.ProgramID,
		Revision_No:     currRequest.Revision_No,
	}

	if result := lib.Database.Create(&curriculum); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"curriculum": curriculum})
}

func (CurriculumController) DELETE(ctx *gin.Context) {
	id := ctx.Param("code")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide valid curriculum code"})
		return
	}

	var curriculum models.Curriculum

	if err := lib.Database.First(&curriculum, "curr_id = ?", id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Curriculum does not exist"})
		return
	}
	fmt.Println(curriculum)
	if err := lib.Database.Delete(&curriculum).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete curriculum"})
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{})
}
