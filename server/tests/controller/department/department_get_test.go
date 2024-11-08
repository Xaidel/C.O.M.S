package tests

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/tests/test_helpers"
	"github.com/stretchr/testify/assert"
)

func Test_GetDeptByID(t *testing.T) {
	test_helpers.MockDeptData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("GET", "/api/v1/departments/1", nil)
	w := httptest.NewRecorder()
	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	data, err := test_helpers.Unmarshal(w, "department")
	if err != nil {
		t.Fatal(err)
	}

	dept, ok := data.(map[string]interface{})
	if !ok {
		t.Fatalf("expected department to be a map, got %T", data)
	}

	assert.Equal(t, "SCIS", dept["Dept_Code"])
	assert.Equal(t, "School of Computer and Information Sciences", dept["Dept_Name"])
	assert.Equal(t, float64(1), dept["ID"])
}

func Test_EndpointNotFound(t *testing.T) {
	test_helpers.MockDeptData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("GET", "/invalid_endpoint", nil)
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNotFound, w.Code)
}

func Test_DeptNotFound(t *testing.T) {
	test_helpers.MockDeptData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("GET", "/api/v1/departments/100", nil)
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Contains(t, w.Body.String(), "error")
}

func Test_GetAllDepts(t *testing.T) {
	test_helpers.MockDeptData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("GET", "/api/v1/departments", nil)
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)
	fmt.Println(w.Code)
	assert.Equal(t, http.StatusOK, w.Code)

	data, err := test_helpers.Unmarshal(w, "departments")
	if err != nil {
		t.Fatal(err)
	}

	collection, ok := data.([]interface{})
	if !ok {
		t.Fatalf("expected 'departments' to be a slice, got %T", data)
	}

	assert.Equal(t, "SCIS", collection[0].(map[string]interface{})["Dept_Code"])
	assert.Equal(t, "School of Computer and Information Sciences", collection[0].(map[string]interface{})["Dept_Name"])
	assert.Equal(t, float64(1), collection[0].(map[string]interface{})["ID"])
}
