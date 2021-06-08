<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <i class="el-icon-s-home" />主页
      </router-link>
      |
      <router-link to="/products">
        <i class="el-icon-s-goods" />产品
      </router-link>
      |
      <router-link to="/feedback">
        <i class="el-icon-question" />意见反馈
      </router-link>
      |
      <router-link to="/contact">
        <i class="el-icon-phone" />联系我们
      </router-link>
    </div>
    <router-view class="container" />
  </div>
</template>

<style lang="scss">
  @import "styles/variables";
  @import "styles/app";

  #app {
    flex-direction: column;
    overflow: hidden;
    color: $text;

    #nav {
      padding: 16px 24px;
      border-bottom: 1px solid $border;

      a {
        font-size: 16px;
        font-weight: bold;
        color: $primary-dark;

        &.router-link-exact-active {
          color: $primary-light;
        }
      }

    }

    .container {
      @include scrollBar;
      position: absolute;
      top: 64px;
      bottom: 0;
      left: 16px;
      right: 0;
      overflow-y: hidden;
    }
  }

</style>
