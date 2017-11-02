<template>
  <div class="search">
    <div style="width: 100%; position: fixed; top: 0; z-index: 3;background-color: #fff;">
      <el-col :span="12" :offset="6" >
        <p>请输入搜索内容：</p>
        <el-row>
          <el-col :span="24" id="input">
            <el-autocomplete
              v-model="state4"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
            >
              <el-select v-model="searchType" slot="prepend" placeholder="搜索">
                <el-option label="搜索" value="1"></el-option>
                <el-option label="高级搜索" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="search"></el-button>
            </el-autocomplete>
          </el-col>
        </el-row>
      </el-col>
    </div>
    <div class="search-router">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import Component from 'vue-class-component'

  @Component({
    computed: mapState(['Goods'])
  })
  export default class search extends Vue {
    // data
    searchContent = ''
    searchType = ''
    state4 = ''
    timeout = null

    // methods

    querySearchAsync (queryString, cb) {
      this.$store.dispatch('searchByName', queryString)

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(this['Goods'].goodsNameList)
      }, 200)
    }

    createStateFilter (queryString) {
      return (state) => {
        return (state.value.indexOf(queryString.toLowerCase()) === 0)
      }
    }

    handleSelect (item) {
      console.log(item)
    }
  }
</script>
<style lang="less">
  .search.active {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 30%;
    height: 300px;
    margin: auto;
  }

  .search-router{
    margin-top: 100px;
  }

  .el-select .el-input {
    width: 110px;
  }

  .el-autocomplete {
    display: block;
  }
</style>
