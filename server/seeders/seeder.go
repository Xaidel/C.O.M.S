package main

import (
	"fmt"
	"log"

	"github.com/Xaidel/server/lib"
	seed "github.com/Xaidel/server/seeds"
	"github.com/Xaidel/server/src/services"

	"github.com/Xaidel/server/config"
)

func init() {
	config.Load()
	lib.ConnectDatabase()
}

func seedDept() {
	fmt.Println("Seeding Department")
	for _, dept := range seed.Departments {
		if err := lib.Database.Create(&dept).Error; err != nil {
			log.Printf("Error in Seeding departments %s: %v", dept.Dept_Code, err)
		}
	}
	fmt.Println("Done Seeding Department")
}

func seedProg() {
	fmt.Println("Seeding Program")
	for _, prog := range seed.Programs {
		if err := lib.Database.Create(&prog).Error; err != nil {
			log.Printf("Error in Seeding departments %s: %v", prog.Program_Code, err)
		}
	}
	fmt.Println("Done Seeding Program")
}

func seedCurriculum() {
	fmt.Println("Seeding Curriculum")
	for _, curr := range seed.Curriculum {
		if err := lib.Database.Create(&curr).Error; err != nil {
			log.Printf("Error in Seeding Curriculum %s: %v", curr.CurrID, err)
		}
	}
	fmt.Println("Done Seeding Curriculum")
}

func seedCourse() {
	fmt.Println("Seeding Courses")
	for _, curr := range seed.Course {
		if err := lib.Database.Create(&curr).Error; err != nil {
			log.Printf("Error in Seeding Curriculum %s: %v", curr.Course_Name, err)
		}
	}
	fmt.Println("Done Seeding Courses")
}

func seedUser() {
	fmt.Println("Seeding User")
	for _, user := range seed.Users {
		hashedPassword, err := services.Encrypt(user.Password)
		if err != nil {
			log.Printf("Error on hashing password for user %s: %v", user.UserID, err)
		}
		user.Password = hashedPassword
		if err := lib.Database.Create(&user).Error; err != nil {
			log.Printf("Error in Seeding User %s: %v", user.UserID, err)
		}
	}
	fmt.Println("Done Seeding Users")
}

func seedRoles() {
	fmt.Println("Seeding Dean")
	if err := lib.Database.Create(&seed.Dean).Error; err != nil {
		log.Print("Error in Seeding Dean")
	}
	fmt.Println("Done Seeding Dean")

	fmt.Println("Seeding Assistant Dean")
	if err := lib.Database.Create(&seed.AssistantDean).Error; err != nil {
		log.Print("Error in Seeding Assistant Dean")
	}
	fmt.Println("Done Seeding Assistant Dean")

	fmt.Println("Seeding Program Head")
	if err := lib.Database.Create(&seed.ProgramHead).Error; err != nil {
		log.Print("Error in Seeding Program Head")
	}
	fmt.Println("Done Seeding Program Head")

	fmt.Println("Seeding Faculty")
	if err := lib.Database.Create(&seed.Faculty).Error; err != nil {
		log.Print("Error in Seeding Faculty")
	}
	fmt.Println("Done Seeding Faculty")

	fmt.Println("Seeding Student")
	if err := lib.Database.Create(&seed.Student).Error; err != nil {
		log.Print("Error in Seeding Student")
	}
	fmt.Println("Done Seeding Student")
}

func main() {
	seedDept()
	seedProg()
	seedCurriculum()
	seedCourse()
	seedUser()
	seedRoles()
}
