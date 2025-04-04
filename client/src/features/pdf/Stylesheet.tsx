import { StyleSheet } from "@react-pdf/renderer"
export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%"
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
    padding: "15px 0",
  }
});
