package controllers

import (
	"net/http"

	"github.com/Xaidel/server/config"
	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/services"
	"github.com/Xaidel/server/src/types"

	"github.com/gin-gonic/gin"
)

type AuthController struct{}

func (AuthController) Login(ctx *gin.Context) {
	if ctx.Bind(&types.LoginRequest) != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Bad Request",
		})
		return
	}
	var user models.User

	lib.Database.First(&user, "user_id = ?", types.LoginRequest.UserID)

	if user.ID == 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid Username",
		})
	}
	if !services.Compare(types.LoginRequest.Password, user.Password) {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid Password",
		})
	}

	tokenString, err := services.IssueJWT(&user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to generate a token",
		})
	}

	res := map[string]interface{}{
		"userID":     user.UserID,
		"firstname":  user.Firstname,
		"middlename": user.Middlename,
		"lastname":   user.Lastname,
	}

	domain := config.Get("DOMAIN")
	ctx.SetSameSite(http.SameSiteLaxMode)
	ctx.SetCookie("Authorization", tokenString, 3600*24*300, "/", domain, false, true)
	ctx.JSON(http.StatusOK, gin.H{"user": res})
}

func (AuthController) Validate(ctx *gin.Context) {
	tokenString, err := ctx.Cookie("Authorization")
	if err != nil {
		ctx.JSON(http.StatusOK, gin.H{"message": "Token not Found"})
	}

	if tokenString != "" {
		ctx.JSON(http.StatusOK, gin.H{"message": "Valid Token"})
	}
}
