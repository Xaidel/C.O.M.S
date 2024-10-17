package services

import (
	"time"

	"github.com/Xaidel/server/config"
	"github.com/Xaidel/server/src/models"

	"github.com/golang-jwt/jwt/v5"
)

func IssueJWT(user *models.User) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(config.Get("SECRET")))
	return tokenString, err
}
