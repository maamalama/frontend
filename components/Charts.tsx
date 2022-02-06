import { createChart } from 'lightweight-charts'
import type { ChartOptions, DeepPartial, LineStyleOptions, SeriesOptionsCommon, LineData } from 'lightweight-charts'
import { useEffect, useState } from 'react'
import styles from './Chart.module.css'
import { ProgressBar } from './ProgressBar'

const chartOptions: DeepPartial<ChartOptions> = {
  width: 552,
  height: 370,
  layout: {
    background: { color: 'transparent' },
    textColor: 'rgba(45, 43, 37, 1)',
    fontSize: 12,
    fontFamily: "'JetBrains Mono', Menlo, sanf-serif"
  },
  grid: {
    vertLines: {
      visible: false
    },
    horzLines: {
      color: '#F4F4F4'
    }
  },
  handleScale: false,
  handleScroll: false,
  rightPriceScale: {
    visible: false
  },
  leftPriceScale: {
    visible: true,
    borderVisible: false,
    scaleMargins: {
      top: 0.1,
      bottom: 0.1
    }
  },
  timeScale: {
    borderVisible: false
  },
  crosshair: {
    vertLine: {
      width: 2,
      color: 'rgba(45, 43, 37, 1)',
      style: 0,
      labelBackgroundColor: 'rgba(45, 43, 37, 1)'
    },
    horzLine: {
      visible: false,
      labelVisible: true,
      labelBackgroundColor: 'rgba(45, 43, 37, 1)'
    }
  }
}
const lineOptions: DeepPartial<LineStyleOptions & SeriesOptionsCommon> = {
  color: 'rgba(45, 43, 37, 1)',
  lineWidth: 2,
  priceFormat: {
    type: 'price',
    precision: 0,
    minMove: 1
  },
  lastValueVisible: false,
  crosshairMarkerBackgroundColor: 'rgba(45, 43, 37, 1)',
  priceLineVisible: false
}

interface ChartProps {
  isLoading: boolean
  entries: { time: string; amount: number }[]
  error?: unknown
}

const Chart = ({ isLoading, entries, error }: ChartProps) => {
  const [chart, setChart] = useState(null)
  const [lineSeries, setLineSeries] = useState(null)

  const chartVisible = entries && entries.length !== 0 && !isLoading && !error

  useEffect(() => {
    if (!entries) return

    const data: LineData[] = entries.map((e) => ({ time: e.time, value: e.amount }))
    if (!lineSeries) {
      // init data
      const chart = createChart(document.getElementById('chart'), chartOptions)
      const lineSeries = chart.addLineSeries(lineOptions)
      lineSeries.setData(data)
      chart.timeScale().fitContent()
      setChart(chart)
      setLineSeries(lineSeries)
    } else {
      lineSeries.setData(data) // update data
      chart.timeScale().fitContent()
    }
  }, [entries])

  console.log(isLoading)

  return (
    <div className={styles.chart}>
      <div className={styles.header}>{chartVisible && 'Token holders'}</div>
      <div className={styles.body}>
        {isLoading && (
          <div className={styles.loader}>
            <ProgressBar color="black" />
          </div>
        )}
        {!entries && !error && !isLoading && <div>Compose filters to query users</div>}
        {!isLoading && error && <div>Failed to load chart</div>}
        <div style={{ display: chartVisible ? 'block' : 'none' }} id="chart" />
        {!isLoading && !error && entries && entries.length === 0 && <div>No data</div>}
      </div>
    </div>
  )
}

export default Chart
