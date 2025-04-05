import { View, StyleSheet, Text } from "@react-pdf/renderer"
import { Children, cloneElement, createContext, ReactElement, ReactNode, useContext, useEffect, useState } from "react"

const styles = StyleSheet.create({
  table: { display: 'flex', width: "auto", border: "1px", marginLeft: "15px", marginRight: "15px" },
  row: { flexDirection: "row" },
  cell: { padding: 4, borderWidth: 1, flex: 1 },
  header: { backgroundColor: "#f0f0f0", fontWeight: "bold" }
})

const TableContext = createContext<{
  header: boolean;
  setHeader: (header: boolean) => void
}>({
  header: true,
  setHeader: () => { }
})

export const Table = ({ children }: { children: ReactNode }) => {
  const [header, setHeader] = useState(true)

  return (
    <TableContext.Provider value={{ header, setHeader }}>
      <View style={styles.table}>{children}</View>
    </TableContext.Provider>
  )
}

Table.Header = ({ children }: { children: ReactNode }) => {
  const { setHeader } = useContext(TableContext)
  useEffect(() => {
    setHeader(true)
  }, [setHeader])

  return (
    <View style={styles.row}>
      {Children.map(children, (child) =>
        cloneElement(child as ReactElement, { style: styles.header })
      )}
    </View>
  )
}

Table.Row = ({ children }: { children: ReactNode }) => {
  return <View style={styles.row}>{children}</View>
}

Table.Cell = ({ children }: { children: ReactNode }) => {
  return <Text style={styles.cell}>{children}</Text>
}
