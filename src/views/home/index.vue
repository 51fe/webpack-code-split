<template>
  <div class="home">
    <div class="row">
      <base-chart-demo />
      <pie-chart-demo />
    </div>
    <div class="row">
      <china-chart-demo />
    </div>
  </div>
</template>

<script>

import BaseChartDemo from '@/views/home/BaseChartDemo'
import PieChartDemo from '@/views/home/PieChartDemo'
import ChinaChartDemo from '@/views/home/ChinaMapDemo'

export default {
  name: 'Home',
  components: { ChinaChartDemo, PieChartDemo, BaseChartDemo },
}
</script>

<style lang="scss">
  .home {
    .row {
      display: flex;
      .base-chart {
        flex: 1;
      }
      .pie-chart {
        width: 480px;
      }
    }
  }
</style>
