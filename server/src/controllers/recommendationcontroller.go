package controllers

import (
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/types"
	"github.com/gin-gonic/gin"
)

type RecommendationController struct{}

func (RecommendationController) POST(ctx *gin.Context) {
	recomRequest := types.PostRecomRequest

	if err := ctx.ShouldBindJSON(&recomRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	recommendation := models.Recommendation{
		SectionID: recomRequest.SectioniD,
		Comment:   recomRequest.Comment,
	}

	if err := lib.Database.Create(&recommendation).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save recommendation"})
		return
	}

	var ilo models.IntendedLearningOutcome
	if err := lib.Database.FirstOrCreate(&ilo, recomRequest.Ilo_id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Intended Learning Outcomes not found"})
		return
	}

	ilo.RecommendationID = &recommendation.ID
	if err := lib.Database.Save(&ilo).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save recommendation"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Recommendation saved"})
}
