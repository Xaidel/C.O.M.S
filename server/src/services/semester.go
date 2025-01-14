package services

import "errors"

func ConvertSemester(semester string) (int, error) {
	switch semester {
	case "summer":
		return 0, nil
	case "first_sem":
		return 1, nil
	case "second_sem":
		return 2, nil
	default:
		return -1, errors.New("semester invalid")
	}
}
