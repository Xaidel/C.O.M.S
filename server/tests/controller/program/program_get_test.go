package tests

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/tests/test_helpers"
	"github.com/stretchr/testify/assert"
)

func Test_GetProgramByID(t *testing.T) {
	test_helpers.MockDeptData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("GET", "/api/v1/programs/1", nil)
	w := httptest.NewRecorder()
	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	data, err := test_helpers.Unmarshal(w, "program")
	if err != nil {
		t.Fatal(err)
	}

	program, ok := data.(map[string]interface{})
	if !ok {
		t.Fatalf("expected program to be a map, got %T", data)
	}

	assert.Equal(t, "BSIT", program["Program_Code"])
	assert.Equal(t, "Bachelor of Science in Information Technology", program["Program_Name"])
	assert.Equal(t, float64(1), program["DepartmentID"])
	assert.Equal(t, float64(1), program["ID"])
}

func Test_EndpointNotFound(t *testing.T) {
	test_helpers.MockDeptData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("GET", "/invalid_endpoint", nil)
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNotFound, w.Code)
}

func Test_ProgramNotFound(t *testing.T) {
	test_helpers.MockDeptData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("GET", "/api/v1/programs/100", nil)
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Contains(t, w.Body.String(), "error")
}

func Test_GetAllPrograms(t *testing.T) {
	test_helpers.MockDeptData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("GET", "/api/v1/programs", nil)
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	data, err := test_helpers.Unmarshal(w, "programs")
	if err != nil {
		t.Fatal(err)
	}

	collection, ok := data.([]interface{})
	if !ok {
		t.Fatalf("expected 'programs' to be a slice, got %T", data)
	}

	assert.Equal(t, "BSIT", collection[0].(map[string]interface{})["Program_Code"])
	assert.Equal(t, "Bachelor of Science in Information Technology", collection[0].(map[string]interface{})["Program_Name"])
	assert.Equal(t, float64(1), collection[0].(map[string]interface{})["DepartmentID"])
	assert.Equal(t, float64(1), collection[0].(map[string]interface{})["ID"])
}
