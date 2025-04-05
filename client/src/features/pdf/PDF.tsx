import { Image, Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';
import { styles, tables } from "./Stylesheet.tsx"
import logo from "../../assets/unc_logo.png"
import { useUser } from '../auth/useUser.ts';
import { useCurrentPeriod } from '../auth/useCurrentPeriod.ts';
import { CourseOutcome, Evaluation, Period } from '@/types/Interface.ts';

const formatYear = (current: Period) => {
  return ` 20${current.School_Year.slice(0, 2)}-20${current.School_Year.slice(2)}`;
};

const formatSem = (current: Period) => {
  let formattedSem;
  if (current.Semester === 1) {
    formattedSem = `${current?.Semester}st Semester`;
  } else if (current.Semester === 2) {
    formattedSem = `${current?.Semester}nd Semester`;
  } else {
    formattedSem = `Summer Semester`;
  }
  return formattedSem
}


interface PDFProps {
  cos: CourseOutcome[],
  evaluations: Evaluation[]
}
export const PDF = ({ cos, evaluations }: PDFProps) => {
  const { currentUser } = useUser()
  const { User } = currentUser?.role_info
  const middleInitial = User?.Middlename !== undefined ? `${User?.Middlename.charAt(0)}.` : ""
  const fullname = `${User?.Firstname} ${middleInitial} ${User.Lastname}`
  const selected = sessionStorage.getItem("selectedCourse")
  const parsedSelected = selected ? JSON.parse(selected) : null
  const { Course } = parsedSelected
  const { response } = useCurrentPeriod()
  let currentYear;
  let currentSem
  if (response?.current_period) {
    currentYear = formatYear(response?.current_period)
    currentSem = formatSem(response?.current_period)
  }
  return (
    <div className='w-full h-full'>
      <PDFViewer
        width={"100%"}
        height={"100%"}
      >
        <Document>
          <Page
            orientation='landscape'
            size="A4"
            wrap={false}
          >
            <View style={{ margin: "20px" }}>
              <View style={styles.container}>
                <View style={{ padding: "10px", alignContent: "center", border: "1px" }}>
                  <Image src={logo} style={{ width: 70, height: 70 }} />
                </View>
                <View style={styles.text}>
                  <Text style={{ fontSize: "0.90rem", fontWeight: "bold" }}>University of Nueva Caceres</Text>
                  <Text style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{`COURSE ASSESSMENT & EVALUATION PLAN`}</Text>
                  <Text style={{ fontSize: "0.6rem", fontWeight: "bold" }}>Form</Text>
                  <Text style={{ fontSize: "0.65rem", fontWeight: "bold" }}>OBE-CQI Task Force</Text>
                </View>
                <View style={styles.control}>
                  <Text>Doc. Control No.:</Text>
                  <Text>UNC-FM-VPAA-02</Text>
                </View>
              </View>
              <View style={styles.info}>
                <View style={{ margin: "0 30px" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text>Name of Faculty: </Text>
                    <Text style={{ fontWeight: "bold" }}>{fullname}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text>Course: </Text>
                    <Text style={{ fontWeight: "bold" }}>{`${Course.Course_No} (${Course.Course_Name})`}</Text>
                  </View>
                </View>
                <View style={{ margin: "0 30px" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text>School Year: </Text>
                    <Text style={{ fontWeight: "bold", }}>{currentYear}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text>Semester: </Text>
                    <Text style={{ fontWeight: "bold" }}>{currentSem}</Text>
                  </View>
                </View>
              </View>
              <View style={tables.table}>
                <View style={tables.tableRow}>
                  <View style={[tables.colHeader, { width: "20%" }]}>
                    <Text style={tables.tableCellHeader}>Course Outcome Statements</Text>
                  </View>
                  <View style={[tables.colHeader, { width: "25%" }]}>
                    <Text style={tables.tableCellHeader}>Intended Learning Outcomes Statements</Text>
                  </View>
                  <View style={[tables.colHeader, { width: "10%" }]}>
                    <Text style={tables.tableCellHeader}>Assessment Tool</Text>
                  </View>
                  <View style={[tables.colHeader, { width: "15%" }]}>
                    <Text style={tables.tableCellHeader}>Performance Target</Text>
                  </View>
                  <View style={[tables.colHeader, { width: "5%" }]}>
                    <Text style={tables.tableCellHeader}>#</Text>
                  </View>
                  <View style={[tables.colHeader, { width: "5%" }]}>
                    <Text style={tables.tableCellHeader}>%</Text>
                  </View>
                  <View style={[tables.colHeader, { width: "10%" }]}>
                    <Text style={tables.tableCellHeader}>Evaluation</Text>
                  </View>
                  <View style={[tables.colHeader, { width: "15%" }]}>
                    <Text style={tables.tableCellHeader}>Recommendation</Text>
                  </View>
                </View>
                {cos.map((co) => (
                  <View style={tables.tableRow}>
                    <View key={co.ID} style={[tables.coCol, { height: `${co.IntendedLearningOutcomes.length * 35}%`, borderRight: 0 }]}>
                      <Text style={tables.coCell}>{co.Statement}</Text>
                    </View>
                    <View style={{ width: "100%", borderColor: "#000" }}>
                      {co.IntendedLearningOutcomes.map((ilo) => {
                        const data = evaluations?.find(data => data.ilo_id === ilo.ID)
                        return (
                          <View key={ilo.ID} style={{ display: "flex", flexDirection: "row" }}>
                            <View style={{
                              width: "29.37%",
                              borderBottomWidth:
                                ilo === co.IntendedLearningOutcomes[co.IntendedLearningOutcomes.length - 1] ? 0 : 1,
                              borderColor: "#000",
                              borderLeft: 1
                            }}>
                              <Text style={tables.coCell}>{ilo.Statement}</Text>
                            </View>
                            <View style={{
                              width: "11.73%",
                              borderBottomWidth:
                                ilo === co.IntendedLearningOutcomes[co.IntendedLearningOutcomes.length - 1] ? 0 : 1,
                              borderColor: "#000",
                              borderLeft: 1
                            }}>
                              <Text style={tables.coCell}>{ilo.AssessmentTool.Tool}</Text>
                            </View>
                            <View style={{
                              width: "17.63%",
                              borderBottomWidth:
                                ilo === co.IntendedLearningOutcomes[co.IntendedLearningOutcomes.length - 1] ? 0 : 1,
                              borderColor: "#000",
                              borderLeft: 1
                            }}>
                              <Text style={tables.coCell}>{`
                      At least ${ilo.AssessmentTool.TargetPopulation}% of enrolled students with a rating of at least ${ilo.AssessmentTool.TargetScore}% of the total score
                        `}</Text>
                            </View>
                            <View style={{
                              width: "5.89%",
                              borderBottomWidth:
                                ilo === co.IntendedLearningOutcomes[co.IntendedLearningOutcomes.length - 1] ? 0 : 1,
                              borderColor: "#000",
                              borderLeft: 1
                            }}>
                              <Text style={tables.coCell}>{`${data?.total_passed}/${data?.total_population}`}</Text>
                            </View>
                            <View style={{
                              width: "5.89%",
                              borderBottomWidth:
                                ilo === co.IntendedLearningOutcomes[co.IntendedLearningOutcomes.length - 1] ? 0 : 1,
                              borderColor: "#000",
                              borderLeft: 1
                            }}>
                              <Text style={tables.coCell}>{`${data?.total_percentage}%`}</Text>
                            </View>
                            <View style={{
                              width: "11.72%",
                              borderBottomWidth:
                                ilo === co.IntendedLearningOutcomes[co.IntendedLearningOutcomes.length - 1] ? 0 : 1,
                              borderColor: "#000",
                              borderLeft: 1
                            }}>
                              <Text style={tables.coCell}>
                                {
                                  data?.total_percentage === 0 && data?.total_failed === 0
                                    ? <Text style={tables.coCell}>No Data</Text>
                                    : (data?.total_percentage !== undefined && data?.total_percentage >= ilo.AssessmentTool.TargetPopulation)
                                      ? (<Text style={tables.coCell}>S</Text>) : (<Text style={tables.coCell}>NS</Text>)
                                }
                              </Text>
                            </View>
                            <View style={{
                              width: "17.74%",
                              borderBottomWidth:
                                ilo === co.IntendedLearningOutcomes[co.IntendedLearningOutcomes.length - 1] ? 0 : 1,
                              borderColor: "#000",
                              borderRight: 1,
                              borderLeft: 1
                            }}>
                              <Text style={tables.coCell}>{data?.recommendation}</Text>
                            </View>
                          </View>
                        )
                      })}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div >
  )
}
