import { Image, Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';
import { styles } from "./Stylesheet.tsx"
import logo from "../../assets/unc_logo.png"
import { useUser } from '../auth/useUser.ts';

export const PDF = () => {
  const { currentUser } = useUser()
  const { User } = currentUser?.role_info
  const middleInitial = User?.Middlename !== undefined ? `${User?.Middlename.charAt(0)}.` : ""
  const fullname = `${User?.Firstname} ${middleInitial} ${User.Lastname}`
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
          >
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
                  <Text style={{ fontWeight: "bold" }}>{`BIT212k (Object-Oriented Programming 1)`}</Text>

                </View>
              </View>
              <View style={{ margin: "0 30px" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text>School Year: </Text>
                  <Text style={{ fontWeight: "bold", }}>{`2022-2023`}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text>Semester: </Text>
                  <Text style={{ fontWeight: "bold" }}>{`1st Semester`}</Text>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  )
}
