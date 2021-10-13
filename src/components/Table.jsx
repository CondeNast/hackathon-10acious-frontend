import React from "react"
import withStyles from "react-jss"
import colors from "../data/colors"
import { borderRadius } from "../data/globalStyles"
import { Up, Down } from "../assets/icons"

const styles = {
  container: {
    display: "flex",
    marginTop: "2rem",
    width: "100%",
    marginBottom: "3rem",
  },
  table: {
    display: "flex",
    flexFlow: "column nowrap",
    lineHeight: "1.5",
    flex: "1 1 auto",
    overflow: "auto",
    borderRadius: borderRadius,
  },
  th: {
    display: "flex",
    flexFlow: "row nowrap",
    position: "sticky",
    color: "#A09F9F",
    background: colors.tableHeader,
    overflowWrap: "break-word",
    marginBottom: "1.5rem",
    padding: "0 1rem",
    top: 0,
    zIndex: 10,
    "& > :nth-child(2)": {
      justifyContent: "flex-end",
    },
  },
  td: {
    minHeight: "40px",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    flexFlow: "row nowrap",
    flexGrow: 1,
    flexBasis: 0,
    wordBreak: "break-word",
    hyphens: "auto",
    margin: "0 0.2rem",
    fontSize: "calc(12px + (18 - 12) * ((100vw - 300px) / (1600 - 300)))",
  },
  thtd: {
    composes: "$td",
    color: colors.tableHeaderText,
    fontSize: "calc(10px + (16 - 10) * ((100vw - 300px) / (1600 - 300)))",
    cursor: "pointer",
    fontWeight: 600,
  },
  body: {
    display: "inline-block",
    minWidth: "100%",
    position: "relative",
    height: "70vh",
    "& > :nth-child(odd)": {
      background: colors.tableRowBG,
      borderLeft: `3px solid ${colors.purple}`,
    },
  },
  row: {
    borderLeft: `3px solid ${colors.white}`,
    display: "flex",
    flexFlow: "row nowrap",
    marginBottom: "1rem",
    padding: "0 1rem",
    borderRadius: "5px",
    "& > :nth-child(2)": {
      justifyContent: "flex-end",
    },
  },
  icon: {
    width: "20px",
    margin: "0 0 0 5px",
  },
}

const Table = ({ classes, columns, data }) => {
  return (
    <div className={classes.container}>
      <div className={classes.table}>
        <div className={classes.th}>
          {columns.map((name, i) => (
            <div key={i} className={classes.thtd}>
              {name}
              <img className={classes.icon} src={Down} alt="Sort the column" />
            </div>
          ))}
        </div>
        <div className={classes.body}>
          {data.map((d) => (
            <div className={classes.row} key={d.id}>
              <div className={classes.td}>{d.admantx}</div>
              <div className={classes.td}>{d.percent}</div>
              {/* <div className={classes.td}>{d.brand}</div>
              <div className={classes.td}>{d.month}</div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(Table)
