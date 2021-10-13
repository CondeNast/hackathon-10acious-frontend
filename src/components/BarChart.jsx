import React from "react"
import withStyles from "react-jss"
import { ResponsiveBar } from "@nivo/bar"
import { Text } from "@vx/text"
import colors from "../data/colors"

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "70vh",
    width: "100%",
    marginBottom: "2rem",
  },
  title: {
    alignSelf: "flex-start",
  },
}

const BarChart = ({ classes, data, title }) => {
  console.log(data)
  return (
    <>
      <h3 className={classes.title}>{title}</h3>
      <div className={classes.container}>
        <ResponsiveBar
          data={data}
          keys={["percent"]}
          indexBy="id"
          margin={{ top: 50, right: 30, bottom: 200, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          colorBy="indexValue"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 90,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Percentage",
            legendPosition: "middle",
            legendOffset: -40,
          }}
        />
      </div>
    </>
  )
}

export default withStyles(styles)(BarChart)
