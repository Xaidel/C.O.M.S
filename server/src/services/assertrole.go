package services

import "github.com/Xaidel/server/src/models"

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
