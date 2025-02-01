package controllers

import (
	"errors"
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/types"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type CriteriaController struct{}

func (CriteriaController) POST(ctx *gin.Context) {
	criteriaRequest := types.PostCriteria
	if err := ctx.ShouldBindJSON(&criteriaRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var criteria models.IloCriteria

	if err := lib.Database.Where(models.IloCriteria{IntendedLearningOutcomeID: criteriaRequest.Ilo_id}).First(&criteria).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			crit := models.IloCriteria{
				IntendedLearningOutcomeID: criteriaRequest.Ilo_id,
				Criteria:                  criteriaRequest.Criteria,
			}
			if err := lib.Database.Create(&crit).Error; err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			ctx.JSON(http.StatusOK, gin.H{"message": criteria})
			return
		}
	}
	criteria.Criteria = criteriaRequest.Criteria
	if err := lib.Database.Save(&criteria).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": criteria})
}
