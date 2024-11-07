package test_helpers

import (
	"encoding/json"
	"fmt"
	"net/http/httptest"
)

func Unmarshal(w *httptest.ResponseRecorder, resource string) (interface{}, error) {
	var res map[string]interface{}
	if err := json.Unmarshal(w.Body.Bytes(), &res); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	data, ok := res[resource]

	if !ok {
		return nil, fmt.Errorf("expected '%s' wrapper in response", resource)
	}

	return data, nil
}
