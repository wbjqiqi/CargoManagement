<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  import { Component, Vue } from 'vue-property-decorator'
  import { MessageHelper } from './utils/message-helper'
  import { ConfirmHelper } from './utils/confirm-helper'

  @Component
  export default class App extends Vue {
    created () {
      MessageHelper.initialize(this.$message)
      ConfirmHelper.initialize(this.$confirm)
    }
  }
</script>

<style>
</style>
