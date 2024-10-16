package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func Load() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading the .env file")
	}
}

func Get(key string) string {
	return os.Getenv(key)
}
