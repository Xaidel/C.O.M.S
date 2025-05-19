package controllers

import (
	"net/http"
	"strconv"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/types"
	"github.com/gin-gonic/gin"
	"github.com/gocarina/gocsv"
)

type CourseOutcomeController struct{}

func (CourseOutcomeController) GET(ctx *gin.Context) {
	id := ctx.Param("id")

	if id != "" {
		var co models.CourseOutcome
		if err := lib.Database.First(&co, id).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Course Outcome not found"})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"course_outcome": co})
	} else {
		var cos []models.CourseOutcome
		if err := lib.Database.Find(&cos).Error; err != nil {
			ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"course_outcomes": cos})
	}
}

func (CourseOutcomeController) BatchProcessCO(ctx *gin.Context) {
	file, err := ctx.FormFile("file")
	coaepID := ctx.Param("coaepID")

	if coaepID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "COAEP ID not found"})
		return
	}
	var coaep models.Coeap
	if err := lib.Database.First(&coaep, coaepID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "COAEP not found"})
		return
	}

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "File upload failed"})
		return
	}

	uploadedFile, err := file.Open()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Cannot open file"})
		return
	}

	defer uploadedFile.Close()

	var csvCO []*models.Coeap
	if err := gocsv.Unmarshal(uploadedFile, &csvCO); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse CSV"})
		return
	}

	if err := lib.Database.Create(&csvCO).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save Course Outcomes"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"CO": csvCO})
}

func (CourseOutcomeController) POST(ctx *gin.Context) {
	id := ctx.Param("planID")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Provide the Course Outcome Assessment and Evaluation Plan"})
		return
	}

	coRequest := types.CourseOutcomeRequest
	if err := ctx.ShouldBindJSON(&coRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var coaep models.Coeap

	if err := lib.Database.First(&coaep, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "COAEP not found"})
		return
	}

	co := models.CourseOutcome{
		Level:     coRequest.Level,
		Statement: coRequest.Statement,
	}

	if err := lib.Database.FirstOrCreate(&co, models.CourseOutcome{Statement: co.Statement, CoeapID: &coaep.ID}).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"course_outcome": co})
}

func (CourseOutcomeController) DELETE(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Please provide the Course Outcome ID"})
		return
	}
	var co models.CourseOutcome
	if err := lib.Database.First((&co), id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Course Outcome does not exist"})
		return
	}

	if err := lib.Database.Delete(&co).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete Course Outcome"})
		return
	}
	ctx.JSON(http.StatusNoContent, gin.H{})
}

type CourseOutcomeCSVRow struct {
	CourseName              string `csv:"Course_Name"`
	CourseOutcomeStatement  string `csv:"Course_Outcome_Statement"`
	IntendedLearningOutcome string `csv:"Intended_Learning_Outcome"`
	AssessmentTool          string `csv:"Assessment_Tool"`
	TargetPopulation        uint   `csv:"Target_Population"`
	TargetScore             uint   `csv:"Target_Score"`
	Level                   string `csv:"Level"`
}

func (CourseOutcomeController) UploadCO(ctx *gin.Context) {
	file, err := ctx.FormFile("file")
	periodID := ctx.Param("periodID")
	if err != nil || periodID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Missing file or period ID"})
		return
	}

	var rows []CourseOutcomeCSVRow
	f, _ := file.Open()
	defer f.Close()
	if err := gocsv.Unmarshal(f, &rows); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse CSV"})
		return
	}

	intPeriodID, _ := strconv.ParseUint(periodID, 10, 64)

	// Group: Course -> CourseOutcomeStatement -> Rows
	grouped := make(map[string]map[string][]CourseOutcomeCSVRow)
	for _, row := range rows {
		if grouped[row.CourseName] == nil {
			grouped[row.CourseName] = make(map[string][]CourseOutcomeCSVRow)
		}
		grouped[row.CourseName][row.CourseOutcomeStatement] = append(grouped[row.CourseName][row.CourseOutcomeStatement], row)
	}

	for courseName, coGroups := range grouped {
		var matchedCourses []*models.Course
		if err := lib.Database.Where("course_name = ?", courseName).Find(&matchedCourses).Error; err != nil || len(matchedCourses) == 0 {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Course not found: " + courseName})
			return
		}

		coeap := models.Coeap{
			PeriodID: uint(intPeriodID),
			Courses:  matchedCourses,
		}
		if err := lib.Database.Create(&coeap).Error; err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create COEAP"})
			return
		}

		for coStatement, groupedRows := range coGroups {
			courseOutcome := models.CourseOutcome{
				Statement: coStatement,
				Level:     groupedRows[0].Level,
				CoeapID:   &coeap.ID,
			}
			if err := lib.Database.Create(&courseOutcome).Error; err != nil {
				ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save Course Outcome"})
				return
			}

			for _, row := range groupedRows {
				tool := models.AssessmentTool{
					Tool:             row.AssessmentTool,
					TargetPopulation: row.TargetPopulation,
					TargetScore:      row.TargetScore,
				}
				if err := lib.Database.Create(&tool).Error; err != nil {
					ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save Assessment Tool"})
					return
				}

				ilo := models.IntendedLearningOutcome{
					Statement:        row.IntendedLearningOutcome,
					CourseOutcomeID:  courseOutcome.ID,
					AssessmentToolID: tool.ID,
				}
				if err := lib.Database.Create(&ilo).Error; err != nil {
					ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save Intended Learning Outcome"})
					return
				}
			}
		}
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Course Outcomes uploaded successfully"})
}
