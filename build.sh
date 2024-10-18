#!/usr/bin/env sh
echo "Please Wait"
cd server
go run ./migrations/migrate.go

docker compose build
echo "---Building C.O.M.S Container---"

docker compose up -d
