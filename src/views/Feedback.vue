<template>
  <section class="feedback">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="活动名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select
          v-model="form.region"
          placeholder="请选择活动区域"
          style="width: 100%;"
        >
          <el-option
            label="区域一"
            value="shanghai"
          />
          <el-option
            label="区域二"
            value="beijing"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker
          v-model="form.date1"
          type="datetime"
          placeholder="选择日期时间"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox
            label="美食/餐厅线上活动"
            name="type"
          />
          <el-checkbox
            label="地推活动"
            name="type"
          />
          <el-checkbox
            label="线下主题活动"
            name="type"
          />
          <el-checkbox
            label="单纯品牌曝光"
            name="type"
          />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助" />
          <el-radio label="线下场地免费" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input
          v-model="form.desc"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="onSubmit"
        >
          立即创建
        </el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>

export default {
  name: 'Feedback',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!');
    }
  }
}
</script>

<style lang="scss">
  .feedback {
    .el-form {
      width: 600px;
    }
  }
</style>
