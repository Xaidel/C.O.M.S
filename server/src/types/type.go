package types

type LoginRequest struct {
	Role     string `json:"role" binding:"required"`
	UserID   string `json:"userID" binding:"required"`
	Password string `json:"password" binding:"required"`
}

var CreateUserRequest struct {
	LoginRequest
	Firstname    string `json:"firstname" binding:"required"`
	Middlename   string `json:"middlename" binding:"required"`
	Lastname     string `json:"lastname" binding:"required"`
	DepartmentID uint   `json:"dept_id" binding:"required"`
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

var ProgramHeadRequest struct {
	UserID    string `json:"userID" binding:"required"`
	ProgramID uint   `json:"program_id" binding:"required"`
}

var FacultyRequest struct {
	UserID  string `json:"userID" binding:"required"`
	Dept_ID uint   `json:"dept_id" binding:"required"`
}

var CurriculumRequest struct {
	Effectivity_SY  string `json:"effectivity_sy" binding:"required"`
	CMO_Name        string `json:"cmo_name" binding:"required"`
	CurrID          string `json:"curr_id" binding:"required"`
	Effectivity_Sem string `json:"effectivity_sem" binding:"required"`
	Revision_No     uint   `json:"revision_no" binding:"required"`
	ProgramID       uint   `json:"program_id" binding:"required"`
}

var CourseRequest struct {
	Course_Number string `json:"course_number" binding:"required"`
	ProspectusID  uint   `json:"prospectus_id" binding:"required"`
	Course_Name   string `json:"course_name" binding:"required"`
	Lec_Unit      string `json:"lec_unit" binding:"required"`
	Lab_Unit      string `json:"lab_unit" binding:"required"`
	Sem           uint   `json:"sem" binding:"required"`
	Year_Level    uint   `json:"year_level" binding:"required"`
}

var CoaepRequest struct {
	PeriodID   uint   `json:"period_id" binding:"required"`
	CourseName string `json:"course_name" binding:"required"`
	CourseID   uint   `json:"course_id" binding:"required"`
}

var CourseOutcomeRequest struct {
	Statement string `json:"statement" binding:"required"`
}
var IntendedLearningOutcomeRequest struct {
	Statement string `json:"statement" binding:"required"`
}

var StudentRequest struct {
	UserID string `json:"userID" binding:"required"`
}

var DeleteStudentRequest struct {
	UserID    string `json:"userID" binding:"required"`
	SectionID uint   `json:"section_id" binding:"required"`
}

var PostScoreRequest struct {
	Student_id string `json:"student_id" binding:"required"`
	Ilo_id     uint   `json:"ilo_id" binding:"required"`
	Coaep_id   uint   `json:"coaep_id" binding:"required"`
	SectionID  uint   `json:"section_id" binding:"required"`
	Value      uint   `json:"value"`
}
var PostRecomRequest struct {
	SectioniD uint    `json:"section_id" binding:"required"`
	Ilo_id    uint    `json:"ilo_id" binding:"required"`
	Comment   *string `json:"comment" binding:"required"`
}

var PostCriteria struct {
	Ilo_id     uint `json:"ilo_id" binding:"required"`
	Section_id uint `json:"section_id" binding:"required"`
	Criteria   uint `json:"criteria" binding:"required"`
}
