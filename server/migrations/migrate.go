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

func setupForeignKeyConstraints() {
	// ---User---//
	lib.Database.Migrator().CreateConstraint(&models.User{}, "Department")
	lib.Database.Migrator().CreateConstraint(&models.User{}, "fk_users_departments")

	// ---Program---//
	lib.Database.Migrator().CreateConstraint(&models.Program{}, "Department")
	lib.Database.Migrator().CreateConstraint(&models.Program{}, "fk_programs_departments")

	// ---Curriculum ---//
	lib.Database.Migrator().CreateConstraint(&models.Curriculum{}, "Program")
	lib.Database.Migrator().CreateConstraint(&models.Curriculum{}, "fk_curriculums_programs")

	// ---Dean---//
	lib.Database.Migrator().CreateConstraint(&models.Dean{}, "User")
	lib.Database.Migrator().CreateConstraint(&models.Dean{}, "fk_deans_users")
	lib.Database.Migrator().CreateConstraint(&models.Dean{}, "Department")
	lib.Database.Migrator().CreateConstraint(&models.Dean{}, "fk_deans_departments")

	// ---Assistant Dean---//
	lib.Database.Migrator().CreateConstraint(&models.AssistantDean{}, "User")
	lib.Database.Migrator().CreateConstraint(&models.AssistantDean{}, "fk_assistant_deans_users")

	// ---Program Head---//
	lib.Database.Migrator().CreateConstraint(&models.ProgramHead{}, "User")
	lib.Database.Migrator().CreateConstraint(&models.ProgramHead{}, "fk_program_heads_users")
	lib.Database.Migrator().CreateConstraint(&models.ProgramHead{}, "Program")
	lib.Database.Migrator().CreateConstraint(&models.ProgramHead{}, "fk_program_heads_programs")

	// ---Dean---//
	lib.Database.Migrator().CreateConstraint(&models.Faculty{}, "User")
	lib.Database.Migrator().CreateConstraint(&models.Faculty{}, "fk_faculty_users")

	// ---Students---//
	lib.Database.Migrator().CreateConstraint(&models.Student{}, "User")
	lib.Database.Migrator().CreateConstraint(&models.Student{}, "fk_students_users")
	lib.Database.Migrator().CreateConstraint(&models.Student{}, "Program")
	lib.Database.Migrator().CreateConstraint(&models.Student{}, "fk_students_programs")

	fmt.Println("Done adding foreign key constraints")
}

func main() {
	if err := lib.Database.AutoMigrate(
		&models.Department{},
		&models.User{},
		&models.Curriculum{},
		&models.Program{},
		&models.Dean{},
		&models.AssistantDean{},
		&models.ProgramHead{},
		&models.Faculty{},
		&models.Student{}); err != nil {
		fmt.Println("Error Migrating")
		return
	}
	setupForeignKeyConstraints()
	fmt.Println("Tables successfully migrated")
}
