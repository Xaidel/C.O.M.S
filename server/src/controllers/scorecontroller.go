package controllers

import (
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/types"
	"github.com/gin-gonic/gin"
)

type ScoreController struct{}

func (ScoreController) GET(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Provide the COAEP ID"})
		return
	}
	var scores []models.ILOScore
	if err := lib.Database.Find(&scores, "coaep_id = ?", id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Scores not found"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"scores": scores})
}

func (ScoreController) POST(ctx *gin.Context) {
	request := types.PostScoreRequest
	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	score := models.ILOScore{
		IntendedLearningOutcomeID: request.Ilo_id,
		StudentID:                 request.Student_id,
		CoeapID:                   request.Coaep_id,
	}

	if err := lib.Database.Create(&score).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"message": "Success"})
}
