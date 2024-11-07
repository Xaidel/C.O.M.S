package tests

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/tests/test_helpers"
	"github.com/stretchr/testify/assert"
)

func TestLogin_InvalidJSON(t *testing.T) {
	req, _ := http.NewRequest("POST", "/api/v1/auth/login", bytes.NewBuffer([]byte(`{invalid json}`)))
	w := httptest.NewRecorder()
	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "error")
}

func TestLogin_InvalidUsername(t *testing.T) {
	test_helpers.MockData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("POST", "/api/v1/auth/login", bytes.NewBuffer([]byte(`{"userID": "1111", "password": "password123"}`)))
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "Invalid Username")
}

func TestLogin_InvalidPassword(t *testing.T) {
	test_helpers.MockData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("POST", "/api/v1/auth/login", bytes.NewBuffer([]byte(`{"userID": "1034", "password": "password321"}`)))
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)
	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "Invalid Password")
}

func TestLogin_Success(t *testing.T) {
	test_helpers.MockData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("POST", "/api/v1/auth/login", bytes.NewBuffer([]byte(`{"userID": "1034", "password": "password123"}`)))
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	var res map[string]interface{}
	if err := json.Unmarshal(w.Body.Bytes(), &res); err != nil {
		t.Fatalf("Error unmarshaling response: %v", err)
	}

	userData, ok := res["user"].(map[string]interface{})
	if !ok {
		t.Fatalf("Expected 'user' wrapper in response")
	}

	assert.Equal(t, "1034", userData["userID"])
	assert.Equal(t, "John Mark", userData["firstname"])
	assert.Equal(t, "Salvador", userData["middlename"])
	assert.Equal(t, "Ralota", userData["lastname"])
}
