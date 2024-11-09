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

func Test_PostCurr(t *testing.T) {
	test_helpers.MockProgData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("POST", "/api/v1/curriculums", bytes.NewBuffer([]byte(
		`{"effectivity_sem":1,
		"effectivity_sy": "2324",
		"cmo_name": "CMO no.15, series of 2022",
		"curr_id": "AG",
		"is_active": 1,
		"revision_no": 1,
		"program_id": 1
		}`)))
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusCreated, w.Code)

	data, err := test_helpers.Unmarshal(w, "curriculum")
	if err != nil {
		t.Fatal(err)
	}

	curr, ok := data.(map[string]interface{})
	if !ok {
		t.Fatalf("expected curriculum to be a map, got %T", data)
	}

	assert.Equal(t, float64(1), curr["Effectivity_Sem"])
	assert.Equal(t, float64(1), curr["IsActive"])
	assert.Equal(t, float64(1), curr["Revision_No"], curr["Revision_No"])
	assert.Equal(t, float64(1), curr["ProgramID"])
	assert.Equal(t, "2324", curr["Effectivity_SY"])
	assert.Equal(t, "CMO no.15, series of 2022", curr["CMO_Name"])
	assert.Equal(t, "AG", curr["CurrID"])
}

func Test_InvalidJSON(t *testing.T) {
	test_helpers.MockProgData()
	defer lib.TearDownMockDatabase()

	req, _ := http.NewRequest("POST", "/api/v1/departments", bytes.NewBuffer([]byte(
		`{"effectivity_sem":1,
		"effectivity_sy": "2324",
		"cmo_name": "CMO no.15, series of 2022",
		"is_active": 1,
		"revision_no": 1,
		"program_id": 1
		}`)))
	w := httptest.NewRecorder()

	test_helpers.Router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
	assert.Contains(t, w.Body.String(), "error")
}
