package controllers

import (
	"net/http"
	"server/lib"
	"server/src/models"
	"server/src/services"
	"server/src/types"

	"github.com/gin-gonic/gin"
)

type UserController struct{}

func (UserController) GET(ctx *gin.Context) {
	id := ctx.Param("id")

	if id != "" {
		var user models.User
		if err := lib.Database.First(&user, id).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "User not Found"})
			return
		}
		ctx.JSON(http.StatusOK, user)
	} else {
		var users []models.User
		if result := lib.Database.Find(&users); result.Error != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
			return
		}
		ctx.JSON(http.StatusOK, users)
	}
}

func (UserController) POST(ctx *gin.Context) {
	ctx.Bind(&types.LoginRequest)
	hashedPassword, err := services.Encrypt(types.LoginRequest.Password)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to Hash the given password",
		})
		return
	}
	user := models.User{UserID: types.LoginRequest.UserID, Password: hashedPassword}
	if result := lib.Database.Create(&user); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": result.Error.Error(),
		})
		return
	}
	ctx.JSON(http.StatusCreated, user)
}

func (UserController) DELETE(ctx *gin.Context) {
	id := ctx.Param("id")
	if err := lib.Database.Delete(&models.User{}, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"error": "User does not exist",
		})
		return
	}
	ctx.JSON(http.StatusNoContent, gin.H{})
}
