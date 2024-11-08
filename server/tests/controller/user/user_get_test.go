package tests

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/tests/test_helpers"
	"github.com/stretchr/testify/assert"
)

func Test_GetUserByID(t *testing.T) {
	test_helpers.MockUserData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("GET", "/api/v1/users/1", nil)
	w := httptest.NewRecorder()
	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	data, err := test_helpers.Unmarshal(w, "user")
	if err != nil {
		t.Fatal(err)
	}

	user, ok := data.(map[string]interface{})
	if !ok {
		t.Fatalf("expected user to be a map, got %T", data)
	}

	assert.Equal(t, "1034", user["UserID"])
	assert.Equal(t, "John Mark", user["Firstname"])
	assert.Equal(t, "Salvador", user["Middlename"])
	assert.Equal(t, "Ralota", user["Lastname"])
	assert.Equal(t, float64(1), user["DepartmentID"])
	assert.Equal(t, float64(1), user["ID"])
}

func Test_EndpointNotFound(t *testing.T) {
	test_helpers.MockUserData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("GET", "/invalid_endpoint", nil)
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNotFound, w.Code)
}

func Test_UserNotFound(t *testing.T) {
	test_helpers.MockUserData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("GET", "/api/v1/users/100", nil)
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Contains(t, w.Body.String(), "error")
}

func Test_GetAllUser(t *testing.T) {
	test_helpers.MockUserData()
	defer lib.TearDownMockDatabase()
	req, _ := http.NewRequest("GET", "/api/v1/users", nil)
	w := httptest.NewRecorder()
	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	data, err := test_helpers.Unmarshal(w, "users")
	if err != nil {
		t.Fatal(err)
	}

	collection, ok := data.([]interface{})
	if !ok {
		t.Fatalf("expected 'users' to be a slice, got %T", data)
	}

	assert.Equal(t, "1034", collection[0].(map[string]interface{})["UserID"])
	assert.Equal(t, "John Mark", collection[0].(map[string]interface{})["Firstname"])
	assert.Equal(t, "Salvador", collection[0].(map[string]interface{})["Middlename"])
	assert.Equal(t, "Ralota", collection[0].(map[string]interface{})["Lastname"])
	assert.Equal(t, float64(1), collection[0].(map[string]interface{})["DepartmentID"])
	assert.Equal(t, float64(1), collection[0].(map[string]interface{})["ID"])
}
