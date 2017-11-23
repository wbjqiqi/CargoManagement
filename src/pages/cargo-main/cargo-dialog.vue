<template>
  <el-dialog size="small" :title="isEdit?'编辑':'新建'" v-model="openDialog" validator="false" :beforeClose="closeDialog">
    <el-form @keyup.enter.native="submitCargo()" labelPosition="left" :model="goods"
             ref="clientBox" :rules="validator">
      <el-form-item label="商品品牌" prop="brand">
        <el-radio-group v-model="goods.brand" v-for="label in getBrandType" :key="label.text">
          <el-radio :label="label.text"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="goods.name" auto-complete="off" placeholder="商品的名称"></el-input>
      </el-form-item>
      <el-form-item label="规格" prop="specific">
        <el-input v-model="goods.specific" auto-complete="off" placeholder="商品的规格（例：24/箱）"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="number">
        <el-input v-model="goods.number" auto-complete="off" placeholder="商品的数量，只能是数字"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="goods.price" auto-complete="off" placeholder="商品的价格，只能是数字"></el-input>
      </el-form-item>
      <el-form-item label="库存数量" prop="rest">
        <el-input v-model="goods.rest" auto-complete="off" placeholder="库存还剩多少？只能是数字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="12" style="text-align: center">
          <input type="file" @change="selectImage" accept=".jpg,.jpeg">
        </el-col>
        <el-col :span="12" style="text-align: center">
          <img class="cargo-img"
               :src="imgAddress"
               alt="">
        </el-col>
      </el-form-item>
      <el-form-item label="索引关键字" prop="keycode">
        <el-input v-model="goods.keycode" auto-complete="off"
                  placeholder="用商品名字搜索太麻烦？给它一个小名，可以用小名搜索到（例：wjj（挖掘机））"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="goods.remark" auto-complete="off" placeholder="你还有什么要对这商品说？"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary"
                 @click="submitCargo()">确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { mapGetters } from 'vuex'
  import BrandValidator from '../../business/validator/brand-validator'
  import { CommonFunction } from '../../common/common'
  import StorageUpload from '../../common/storage-upload'

  @Component({
    props: ['isEdit', 'goods', 'isOpenDialog'],
    watch: {
      isOpenDialog () {
        this.openDialog = this.isOpenDialog
      },
      fileList (val) {
        console.log('fileList', val)
      }
    },
    computed: mapGetters(['getBrandType'])
  })
  export default class cargoDiad extends Vue {
    //    data
    openDialog = false
    validator = BrandValidator.validateName()
    imgAddress = ''

    //    methods
    submitCargo () {
      let data = {
        model: this.$refs.clientBox['model'],
        isEdit: this['isEdit']
      }
      this.$refs.clientBox['validate']((valide) => {
        if (valide) {
          this.$emit('submitCargo', data)
        }
      })
      let storageUpload = new StorageUpload()
      storageUpload.uploadStorage('cargo_management_cargo_img', this['goods'].id, this.imgAddress)
    }
    selectImage (e) {
      CommonFunction.storageShow(e.target.files).then((res) => {
        this.imgAddress = res.imageData
      })
    }

    closeDialog () {
      this.$emit('closeDialog')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .cargo-img{
    width: 150px;
    height: 150px;
  }
</style>
