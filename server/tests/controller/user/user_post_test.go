package tests

import (
	"bytes"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/tests/test_helpers"
	"github.com/stretchr/testify/assert"
)

func Test_PostUser(t *testing.T) {
	test_helpers.MockData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("POST", "/api/v1/users", bytes.NewBuffer([]byte(
		`{"userID": "735", 
		"password": "password123", 
		"firstname": "Aliyah Patrice", 
		"middlename": "Panis", 
		"lastname": "Luntok", 
		"dept_id": 1}`)))
	w := httptest.NewRecorder()
	test_helpers.Router.ServeHTTP(w, req)

	fmt.Println(w.Body)
	assert.Equal(t, http.StatusCreated, w.Code)

	data, err := test_helpers.Unmarshal(w, "user")
	if err != nil {
		t.Fatal(err)
	}

	user, ok := data.(map[string]interface{})
	if !ok {
		t.Fatalf("expected user to be a map, got %T", data)
	}

	assert.Equal(t, "735", user["UserID"])
	assert.Equal(t, "Aliyah Patrice", user["Firstname"])
	assert.Equal(t, "Panis", user["Middlename"])
	assert.Equal(t, "Luntok", user["Lastname"])
	assert.Equal(t, float64(1), user["DepartmentID"])
}

func Test_InvalidJSON(t *testing.T) {
	test_helpers.MockData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("POST", "/api/v1/users", bytes.NewBuffer([]byte(
		`{"userID": "735", 
		"password": "password123", 
		"firstname": "Aliyah Patrice", 
		"middlename": "Panis", 
		"dept_id": 1}`)))
	w := httptest.NewRecorder()
	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "error")
}

func Test_StoredAsHash(t *testing.T) {
	test_helpers.MockData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("GET", "/api/v1/users/1", nil)
	w := httptest.NewRecorder()
	test_helpers.Router.ServeHTTP(w, req)

	data, err := test_helpers.Unmarshal(w, "user")
	if err != nil {
		t.Fatal(err)
	}

	user, ok := data.(map[string]interface{})
	if !ok {
		t.Fatalf("expected user to be a map, got %T", data)
	}

	assert.NotEqual(t, "password123", user["Password"])
}
