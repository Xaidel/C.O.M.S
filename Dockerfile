#Client

FROM node:lts-slim as Client

WORKDIR /client
COPY ./client/. .
RUN npm i
RUN npm run build

#Server
FROM golang:alpine as Server
WORKDIR /server

COPY  ./server/go.mod ./server/go.sum ./
RUN go mod download

COPY ./server .

COPY --from=Client /client/dist ./static

RUN CGO_ENABLED=0 GOOS=linux go build -o server

EXPOSE 3000

cmd ["./server"]

