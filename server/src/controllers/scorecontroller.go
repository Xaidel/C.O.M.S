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
	coaepID := ctx.Param("coaepID")
	sectionID := ctx.Param("sectionID")

	if coaepID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Provide the COAEP ID"})
		return
	}
	var scores []models.ILOScore
	if err := lib.Database.Find(&scores, "coeap_id = ? AND section_id = ?", coaepID, sectionID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Scores not found"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"scores": scores})
}

func (ScoreController) GetByProgram(ctx *gin.Context) {
	coaepID := ctx.Param("coaepID")
	programID := ctx.Param("programID")

	if coaepID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Provide the COAEP ID"})
		return
	}
	if programID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Provide the Program ID"})
		return
	}
	var scores []models.ILOScore
	if err := lib.Database.
		Joins("JOIN intended_learning_outcomes ON intended_learning_outcomes.id = ilo_scores.intended_learning_outcome_id").
		Joins("JOIN students ON students.user_id = ilo_scores.student_id").
		Joins("JOIN coeaps ON coeaps.id = ilo_scores.coeap_id").
		Where("students.program_id = ? AND coeap_id = ?", programID, coaepID).
		Find(&scores).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"scores": scores})
}

func (ScoreController) GetEvaluation(ctx *gin.Context) {
	coaepID := ctx.Param("coaepID")
	sectionID := ctx.Param("sectionID")
	if coaepID == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Provide the COAEP ID"})
		return
	}

	var coaep models.Coeap
	if err := lib.Database.Preload("CourseOutcomes.IntendedLearningOutcomes.Recommendations", "section_id = ?", sectionID).Preload("Courses").
		Preload("CourseOutcomes.IntendedLearningOutcomes.AssessmentTool").Find(&coaep, coaepID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "COAEP not found"})
		return
	}

	var section models.Section
	if err := lib.Database.Preload("Students").First(&section, sectionID).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Section not found"})
		return
	}

	totalStudents := len(section.Students)
	if totalStudents == 0 {
		ctx.JSON(http.StatusNotFound, gin.H{"message": "No Students enrolled in this course"})
		return
	}

	COs := coaep.CourseOutcomes
	type response struct {
		IloID           uint    `json:"ilo_id"`
		TotalPassed     int     `json:"total_passed"`
		TotalFailed     int     `json:"total_failed"`
		TotalPercentage int     `json:"total_percentage"`
		TotalPopulation int     `json:"total_population"`
		Recommendation  *string `json:"recommendation"`
	}

	var res []response

	for _, co := range COs {
		for _, ilo := range co.IntendedLearningOutcomes {
			var scores []models.ILOScore
			if err := lib.Database.Table("ilo_scores").
				Joins("JOIN intended_learning_outcomes ON ilo_scores.intended_learning_outcome_id = intended_learning_outcomes.id").
				Joins("JOIN assessment_tools ON intended_learning_outcomes.assessment_tool_id = assessment_tools.id").
				Joins("JOIN ilo_criteria ON intended_learning_outcomes.id = ilo_criteria.intended_learning_outcome_id").
				Where("(ilo_scores.value / ilo_criteria.criteria) * 100 >= assessment_tools.target_score AND ilo_scores.intended_learning_outcome_id = ? AND ilo_scores.value IS NOT NULL AND ilo_scores.section_id = ? AND ilo_criteria.section_id = ?", ilo.ID, sectionID, sectionID).
				Find(&scores).Error; err != nil {
				ctx.JSON(http.StatusNotFound, gin.H{"error": "Scores not found"})
				return
			}
			var failed []models.ILOScore
			if err := lib.Database.Table("ilo_scores").
				Joins("JOIN intended_learning_outcomes ON ilo_scores.intended_learning_outcome_id = intended_learning_outcomes.id").
				Joins("JOIN assessment_tools ON intended_learning_outcomes.assessment_tool_id = assessment_tools.id").
				Joins("JOIN ilo_criteria ON intended_learning_outcomes.id = ilo_criteria.intended_learning_outcome_id").
				Where("(ilo_scores.value / ilo_criteria.criteria) * 100 < assessment_tools.target_score AND ilo_scores.intended_learning_outcome_id = ? AND ilo_scores.value IS NOT NULL AND ilo_scores.section_id = ? AND ilo_criteria.section_id = ?", ilo.ID, sectionID, sectionID).
				Find(&failed).Error; err != nil {
				ctx.JSON(http.StatusNotFound, gin.H{"error": "Scores not found"})
				return
			}
			totalPercentage := float64(len(scores)) / float64(totalStudents) * 100
			var recommendation *string
			for _, rec := range ilo.Recommendations {
				if rec.Comment != nil {
					recommendation = rec.Comment
				}
			}

			res = append(res, response{
				IloID:           ilo.ID,
				TotalPassed:     len(scores),
				TotalFailed:     len(failed),
				TotalPercentage: int(totalPercentage),
				TotalPopulation: totalStudents,
				Recommendation:  recommendation,
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

	var criteria models.IloCriteria
	if err := lib.Database.Where(models.IloCriteria{SectionID: request.SectionID, IntendedLearningOutcomeID: request.Ilo_id}).First(&criteria).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Criteria not found"})
		return
	}
	var ilo models.IntendedLearningOutcome
	if err := lib.Database.Preload("AssessmentTool").First(&ilo, request.Ilo_id).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "ILO not found"})
		return
	}
	score := models.ILOScore{
		IntendedLearningOutcomeID: request.Ilo_id,
		StudentID:                 request.Student_id,
		CoeapID:                   request.Coaep_id,
		SectionID:                 request.SectionID,
	}

	if request.Value > criteria.Criteria {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Input exceeds the total score"})
		return
	}

	if err := lib.Database.Where(&models.ILOScore{
		StudentID:                 request.Student_id,
		CoeapID:                   request.Coaep_id,
		IntendedLearningOutcomeID: request.Ilo_id,
		SectionID:                 request.SectionID,
	}).FirstOrCreate(&score).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	scorePercentage := (float64(request.Value) / float64(criteria.Criteria)) * 100
	var eval int

	if int(scorePercentage) >= int(ilo.AssessmentTool.TargetScore) {
		eval = 1
	} else {
		eval = 0
	}
	score.Value = request.Value
	score.Status = &eval
	lib.Database.Save(&score)

	ctx.JSON(http.StatusCreated, gin.H{"message": "Success"})
}
