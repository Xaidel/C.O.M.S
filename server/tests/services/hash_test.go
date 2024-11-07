package tests

import (
	"testing"

	"github.com/Xaidel/server/src/services"
	"github.com/stretchr/testify/assert"
)

func Test_EncryptAndCompare(t *testing.T) {
	testPassword := "password123"

	hashedTestPassword, err := services.Encrypt(testPassword)
	if err != nil {
		t.Fatalf("failed hashing test password %v", err)
	}

	samePassword := services.Compare(testPassword, hashedTestPassword)

	assert.NotEqual(t, testPassword, hashedTestPassword)
	assert.True(t, samePassword, "test password and hashed password must be the same")
}
