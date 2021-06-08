<template>
  <china-map
    :source="source"
    :extended="options"
    autoresize
    v-on="$listeners"
  />
</template>

<script>
import ChinaMap from './components/ChinaMap/index'
import source from './components/ChinaMap/source'

export default {
  name: 'ChinaChartDemo',
  components: { ChinaMap },
  data () {
    return {
      source,
      options: {
        series: [
          {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: source,
            symbolSize: val => val[2] / 20,
            tooltip: {
              formatter: function(val) {
                return val.name + ': ' + val.value[2]
              }
            },
            itemStyle: {
              normal: {
                color: '#ddb926'
              }
            }
          }
        ]
      }
    }
  },
}
</script>

<style>
  .china-map {
    width: 640px;
    height: 360px;
  }
</style>
