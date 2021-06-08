<template>
  <chart
    :options="merged"
    autoresize
    class="pie-chart"
    v-on="$listeners"
  />
</template>
<script>
import Chart from 'vue-echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import merge from 'lodash/merge'

export default {
  name: 'PieChart',
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
    // 样式扩展
    extended: {
      type: Object,
      default: () => {}
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
    options() {
      return {
        color: ['#19d4ae', '#5ab1ef', '#fa6e86',
          '#ffb980', '#0067a6', '#c4b4e4',
          '#d87a80', '#9cbbff', '#d9d0c7',
          '#87a997', '#d49ea2', '#5b4947',
          '#7ba3a8'],
        tooltip: {
          trigger: 'item',
          formatter(params) {
            const name = params.dimensionNames[1]
            const value = params.value[name]
            return params.marker + params.name + ': ' + value + ' (' + params.percent +'%)'
          }
        },
        legend: {
          bottom: '20px',
          icon: 'circle'
        },
        dataset: {
          dimensions: this.mergedDimensions,
          source: this.source
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '50%'],
            encode: {
              itemName: this.mergedDimensions[0],
              value: this.mergedDimensions[1]
            }
          }
        ]
      }
    }
  }
}
</script>
<style>
.pie-chart {
  width: 400px;
  height: 400px;
}
</style>
