<template>
  <section class="tabs">
    <label>你的选择： </label>
    <ul class="selected-list">
      <li
        v-for="(item, index) in selected"
        :key="item"
      >
        <span>{{ item }}</span>
        <span
          class="close"
          @click="remove(index)"
        > x </span>
      </li>
    </ul>
    <ul
      v-for="(row, rowIndex) in data"
      :key="rowIndex"
      class="row-list"
    >
      {{ row.title }}：
      <li
        v-for="(item, index) in row.list"
        :key="index"
        :class="{ active: row.index === index}"
        @click="select(row, rowIndex, item, index)"
      >
        {{ item }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'SimpleTabs',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selected: {}
    }
  },
  methods: {
    select (row, rowIndex, item, index) {
      this.$set(this.selected, rowIndex, item)
      this.$set(row, 'index', index)
      this.$emit('select', Object.values(this.selected))
    },
    remove(index) {
      this.$delete(this.selected, index)
      this.$set(this.data[index], 'index', -1)
      this.$emit('select', Object.values(this.selected))
    }
  }
}
</script>

<style lang="scss">
  .tabs {
    label {
      display: inline-block;
      padding-top: 13px;
      padding-bottom: 13px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      padding-left: 0;
      margin-top: 0;
      margin-bottom: 0;
      line-height: 24px;
      li {
        margin-left: 8px;
        margin-right: 8px;
      }
    }
    .selected-list {
      display: inline-flex;
      li {
        padding-left: 8px;
        margin-top: 8px;
        border: 1px solid $--color-primary;

        .close {
          padding-left: 8px;
          padding-right: 8px;
          margin-left: 4px;
          display: inline-flex;
          background-color: $--color-primary;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .row-list {
      margin-top: 12px;
      li {
        cursor: pointer;
        &:hover {
          color: $--link-hover-color;
        }
        &.active {
          color: $--color-primary-light-2;
        }
      }
    }
  }
</style>
