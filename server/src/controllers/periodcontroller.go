package controllers

import (
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/gin-gonic/gin"
)

type PeriodController struct{}

func (PeriodController) GET(ctx *gin.Context) {
	id := ctx.Param("id")
	if id != "" {
		var period models.Period
		if err := lib.Database.First(&period, id).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Period not found"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"period": period})
	} else {
		var periods []models.Period
		if err := lib.Database.Find(&periods).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Period not found"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"periods": periods})
	}
}

func (PeriodController) GetCurrent(ctx *gin.Context) {
	var period models.Period
	if err := lib.Database.First(&period, "is_current = ?", 1).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Can't find current period"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"current_period": period})
}
