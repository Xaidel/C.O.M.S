package controllers

import (
	"net/http"

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
}
