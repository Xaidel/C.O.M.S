import { StyleSheet } from "@react-pdf/renderer"
export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    padding: "20px",
  },
  text: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    borderTop: "1px",
    borderRight: "1px",
    borderBottom: "1px",
    flex: 3,
  },
  control: {
    flexDirection: "column",
    fontSize: "0.55rem",
    padding: "10px 15px",
    alignContent: "center",
    justifyContent: "center",
    borderTop: "1px",
    borderRight: "1px",
    borderBottom: "1px",
  },
  info: {
    lineHeight: "15px",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: "0.6rem",
    paddingLeft: "25px",
    paddingRight: "25px",
    marginBottom: "5px",
  }
});

export const tables = StyleSheet.create({
  table: {
    marginLeft: 20,
    marginRight: 20,
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  colHeader: {
    textAlign: "center",
    fontWeight: "bold",
    borderStyle: "solid",
    borderRightWidth: 1,
    borderColor: "#000",
    padding: 5,
    backgroundColor: "#E6E9EF",
  },
  tableCellHeader: {
    fontWeight: "bold",
    fontSize: 8,
  },
})

