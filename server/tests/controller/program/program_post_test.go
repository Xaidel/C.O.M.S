package tests

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/tests/test_helpers"
	"github.com/stretchr/testify/assert"
)

func Test_PostProg(t *testing.T) {
	test_helpers.MockDeptData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("POST", "/api/v1/programs", bytes.NewBuffer([]byte(
		`{"program_code": "BSCS", 
		"program_name": "Bachelor of Science in Computer Science", 
		"dept_id": 1}`)))
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusCreated, w.Code)

	data, err := test_helpers.Unmarshal(w, "program")
	if err != nil {
		t.Fatal(err)
	}

	program, ok := data.(map[string]interface{})
	if !ok {
		t.Fatalf("expected program to be a map, got %T", data)
	}

	assert.Equal(t, "BSCS", program["Program_Code"])
	assert.Equal(t, "Bachelor of Science in Computer Science", program["Program_Name"])
	assert.Equal(t, float64(1), program["DepartmentID"])
	assert.Equal(t, float64(2), program["ID"])
}

func Test_InvalidJSON(t *testing.T) {
	test_helpers.MockDeptData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("POST", "/api/v1/programs", bytes.NewBuffer([]byte(
		`{"invalid_json": "BSCS", 
		"program_name": "Bachelor of Science in Computer Science", 
		"dept_id": 1}`)))
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "error")
}
