<template>
  <base-chart
    :source="source"
    :series-names="seriesNames"
    :extended="options"
    :x-axis-label-limit="5"
  />
</template>

<script>
import BaseChart from './components/BaseChart'

export default {
  name: 'BaseChartDemo',
  components: { BaseChart },
  data () {
    return {
      source: generateSource(),
      seriesNames: ['访问量', '访客数', '访问IP数'],
      options: {
        xAxis: {
          axisLabel: { // 刻度下方文字
            rotate: 0
          }
        },
        series: [{ name: '访问量（PV）' }, { name: '访客数（UV）' }, { name: '访问IP数' }]
      }
    }
  }
}

function generateSource () {
  function randomize () {
    return Math.round(300 + Math.random() * 700) / 10
  }

  return ['1.2', '1.3', '1.4', '1.5'].map(item => {
    return {
      'day': item,
      'pv': randomize(),
      'uv': randomize(),
      'ip': randomize()
    }
  })
}
</script>

<style>
</style>
