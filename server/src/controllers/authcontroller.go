package controllers

import (
	"fmt"
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
	var loginReq types.LoginRequest

	if err := ctx.ShouldBindJSON(&loginReq); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var user models.User
	lib.Database.First(&user, "user_id = ?", loginReq.UserID)

	role, err := services.AssertRoleStruct(loginReq.Role)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Role"})
	}

	if result := lib.Database.Omit("User").First(&role, "user_id", user.UserID).Error; result != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": fmt.Sprintf("There are no user %v, associated with %v role", user.UserID, loginReq.Role),
		})
		return
	}
	// var department models.Department

	if user.UserID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid Username",
		})
		return
	}
	if !services.Compare(loginReq.Password, user.Password) {
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

	userData := map[string]interface{}{
		"UserID":     user.UserID,
		"Firstname":  user.Firstname,
		"MiddleName": user.Middlename,
		"Lastname":   user.Lastname,
	}

	res := map[string]interface{}{
		"role":      loginReq.Role,
		"user_info": userData,
		"role_info": role,
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
