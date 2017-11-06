<template>
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
          <img src="../assets/images/th.jpg" alt="" style="height: 180px">
        </el-col>
      </template>
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="商品品牌"
      prop="brand">
    </el-table-column>
    <el-table-column
      label="库存数量"
      prop="rest">
    </el-table-column>
    <el-table-column label="编辑">
      <template slot-scope="scope">
        <el-button type="primary" icon="edit" size="small" @click="editCargo(scope.row.id)">编辑</el-button>
        <el-button type="danger" icon="delete" size="small" @click="deleteCargo(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import Component from 'vue-class-component'

  @Component({
    computed: mapState(['Goods'])
  })
  export default class searchMain extends Vue {
    // data

    // method
    formatter (row, column) {
      return row.address
    }
    filterTag (value, row) {
      return row.tag === value
    }
    editCargo (id) {
      this.$emit('edit-cargo', id)
    }

    // created
  }
</script>
<style>
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
</style>
