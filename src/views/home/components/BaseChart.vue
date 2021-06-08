<template>
  <chart
    :options="merged"
    autoresize
    class="base-chart"
    v-on="$listeners"
  />
</template>
<script>
import Chart from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import merge from 'lodash/merge'

export default {
  name: 'BaseChart',
  components: { Chart },
  props: {
    // 数据源
    source: {
      type: Array,
      default: () => [],
      required: true
    },
    // 所有维度信息
    dimensions: {
      type: Array,
      default: () => []
    },
    // 系列名称
    seriesNames: {
      type: Array,
      default: () => []
    },
    // 样式扩展
    extended: {
      type: Object,
      default: () => {
      }
    },
    // 横坐标旋转度
    xAxisLabelRotate: {
      type: Number,
      default: -60
    },
    // 横坐标截断长度
    xAxisLabelLimit: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // 返回深度合并的选项
    merged() {
      return merge(this.options, this.extended)
    },
    mergedDimensions() {
      if (this.dimensions.length > 0 ) {
        return this.dimensions
      } else if (this.source.length > 0) {
        return Object.keys(this.source[0])
      }
      return ''
    },
    // yAxis维度信息
    yDimensions() {
      const dimensions = this.mergedDimensions
      if (dimensions.length > 0) {
        return dimensions.slice(1)
      }
      return []
    },
    series() {
      const animationDuration = 600
      return this.yDimensions.map((item, index) => {
        return {
          name: this.seriesNames[index] || item,
          type: this.maxNumber === 0 ? 'line' : 'bar',
          symbol: 'circle',
          symbolSize: 6,
          animationDuration
        }
      })
    },
    maxNumber() {
      const source = this.source
      if (source.length < 1) {
        return 0
      }
      const arr = []
      this.yDimensions.forEach((key) => {
        const itemMax = source.reduce((a, b) => {
          return b[key] > a[key] ? b : a
        })
        arr.push(itemMax[key])
      })
      return Math.max(...arr)
    },
    options() {
      const axisLabelColor = '#53586B'
      const xAxisLabelLimit = this.xAxisLabelLimit
      return {
        color: ['#2962ff', '#f6bd16', '#5ad8a6'],
        legend: {
          bottom: 0,
          icon: 'circle',
          textStyle: {
            fontSize: 12,
            lineHeight: 12
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '10px',
          right: '2%',
          bottom: '10%',
          containLabel: true
        },
        dataset: {
          dimensions: this.mergedDimensions,
          source: this.source
        },
        // Declare X axis, which is a category axis, mapping
        // to the first column by default.
        xAxis: {
          type: 'category',
          axisTick: { // 刻度线
            show: this.maxNumber === 0,
            alignWithLabel: true
          },
          axisLine: { // 坐标轴
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: { // 刻度下方文字
            color: axisLabelColor,
            margin: 16,
            fontSize: 12,
            formatter(value) {
              if (!xAxisLabelLimit) {
                return value
              }
              if (!value) {
                return ''
              }
              const length = String(value).trim().length
              return length > xAxisLabelLimit ? `${value.slice(0, xAxisLabelLimit)}...` : value
            },
            rotate: this.xAxisLabelRotate
          }
        },
        // Declare Y axis, which is a value axis.
        yAxis: {
          type: 'value',
          min: this.maxNumber === 0 ? 4 : undefined, // 为空设置最小值
          splitNumber: (this.maxNumber === 0 || this.maxNumber > 4) ? 4 : this.maxNumber,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: axisLabelColor,
            fontSize: 12
          },
          splitArea: {
            show: false
          }
        },
        series: this.series
      }
    }
  }
}
</script>
<style>
.base-chart {
  width: 100%;
}
</style>

