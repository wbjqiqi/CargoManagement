<template>
  <div class="search-main">
    <el-table
      :data="Goods.goods"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-col :span="18">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="商品品牌">
                <span>{{ props.row.brand }}</span>
              </el-form-item>
              <el-form-item label="规格">
                <span>{{ props.row.specific }}</span>
              </el-form-item>
              <el-form-item label="数量">
                <span>{{ props.row.number }}</span>
              </el-form-item>
              <el-form-item label="价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.remark }}</span>
              </el-form-item>
              <el-form-item label="库存数量">
                <span>{{ props.row.rest }}</span>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6">
            <img :src="serverAddress + '/images/' + props.row.fileName" alt="" style="height: 180px">
          </el-col>
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称"
        prop="name">
      </el-table-column>
      <el-table-column prop="brand" sortable
                       label="商品品牌"
                       :filters="currentBrands"
                       :filter-method="filterTag"
                       filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="colorArray[Goods.goodsBrandTypes.findIndex((ele) => ele.value === scope.row.brand)]"
            close-transition>{{scope.row.brand}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="库存数量"
        prop="rest">
      </el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button type="primary" icon="edit" size="small" @click="editCargo(scope.row)">编辑</el-button>
          <el-button type="danger" icon="delete" size="small" @click="deleteCargo(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="newCargo">新建商品</el-button>
    <el-button @click="getAllCargo">获取所有商品</el-button>
    <el-button @click="addBrandType">新建品牌种类</el-button>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import { mapState, mapGetters } from 'vuex'
  import Component from 'vue-class-component'
  import { MY_PHP_SERVICE } from '../api/config'

  @Component({
    computed: {
      ...mapState(['Goods']),
      ...mapGetters(['curretGoods'])
    },
    props: ['colorArray'],
    watch: {
      curretGoods () {
        this['getCurrentBrands']()
      }
    }
  })
  export default class searchMain extends Vue {
    // data
    serverAddress = MY_PHP_SERVICE
    currentBrands = []

    // method
    formatter (row, column) {
      return row.address
    }

    filterTag (value, row) {
      return row.brand === value
    }

    getCurrentBrands () {
      this.currentBrands = this['Goods'].goodsBrandTypes.filter((brand) => {
        for (let good of this['Goods'].goods) {
          if (good.brand === brand.value) {
            return true
          }
        }
        return false
      })
    }

    editCargo (cargo) {
      this.$emit('edit-cargo', cargo)
    }

    deleteCargo (id) {
      this.$emit('delete-cargo', id)
    }

    newCargo () {
      this.$emit('new-cargo')
    }

    getAllCargo () {
      this.$emit('get-all-cargo')
    }

    addBrandType () {
      this.$emit('add-brand-type')
    }

    // created
  }
</script>
<style lang="less" type="text/less">
  .search-main {
    .demo-table-expand {
      font-size: 0;
    }

    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
</style>
