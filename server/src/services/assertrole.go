package services

import (
	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
)

func AssertRoleStruct(role string) (interface{}, error) {
	switch role {
	case "Dean":
		return &models.Dean{}, nil
	case "Assistant Dean":
		return &models.AssistantDean{}, nil
	case "Program Head":
		return &models.ProgramHead{}, nil
	case "Faculty":
		return &models.Faculty{}, nil
	case "Student":
		return &models.Student{}, nil
	default:
		return nil, nil
	}
}

func PreloadLoginInfo(role string, userID string) (interface{}, error) {
	switch role {
	case "Dean":
		var model models.Dean
		err := lib.Database.Preload("User").Preload("Department").First(&model, "user_id = ?", userID).Error
		return model, err
	case "Assistant Dean":
		var model models.AssistantDean
		err := lib.Database.Preload("User").Preload("Department").First(&model, "user_id = ?", userID).Error
		return model, err
	case "Program Head":
		var model models.ProgramHead
		err := lib.Database.Preload("User").Preload("Programs").Preload("Programs.Department").First(&model, "user_id = ?", userID).Error
		if len(model.Programs) == 0 {
			return nil, err
		}
		return model, err
	case "Faculty":
		var model models.Faculty
		err := lib.Database.Preload("User").Preload("Department").Preload("Courses").First(&model, "user_id = ?", userID).Error
		return model, err
	case "Student":
		var model models.Student
		err := lib.Database.Preload("User").Preload("Program.Department").First(&model, "user_id = ?", userID).Error
		return model, err
	default:
		return nil, nil
	}
}
