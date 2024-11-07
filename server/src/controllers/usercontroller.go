package controllers

import (
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/services"
	"github.com/Xaidel/server/src/types"

	"github.com/gin-gonic/gin"
)

type UserController struct{}

func (UserController) GET(ctx *gin.Context) {
	id := ctx.Param("id")

	if id != "" {
		var user models.User
		if err := lib.Database.Preload("Department").First(&user, id).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "User not Found"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"user": user})
	} else {
		var users []models.User
		if result := lib.Database.Preload("Department").Find(&users); result.Error != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"users": users})
	}
}

func (UserController) POST(ctx *gin.Context) {
	userRequest := types.CreateUserRequest

	if err := ctx.ShouldBindJSON(&userRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, err := services.Encrypt(userRequest.Password)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to Hash the given password",
		})
		return
	}
	user := models.User{
		UserID:       userRequest.UserID,
		Password:     hashedPassword,
		DepartmentID: userRequest.DepartmentID,
		Firstname:    userRequest.Firstname,
		Middlename:   userRequest.Middlename,
		Lastname:     userRequest.Lastname,
	}
	if result := lib.Database.Create(&user); result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": result.Error.Error(),
		})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"user": user})
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
