#Client

FROM node:lts-slim as client

WORKDIR /client

#Copy package.json & package-lock.json for deps
COPY ./client/package*.json ./

#install deps
RUN npm ci

#Copy the rest of the files and build
COPY ./client/. ./
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

CMD ["./server"]

