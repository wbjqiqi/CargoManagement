<template>
  <div class="search">
    <div style="width: 100%; position: fixed; top: 0; z-index: 3;background-color: #fff;">
      <el-col :span="12" :offset="6">
        <p>请输入搜索内容：</p>
        <el-row>
          <el-col :span="24" id="input">
            <el-autocomplete
              class="search-box"
              v-model="state4"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect">
              <el-select v-model="searchType" slot="prepend" placeholder="搜索">
                <el-option label="搜索" value="base"></el-option>
                <el-option label="高级搜索" value="keycode"></el-option>
              </el-select>
              <el-button slot="append" icon="search"></el-button>
            </el-autocomplete>
          </el-col>
        </el-row>
      </el-col>
    </div>
    <div class="search-router">
      <router-view :colorArray="colorArray" @edit-cargo="editCargo" @delete-cargo="deleteCargo" @new-cargo="newCargo"
                   @get-all-cargo="getAllCargo" @add-brand-type="addBrandType"></router-view>
    </div>
    <CargoDialod :isOpenDialog="isOpenDialog" :isEdit="isEdit" :goods="goods" @closeDialog="closeThisDialog"
                 @submit-cargo="submitCargo"></CargoDialod>
    <new-type-dialog :newTypeBox="newTypeBox" :colorArray="colorArray" @closeTypeDialog="newTypeBox=false"
                     v-if="newTypeBox"></new-type-dialog>
  </div>
</template>
<script lang="ts">
  import { Component, Provide, Vue } from 'vue-property-decorator'
  import { Action, Getter, State } from 'vuex-class'

  import CargoDialod from './cargo-main/cargo-dialog.vue'
  import NewTypeDialog from './cargo-main/new-type-dialog.vue'
  import { MessageHelper } from '../utils/message-helper'
  import { ConfirmHelper } from '../utils/confirm-helper'
  import { MY_PHP_SERVICE } from '../api/config'
  import { CommonFunction } from '../common/common'

  @Component({
    components: {
      CargoDialod,
      NewTypeDialog
    }
  })
  export default class search extends Vue {
    // data
    @Provide()
    searchContent = ''
    @Provide()
    searchType = ''
    @Provide()
    state4 = ''
    @Provide()
    timeout = null
    @Provide()
    goods = CommonFunction.resetCargoMain()
    @Provide()
    isEdit = false
    @Provide()
    newTypeBox = false
    @Provide()
    colorArray = ['primary', 'success', 'warning', 'danger', 'Dark Blue', 'Light Blue', 'Gray', 'Light Black', 'Extra Light Silver']
    @Provide()
    serverAddress = MY_PHP_SERVICE

    // vuex
    @Action('searchByName') searchByName
    @Action('searchByKeycode') searchByKeycode
    @Action('searchById') searchByIdAction
    @Action('searchByAllName') searchByAllNameAction
    @Action('openDialog') openDialog
    @Action('closeDialog') closeDialog
    @Action('updateCargo') updateCargo
    @Action('newCargo') newCargoAction
    @Action('deleteCargo') deleteCargoAction
    @Action('getAllGoods') getAllGoods
    @Action('getAllGoodsType') getAllGoodsType
    @State('Goods') Goods
    @Getter('isOpenDialog') isOpenDialog

    // methods
    querySearchAsync (queryString, cb) {
      // 效率模式 关闭
      // 性能模式 打开
      // if (!queryString) return
      this.searchByName(queryString).then((res) => {
        if (!res.length) {
          this.searchByKeycode(queryString)
        }
      })

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

    searchById (id) {
      this.searchByIdAction(id)
    }

    searchByAllName (name) {
      this.searchByAllNameAction(name)
    }

    handleSelect (item) {
      this.searchByAllNameAction(item.value)
      this.$router.push({name: 'searchMain', params: {cargoId: item.id}})
    }

    resetGoods () {
      this.goods = CommonFunction.resetCargoMain()
    }

    newCargo () {
      this.resetGoods()
      this.isEdit = false
      this.openDialog()
    }

    editCargo (cargo) {
      this.goods = cargo
      this.isEdit = true
      this.openDialog()
    }

    closeThisDialog () {
      this.closeDialog()
    }

    submitCargo (info) {
      let data = info.model
      if (info.fileName && (info.fileName !== '')) {
        data.fileName = info.fileName
      }
      if (info.isEdit) {
        this.updateCargo(data).then((res) => {
          this.closeThisDialog()
          MessageHelper.successMessage('更新成功')
        }).catch(err => {
          MessageHelper.errorMessage('更新失败')
          console.log(err)
        })
      } else {
        delete data.id
        this.newCargoAction(data).then((res) => {
          this.closeThisDialog()
          MessageHelper.successMessage('添加成功')
          this.getAllCargo()
        }).catch(() => {
          MessageHelper.errorMessage('添加失败')
        })
      }
    }

    deleteCargo (id) {
      ConfirmHelper.warningMessage('此操作将删除商品信息, 是否继续?', '提示').then(() => {
        this.deleteCargoAction(id).then(() => {
          MessageHelper.successMessage('删除成功')
        })
      }).catch(() => {
        MessageHelper.infoMessage('已取消')
      })
    }

    getAllCargo () {
      this.getAllGoods()
    }

    addBrandType () {
      this.newTypeBox = true
    }

    created () {
      this.getAllGoodsType()
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

  .search #input .search-box{
    display: block;
  }
  .search-router {
    margin-top: 100px;
  }

  .el-select .el-input {
    width: 110px;
  }

  .el-autocomplete {
    display: block;
  }
</style>
