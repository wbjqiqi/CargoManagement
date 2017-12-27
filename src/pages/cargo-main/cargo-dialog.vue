<template>
  <el-dialog size="small" :title="isEdit?'编辑':'新建'" v-model="openDialog" :beforeClose="closeDialog">
    <el-form @keyup.enter.native="validateData" labelPosition="left" :model="goods"
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
        <el-input v-model.number="goods.number" auto-complete="off" placeholder="商品的数量，只能是数字"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="goods.price" auto-complete="off" placeholder="商品的价格，只能是数字"></el-input>
      </el-form-item>
      <el-form-item label="库存数量" prop="rest">
        <el-input v-model.number="goods.rest" auto-complete="off" placeholder="库存还剩多少？只能是数字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-upload
            class="upload-demo"
            :action="''"
            :drag="true"
            :on-remove="handleRemove"
            limit="1"
            ref="upload"
            list-type="picture-card"
            :auto-upload="false"
            :file-list="fileList"
            :show-file-list="false"
            :on-change="changImage"
            style="line-height: 150px">
            <el-button type="info">点击或拖拽选择</el-button>
          </el-upload>
        </el-col>
        <el-col :span="6" style="text-align: center">
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
                 @click="validateData">确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
  import { Component, Emit, Provide, Prop, Vue, Watch } from 'vue-property-decorator'
  import { Getter } from 'vuex-class'

  const validName = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入商品名称'))
    }
  }

  @Component
  export default class cargoDiad extends Vue {
    @Prop()
    isEdit: boolean
    @Prop()
    goods
    @Prop()
    isOpenDialog: boolean
    //    data
    @Provide()
    openDialog = false
    @Provide()
    validator = {
      name: [
        {validator: validName, trigger: 'blur'}
      ],
      number: [
        {required: true, message: '请输入数量'},
        {type: 'number', message: '数量必须是数字'}
      ],
      price: [
        {required: true, message: '请输入价格'},
        {type: 'number', message: '价格必须是数字'}
      ],
      rest: [
        {required: true, message: '请输入库存数量'},
        {type: 'number', message: '库存数量必须是数字'}
      ]
    }
    @Provide()
    fileList = []
    @Provide()
    imgAddress = ''

    @Getter('getBrandType') getBrandType

    //    methods
    validateData () {
      console.log(this.$refs.upload)
      let data = {
        model: this.$refs.clientBox['model'],
        isEdit: this.isEdit,
        upload: this.$refs.upload
      }
      //      this.$refs.clientBox['validate']((valide) => {
      //        console.log(valide)
      //        if (valide) {
      this.submitCargo(data)
      //        }
      //      })
    }

    handleRemove (file, fileList) {
      console.log(file, fileList)
    }

    closeDialog () {
      this.$emit('closeDialog')
    }

    changImage (file, fileList) {
      this.imgAddress = file.url
    }

    @Emit()
    submitCargo (data) {
    }

    @Watch('isOpenDialog')
    shiftDialog () {
      this.openDialog = this.isOpenDialog
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .cargo-img {
    width: 150px;
    height: 150px;
  }
</style>
