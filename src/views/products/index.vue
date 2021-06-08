<template>
  <div class="products">
    <simple-tabs
      :data="data"
      @select="selected = $event"
    />
  </div>
</template>

<script>
import SimpleTabs from "./components/SimpleTabs";

export default {
  name: 'Products',
  components: { SimpleTabs },
  data () {
    return {
      data: [{
        title: '品牌',
        list: ['苹果', '华为', '小米', '魅族', 'OPPO', 'vivo', '三星']
      }, {
        title: '尺寸',
        list: ['4.0-4.5英寸', '4.6-4.9英寸', '5.0-5.5英寸', '5.6-6英寸', '6英寸以上']
      }, {
        title: '系统',
        list: ['Android', 'IOS', 'Windows Phone ', '其它',]
      }, {
        title: '网络',
        list: ['联通4G', '电信4G', '移动4G', '全网通', '双卡单4G', '双卡双4G']
      }],
      selected: []
    }
  }
}
</script>
