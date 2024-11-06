package tests

import (
	"bytes"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/controllers"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/services"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func mockData() {
	db, err := lib.ConnectMockDatabase()
	if err != nil {
		log.Panicf("Failed to connect the database: %v", err)
	}

	db.AutoMigrate(&models.User{}, &models.Department{})
	db.Create(&models.Department{
		Dept_Code: "SCIS",
		Dept_Name: "School of Computer and Information Sciences",
	})
	hash, _ := services.Encrypt("password123")
	db.Create(&models.User{
		UserID:       "1034",
		Password:     hash,
		Firstname:    "John Mark",
		Middlename:   "Salvador",
		Lastname:     "Ralota",
		DepartmentID: 1,
	})
}

func init() {
	mockData()
}

func TestLogin_InvalidJSON(t *testing.T) {
	r := gin.Default()
	r.POST("/api/v1/auth/login", controllers.AuthController{}.Login)

	req, _ := http.NewRequest("POST", "/api/v1/auth/login", bytes.NewBuffer([]byte(`{invalid json}`)))
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "error")
}

func TestLogin_InvalidUsername(t *testing.T) {
	r := gin.Default()
	r.POST("/api/v1/auth/login", controllers.AuthController{}.Login)

	req, _ := http.NewRequest("POST", "/api/v1/auth/login", bytes.NewBuffer([]byte(`{"userID": "1111", "password": "password123"}`)))
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "Invalid Username")
}

func TestLogin_InvalidPassword(t *testing.T) {
	r := gin.Default()
	r.POST("/api/v1/auth/login", controllers.AuthController{}.Login)

	req, _ := http.NewRequest("POST", "/api/v1/auth/login", bytes.NewBuffer([]byte(`{"userID": "1034", "password": "password321"}`)))
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "Invalid Password")
}

func TestLogin_Success(t *testing.T) {
	r := gin.Default()
	r.POST("/api/v1/auth/login", controllers.AuthController{}.Login)

	req, _ := http.NewRequest("POST", "/api/v1/auth/login", bytes.NewBuffer([]byte(`{"userID": "1034", "password": "password123"}`)))
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Contains(t, w.Body.String(), "user")
	assert.Contains(t, w.Body.String(), "userID")
	assert.Contains(t, w.Body.String(), "firstname")
	assert.Contains(t, w.Body.String(), "middlename")
	assert.Contains(t, w.Body.String(), "lastname")
}
