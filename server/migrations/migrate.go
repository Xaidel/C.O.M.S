package main

import (
	"fmt"

	"github.com/Xaidel/server/lib"

	"github.com/Xaidel/server/config"
	"github.com/Xaidel/server/src/models"
)

func init() {
	config.Load()
	lib.ConnectDatabase()
}

func main() {
	if err := lib.Database.AutoMigrate(
		&models.User{},
		&models.Dean{},
		&models.AssistantDean{},
		&models.ProgramHead{},
		&models.Faculty{},
		&models.Program{},
		&models.Student{},
		&models.Period{},
		&models.Department{},
		&models.Curriculum{},
		&models.Course{},
		&models.Coeap{},
		&models.Section{},
		&models.CourseOutcome{},
		&models.AssessmentTool{},
		&models.IntendedLearningOutcome{},
		&models.ILOScore{},
		&models.Recommendation{},
		&models.IloCriteria{},
	); err != nil {
		fmt.Println("Error Migrating")
		return
	}

	fmt.Println("Tables successfully migrated")
}
