#!/usr/bin/env sh
echo "Please Wait"
cd server
go run ./migrations/migrate.go

echo "---Building C.O.M.S Container---"
docker compose build

docker compose up -d
