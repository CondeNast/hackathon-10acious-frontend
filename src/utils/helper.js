import { S3_BRANDS, CHART_COLOR_MAPPING } from "../data/filters"

const slug = (str) => {
  str = str.replace(/^\s+|\s+$/g, "") // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;"
  const to = "aaaaaeeeeeiiiiooooouuuunc------"
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes

  return str
}

export const stringCompare = (str1, str2) => {
  return slug(str1) === slug(str2)
}

const removePrefix = (label) => {
  const parts = label.split("::")
  // console.log(parts)
  const requiredParts = parts.filter((d) => d !== "TOPICS")
  // console.log(requiredParts.join("::"))
  return requiredParts.join("::")
}
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
export const formatPercent = (num) => `${(num * 100).toFixed(2)}%`
export const getPercent = (num) => (num * 100).toFixed(2)

export const formatData = (rawData, section, dataType) => {
  if (section === 1) {
    if (dataType === "conde") {
      return rawData.map((d, i) => ({
        id: i,
        admantx: removePrefix(d.admantx),
        percent: formatPercent(d.percentageOfArticles),
        percentNumber: getPercent(d.percentageOfArticles),
        brand: capitalize(d.brand),
        month: d.month,
      }))
    } else if (dataType === "twitter") {
      return rawData.map((d, i) => ({
        id: i,
        admantx: removePrefix(d.admantx),
        percent: formatPercent(d.percentageOfTweets),
        percentNumber: getPercent(d.percentageOfTweets),
        month: d.month,
      }))
    }
  } else if (section === 2) {
    if (dataType === "conde") {
      return rawData.map((d, i) => ({
        id: i,
        admantx: removePrefix(d.admantx),
        percent: formatPercent(d.percentageOfPageviews),
        brand: capitalize(d.brand),
        month: d.month,
      }))
    } else if (dataType === "twitter") {
      return rawData.map((d, i) => ({
        id: i,
        admantx: removePrefix(d.admantx),
        percent: formatPercent(d.percentageOfTweets),
        brand: capitalize(d.brand),
        month: d.month,
        monthId: d.monthId,
      }))
    } else {
      return rawData.map((d, i) => ({
        id: i,
        admantx: removePrefix(d.admantx),
        percent: formatPercent(d.percentage_of_pageviews),
        percentNumber: getPercent(d.percentage_of_pageviews),
        brand: capitalize(d.brand),
        month: d.month,
        monthId: d.monthId,
      }))
    }
  }
}

export const formatChartData = (data) => {
  // const uniqueBrands = [...new Set(data.map((d) => d.brand))]
  // const uniqueMonths = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "Jun",
  //   "Jul",
  //   "Aug",
  //   "Sept",
  // ]
  // [...new Set(data.map((d) => d.month))]

  const finalData = S3_BRANDS.map((brand, i) => ({
    key: i,
    id: brand,
    color: CHART_COLOR_MAPPING[brand],
    data: data
      .filter((row) => row.brand === brand)
      .sort((a, b) => a.monthId - b.monthId)
      .map((d) => ({
        x: d.month,
        y: d.percentNumber,
        properties: d,
      })),
  }))
  return finalData
}

export const formatBarChartData = (data) => {
  return data.map((d) => ({
    id: d.admantx,
    percent: d.percentNumber,
    properties: d,
  }))
}

export const formatBarChartTwitterData = (data) => {
  return data.map((d) => ({
    id: d.admantx,
    percent: d.percentNumber,
    properties: d,
  }))
}

const calculateDate = (pythonTimeString) => {
  const dateString = pythonTimeString.split("T")[0]
  const yyyymmdd = dateString.split("-").map((d) => Number(d))
  return new Date(yyyymmdd[0], yyyymmdd[1] - 1, yyyymmdd[2])
}

export const formatForecastData = (data) => {
  return data.map((d, i) => ({
    id: i,
    date: calculateDate(d.time),
    admantx: removePrefix(d.admantx),
    value: getPercent(d.value),
  }))
}
