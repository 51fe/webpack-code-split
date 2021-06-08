<template>
  <pie-chart :source="source" :dimensions="['carrier', 'total']" :extended="options" />
</template>

<script>
import PieChart from './components/PieChart'
export default {
  name: "PieChartDemo",
  components: { PieChart },
  data () {
    return {
      options: {
        legend: {
          bottom: '20px',
          icon: 'circle'
        }
      },
      source:  [
        { carrier: '移动', carrierId: 5, total: 1},
        { carrier: '联通', carrierId: 1, total: 2 },
        { carrier: '电信', carrierId: 21, total: 3 }
      ]
    }
  }
}

</script>

<style>
</style>
