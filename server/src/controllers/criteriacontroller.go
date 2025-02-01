package controllers

import (
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/types"
	"github.com/gin-gonic/gin"
)

type CriteriaController struct{}

func (CriteriaController) GetByCOAEP(ctx *gin.Context) {
	sectionID := ctx.Param("sectionID")

	if sectionID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide the section ID"})
		return
	}

	var criterias []models.IloCriteria
	if err := lib.Database.Find(&criterias, "section_id = ?", sectionID).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Criterias not found"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"criteria": criterias})
}

func (CriteriaController) POST(ctx *gin.Context) {
	criteriaRequest := types.PostCriteria
	if err := ctx.ShouldBindJSON(&criteriaRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	criteria := models.IloCriteria{
		SectionID:                 criteriaRequest.Section_id,
		IntendedLearningOutcomeID: criteriaRequest.Ilo_id,
	}

	if err := lib.Database.FirstOrCreate(&criteria, models.IloCriteria{SectionID: criteriaRequest.Section_id, IntendedLearningOutcomeID: criteria.IntendedLearningOutcomeID}).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	criteria.Criteria = criteriaRequest.Criteria
	if err := lib.Database.Save(&criteria).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Criteria saved successfully"})
}
