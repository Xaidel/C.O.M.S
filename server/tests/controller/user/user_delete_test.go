package tests

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/tests/test_helpers"
	"github.com/stretchr/testify/assert"
)

func Test_DeleteUser(t *testing.T) {
	test_helpers.MockUserData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("DELETE", "/api/v1/users/1", nil)
	w := httptest.NewRecorder()
	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNoContent, w.Code)

	req2, _ := http.NewRequest("GET", "/api/v1/users/1", nil)
	w2 := httptest.NewRecorder()
	test_helpers.Router.ServeHTTP(w2, req2)

	assert.Contains(t, w2.Body.String(), "error")
}

func Test_DeleteUserNotFound(t *testing.T) {
	test_helpers.MockUserData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("DELETE", "/api/v1/users/100", nil)
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Contains(t, w.Body.String(), "error")
}
