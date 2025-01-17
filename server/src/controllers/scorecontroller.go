package controllers

import (
	"net/http"

	"github.com/Xaidel/server/lib"
	"github.com/Xaidel/server/src/models"
	"github.com/Xaidel/server/src/types"
	"github.com/gin-gonic/gin"
)

type ScoreController struct{}

func (ScoreController) GET(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Provide the COAEP ID"})
		return
	}
	var scores []models.ILOScore
	if err := lib.Database.Find(&scores, "coeap_id = ?", id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Scores not found"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"scores": scores})
}

func (ScoreController) GetEvaluation(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Provide the COAEP ID"})
		return
	}

	var coaep models.Coeap
	if err := lib.Database.Preload("CourseOutcomes.IntendedLearningOutcomes.AssessmentTool").Find(&coaep, id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "COAEP not found"})
		return
	}

	var course models.Course
	if err := lib.Database.Preload("Students").First(&course, coaep.CourseID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Course not found"})
		return
	}

	totalStudents := len(course.Students)
	if totalStudents == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"message": "No Students enrolled in this course"})
		return
	}

	COs := coaep.CourseOutcomes
	type response struct {
		IloID           uint `json:"ilo_id"`
		TotalPassed     int  `json:"total_passed"`
		TotalPercentage int  `json:"total_percentage"`
		TotalPopulation int  `json:"total_population"`
	}

	var res []response

	for _, co := range COs {
		for _, ilo := range co.IntendedLearningOutcomes {
			var scores []models.ILOScore
			if err := lib.Database.Table("ilo_scores").
				Joins("JOIN intended_learning_outcomes ON ilo_scores.intended_learning_outcome_id = intended_learning_outcomes.id").
				Joins("JOIN assessment_tools ON intended_learning_outcomes.assessment_tool_id = assessment_tools.id").
				Where("(ilo_scores.value / assessment_tools.total_score) * 100 >= assessment_tools.target_score AND ilo_scores.intended_learning_outcome_id = ? AND ilo_scores.value IS NOT NULL", ilo.ID).
				Find(&scores).Error; err != nil {
				ctx.JSON(http.StatusNotFound, gin.H{"error": "Scores not found"})
				return
			}
			totalPercentage := float64(len(scores)) / float64(totalStudents) * 100

			res = append(res, response{
				IloID: ilo.ID, TotalPassed: len(scores),
				TotalPercentage: int(totalPercentage),
				TotalPopulation: totalStudents,
			})
		}
	}

	ctx.JSON(http.StatusOK, gin.H{"res": res})
}

func (ScoreController) POST(ctx *gin.Context) {
	request := types.PostScoreRequest
	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	score := models.ILOScore{
		IntendedLearningOutcomeID: request.Ilo_id,
		StudentID:                 request.Student_id,
		CoeapID:                   request.Coaep_id,
	}

	if err := lib.Database.Where(&models.ILOScore{
		StudentID:                 request.Student_id,
		CoeapID:                   request.Coaep_id,
		IntendedLearningOutcomeID: request.Ilo_id,
	}).FirstOrCreate(&score).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	score.Value = request.Value
	lib.Database.Save(&score)
	ctx.JSON(http.StatusCreated, gin.H{"message": "Success"})
}
