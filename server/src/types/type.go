package types

type LoginRequest struct {
	UserID   string `json:"user_id" binding:"required"`
	Password string `json:"password" binding:"required"`
}

var CreateUserRequest struct {
	LoginRequest
	DepartmentID uint `json:"dept_id" binding:"required"`
}

var DepartmentRequest struct {
	DeptCode string `json:"dept_code" binding:"required"`
	DeptName string `json:"dept_name" binding:"required"`
}

var ProgramRequest struct {
	ProgramCode  string `json:"program_code" binding:"required"`
	ProgramName  string `json:"program_name" binding:"required"`
	DepartmentID uint   `json:"dept_id" binding:"required"`
}
