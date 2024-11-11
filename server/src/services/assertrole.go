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

func AssertRoleType(roleData interface{}, user *models.User) (interface{}, bool) {
	switch v := roleData.(type) {
	case *models.Dean:
		*user = v.User
		return v, true
	case *models.AssistantDean:
		*user = v.User
		return v, true
	case *models.ProgramHead:
		*user = v.User
		return v, true
	case *models.Faculty:
		*user = v.User
		return v, true
	case *models.Student:
		*user = v.User
		return v, true
	default:
		return nil, false
	}
}
