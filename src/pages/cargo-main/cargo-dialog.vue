<template>
  <el-dialog size="small" :title="isEdit?'编辑':'新建'" v-model="openDialog" validator="false" :beforeClose="closeDialog">
    <el-form @keyup.enter.native="submitCargo()" labelPosition="left" :model="goods"
             ref="clientBox" v-if="goods">
      <el-form-item label="商品品牌" prop="brand">
        <el-radio-group v-model="goods.brand" v-for="label in getBrandType" :key="label.text">
          <el-radio :label=label.text ></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="goods.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="规格" prop="specific">
        <el-input v-model="goods.specific" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="number">
        <el-input v-model="goods.number" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="goods.price" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="goods.remark" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="库存数量" prop="rest">
        <el-input v-model="goods.rest" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="索引关键字(推荐商品名称的拼音首字母)" prop="keycode">
        <el-input v-model="goods.keycode" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary"
                 @click=submitCargo()>确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang='ts'>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { mapGetters } from 'vuex'

  @Component({
    props: ['isEdit', 'goods', 'isOpenDialog'],
    watch: {
      isOpenDialog () {
        this.openDialog = this.isOpenDialog
      }
    },
    computed: mapGetters(['getBrandType'])
  })
  export default class cargoDiad extends Vue {
    //    data
    openDialog = false
    //    methods
    submitCargo () {
      let data = {
        model: this.$refs.clientBox['model'],
        isEdit: this['isEdit']
      }
      this.$emit('submitCargo', data)
    }

    closeDialog () {
      this.$emit('closeDialog')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
