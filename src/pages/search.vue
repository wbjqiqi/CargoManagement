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
  import Component from 'vue-class-component'

  @Component({
    mounted () {
      this.restaurants = this.loadAll()
    }
  })
  export default class search extends Vue {
    // data
    searchContent = ''
    searchType = ''
    restaurants = []
    state4 = ''
    timeout = null

    // methods
    loadAll () {
      return [
        {'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号'},
        {'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号'},
        {'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113'},
        {'value': '泷千家(天山西路店)', 'address': '天山西路438号'},
        {'value': '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101'},
        {'value': '贡茶', 'address': '上海市长宁区金钟路633号'},
        {'value': '豪大大香鸡排超级奶爸', 'address': '上海市嘉定区曹安公路曹安路1685号'},
        {'value': '茶芝兰（奶茶，手抓饼）', 'address': '上海市普陀区同普路1435号'},
        {'value': '十二泷町', 'address': '上海市北翟路1444弄81号B幢-107'},
        {'value': '星移浓缩咖啡', 'address': '上海市嘉定区新郁路817号'},
        {'value': '阿姨奶茶/豪大大', 'address': '嘉定区曹安路1611号'},
        {'value': '新麦甜四季甜品炸鸡', 'address': '嘉定区曹安公路2383弄55号'},
        {'value': 'Monica摩托主题咖啡店', 'address': '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F'},
        {'value': '浮生若茶（凌空soho店）', 'address': '上海长宁区金钟路968号9号楼地下一层'}
      ]
    }

    querySearchAsync (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
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
