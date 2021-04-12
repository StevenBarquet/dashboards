/* eslint-disable no-use-before-define */
/* eslint-disable global-require */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { graphTypes } from './graphTypes'
// Comp
import TableG from './TableG'
import IndicatorsG from './IndicatorsG'

let am4core = null
let am4charts = null
let am4themesAnimated = null
if (process.browser) {
  am4core = require('@amcharts/amcharts4/core')
  am4charts = require('@amcharts/amcharts4/charts')
  am4themesAnimated = require('@amcharts/amcharts4/themes/animated')
  am4core.useTheme(am4themesAnimated.default)
}

const Graph = props => {
  const [renderG, setRenderG] = useState('GRAPH')
  const { graphData, id } = props
  const htmlID = `graph_${id}`
  const config = {
    type: graphData.type,
    nameX: validateAxisTitle(graphData.nameX),
    nameY: validateAxisTitle(graphData.nameY),
  }

  useEffect(() => graphSelector(config, graphData), [])

  function graphSelector(gConfig, gData) {
    const { type } = gConfig
    switch (type) {
      case graphTypes.XY_GRAPH:
        graphXY(gConfig, gData)
        break

      case graphTypes.PIE_GRAPH:
        graphPIE(gConfig, gData)
        break

      case graphTypes.LINE_GRAPH:
        graphXY(gConfig, gData, 'line')
        break

      case graphTypes.XY_GRAPH_VERTICAL:
        graphXYvertical(gConfig, gData)
        break

      case graphTypes.SCATTER_GRAPH:
        graphXY(gConfig, gData, 'bullet')
        break

      case graphTypes.INDICATORS:
        setRenderG('INDICATORS')
        break

      case graphTypes.TABLE:
        setRenderG('TABLE')
        break
      default:
        graphXY(gConfig, gData)
        break
    }
  }

  function graphXY(gConfig, gData, variant) {
    // Create chart instance
    const chart = am4core.create(htmlID, am4charts.XYChart)

    // Add data
    chart.data = gData.aggregations

    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.dataFields.category = 'name'
    categoryAxis.renderer.grid.template.strokeWidth = 1
    if (variant && variant === 'vertical') {
      categoryAxis.renderer.inversed = true
      // categoryAxis.renderer.grid.template.location = 0;
      // categoryAxis.renderer.cellStartLocation = 0.1;
      // categoryAxis.renderer.cellEndLocation = 0.9;
    }
    if (gConfig.nameX) {
      categoryAxis.title.text = gConfig.nameY
    }

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    // if (variant && variant === 'vertical') {
    //   valueAxis.renderer.opposite = true
    // }
    if (gConfig.nameY) {
      valueAxis.title.text = gConfig.nameY
    }

    // Create series
    let series
    if (variant && variant === 'line') {
      series = chart.series.push(new am4charts.LineSeries())
      series.dataFields.valueY = 'count'
      series.dataFields.categoryX = 'name'
    } else if (variant && variant === 'bullet') {
      series = chart.series.push(new am4charts.LineSeries())
      series.strokeWidth = 0
      series.dataFields.valueY = 'count'
      series.dataFields.categoryX = 'name'
    } else {
      series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.valueY = 'count'
      series.dataFields.categoryX = 'name'
    }

    // Add simple bullet
    const bullet = series.bullets.push(new am4charts.Bullet())
    const square = bullet.createChild(am4core.Rectangle)
    square.width = 5
    square.height = 5

    // Cursor settings
    series.tooltipText = '{valueY.value}'
    chart.cursor = new am4charts.XYCursor()

    // Scroll graph Feature
    const scrollbarX = new am4charts.XYChartScrollbar()
    scrollbarX.series.push(series)
    chart.scrollbarX = scrollbarX
  }

  function graphXYvertical(gConfig, gData) {
    // Create chart instance
    const chart = am4core.create(htmlID, am4charts.XYChart)

    // Add data
    chart.data = gData.aggregations

    // Create axes
    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis())
    categoryAxis.renderer.grid.template.location = 0
    categoryAxis.dataFields.category = 'name'
    categoryAxis.renderer.minGridDistance = 1
    categoryAxis.renderer.inversed = true
    categoryAxis.renderer.grid.template.disabled = true

    if (gConfig.nameX) {
      categoryAxis.title.text = gConfig.nameY
    }

    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis())
    valueAxis.min = 0
    if (gConfig.nameY) {
      valueAxis.title.text = gConfig.nameY
    }

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries())
    series.dataFields.categoryY = 'name'
    series.dataFields.valueX = 'count'
    series.tooltipText = '{valueX.value}'
    series.columns.template.strokeOpacity = 0
    series.columns.template.column.cornerRadiusBottomRight = 5
    series.columns.template.column.cornerRadiusTopRight = 5

    const labelBullet = series.bullets.push(new am4charts.LabelBullet())
    labelBullet.label.horizontalCenter = 'left'
    labelBullet.label.dx = 10
    labelBullet.label.text =
      "{values.valueX.workingValue.formatNumber('#.0as')}"
    labelBullet.locationX = 1

    // Cursor settings
    series.tooltipText = '{valueY.value}'
    chart.cursor = new am4charts.XYCursor()

    // Scroll graph Feature
    const scrollbarY = new am4charts.XYChartScrollbar()
    scrollbarY.series.push(series)
    chart.scrollbarY = scrollbarY
  }

  function graphPIE(gConfig, gData) {
    // const { scrollGraph } = gConfig
    // Create chart instance
    const chart = am4core.create(htmlID, am4charts.PieChart)

    // Leyend
    chart.legend = new am4charts.Legend()

    // Add data
    chart.data = gData.aggregations

    // Create series
    const series = chart.series.push(new am4charts.PieSeries())
    series.dataFields.value = 'count'
    series.dataFields.category = 'name'
  }

  function validateAxisTitle(str) {
    if (str && str.length > 0 && str.length < 35) {
      return str
    }
    return null
  }

  // ---------------------------------------------- RENDER -----------------------------------------------
  if (renderG === 'INDICATORS') {
    return <IndicatorsG graphData={graphData} />
  }
  if (renderG === 'TABLE') {
    return <TableG graphData={graphData} />
  }
  return <div style={{ width: '100%', height: '360px' }} id={htmlID} />
}

export default Graph
