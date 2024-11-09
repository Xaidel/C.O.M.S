package tests

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/tests/test_helpers"
	"github.com/stretchr/testify/assert"
)

func Test_GetCurrByID(t *testing.T) {
	test_helpers.MockProgData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("GET", "/api/v1/curriculums/PK", nil)
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	data, err := test_helpers.Unmarshal(w, "curriculum")
	if err != nil {
		t.Fatal(err)
	}

	curr, ok := data.(map[string]interface{})
	if !ok {
		t.Fatalf("expected curriculum to be a map, got %T", data)
	}

	_, exists := curr["Program"]
	assert.True(t, exists, "Expected 'Program' to be embedded in the curriculum data")
	assert.Equal(t, "PK", curr["CurrID"])
	assert.Equal(t, float64(1), curr["Effectivity_Sem"])
	assert.Equal(t, "2324", curr["Effectivity_SY"])
	assert.Equal(t, "CMO no.15, series of 2022", curr["CMO_Name"])
	assert.Equal(t, float64(1), curr["Revision_No"])
	assert.Equal(t, float64(1), curr["IsActive"])
	assert.Equal(t, float64(1), curr["ProgramID"])
}

func Test_EndpointNotFound(t *testing.T) {
	test_helpers.MockDeptData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("GET", "/invalid_endpoint", nil)
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNotFound, w.Code)
}

func Test_CurrNotFound(t *testing.T) {
	test_helpers.MockDeptData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("GET", "/api/v1/curriculums/100", nil)
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Contains(t, w.Body.String(), "error")
}

func Test_GetAllCurr(t *testing.T) {
	test_helpers.MockProgData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("GET", "/api/v1/curriculums", nil)
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	data, err := test_helpers.Unmarshal(w, "curriculums")
	if err != nil {
		t.Fatal(err)
	}

	collection, ok := data.([]interface{})
	if !ok {
		t.Fatalf("expected curriculum to be a to be a slice, got %T", data)
	}

	_, exists := collection[0].(map[string]interface{})["Program"]
	assert.True(t, exists, "Expected 'Program' to be embedded in the curriculum data")
	assert.Equal(t, "PK", collection[0].(map[string]interface{})["CurrID"])
	assert.Equal(t, float64(1), collection[0].(map[string]interface{})["Effectivity_Sem"])
	assert.Equal(t, "2324", collection[0].(map[string]interface{})["Effectivity_SY"])
	assert.Equal(t, "CMO no.15, series of 2022", collection[0].(map[string]interface{})["CMO_Name"])
	assert.Equal(t, float64(1), collection[0].(map[string]interface{})["Revision_No"])
	assert.Equal(t, float64(1), collection[0].(map[string]interface{})["IsActive"])
	assert.Equal(t, float64(1), collection[0].(map[string]interface{})["ProgramID"])
}
