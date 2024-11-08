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

func Test_PostDept(t *testing.T) {
	test_helpers.MockDeptData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("POST", "/api/v1/departments", bytes.NewBuffer([]byte(`{"dept_code": "CCS","dept_name": "College of Computer Studies"}`)))
	w := httptest.NewRecorder()
	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusCreated, w.Code)

	data, err := test_helpers.Unmarshal(w, "department")
	if err != nil {
		t.Fatal(err)
	}

	dept, ok := data.(map[string]interface{})
	if !ok {
		t.Fatalf("expected department to be a map, got %T", data)
	}

	assert.Equal(t, "CCS", dept["Dept_Code"])
	assert.Equal(t, "College of Computer Studies", dept["Dept_Name"])
	assert.Equal(t, float64(2), dept["ID"])
}

func Test_InvalidJSON(t *testing.T) {
	test_helpers.MockDeptData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("POST", "/api/v1/departments", bytes.NewBuffer([]byte(`{"this_is_an_invalid_json": "CCS","dept_name": "College of Computer Studies"}`)))
	w := httptest.NewRecorder()
	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "error")
}

func Test_AssertIdempotency(t *testing.T) {
	test_helpers.MockDeptData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("POST", "/api/v1/departments", bytes.NewBuffer([]byte(`{"dept_code": "SCIS","dept_name": "School of Computer and Information Sciences"}`)))
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusCreated, w.Code)

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
