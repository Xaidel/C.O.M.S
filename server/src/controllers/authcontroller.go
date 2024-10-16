package controllers

import (
	"net/http"
	"server/lib"
	"server/src/models"
	"server/src/services"
	"server/src/types"

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
		return
	}
	if !services.Compare(types.LoginRequest.Password, user.Password) {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid Password",
		})
		return
	}

	tokenString, err := services.IssueJWT(&user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to generate a token",
		})
		return
	}

	res := map[string]interface{}{
		"id":       user.ID,
		"userID":   user.UserID,
		"acc_type": user.AccountType,
	}

	ctx.SetSameSite(http.SameSiteStrictMode)
	ctx.SetCookie("Authorization", tokenString, 3600*24*300, "/", "", false, true)
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
