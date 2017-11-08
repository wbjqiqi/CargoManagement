<template>
  <div class="search">
    <div style="width: 100%; position: fixed; top: 0; z-index: 3;background-color: #fff;">
      <el-col :span="12" :offset="6">
        <p>请输入搜索内容：</p>
        <el-row>
          <el-col :span="24" id="input">
            <el-autocomplete
              v-model="state4"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect">
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
      <router-view @edit-cargo="editCargo" @delete-cargo="deleteCargo" @new-cargo="newCargo" @get-all-cargo="getAllCargo"></router-view>
    </div>
    <CargoDialod :isOpenDialog="isOpenDialog" :isEdit="isEdit" :goods="goods" @closeDialog="closeThisDialog"
                 @submitCargo="submitCargo" ></CargoDialod>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import { mapState, mapGetters } from 'vuex'
  import Component from 'vue-class-component'

  import CargoDialod from './cargo-main/cargo-dialog.vue'

  @Component({
    computed: {
      ...mapState(['Goods']),
      ...mapGetters(['isOpenDialog'])
    },
    components: {
      CargoDialod
    }
  })
  export default class search extends Vue {
    // data
    searchContent = ''
    searchType = ''
    state4 = ''
    timeout = null
    goods = {
      id: '',
      name: '',
      brand: '',
      specific: '',
      number: '',
      price: '',
      remark: '',
      rest: '',
      image: ''
    }
    isEdit = false

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

    searchById (id) {
      this.$store.dispatch('searchById', id)
    }

    handleSelect (item) {
      this.searchById(item.id)
      this.$router.push({name: 'searchMain', params: {cargoId: item.id}})
    }

    resetGoods () {
      this.goods = {
        id: '',
        name: '',
        brand: '',
        specific: '',
        number: '',
        price: '',
        remark: '',
        rest: '',
        image: ''
      }
    }

    newCargo () {
      this.resetGoods()
      this.isEdit = false
      this.$store.dispatch('openDialog')
    }

    editCargo (id) {
      this.searchById(id)
      this.goods = this['Goods'].goods[0]
      this.isEdit = true
      this.$store.dispatch('openDialog')
    }

    closeThisDialog () {
      this.$store.dispatch('closeDialog')
    }

    submitCargo (info) {
      let data = info.model
      if (info.isEdit) {
        this.$store.dispatch('updateCargo', data).then(() => {
          this.closeThisDialog()
          this['$message']({
            type: 'success',
            message: '更新成功'
          })
        }).catch(err => {
          this['$message']({
            type: 'error',
            message: '更新失败'
          })
          console.log(err)
        })
      } else {
        delete data.id
        this.$store.dispatch('newCargo', data).then((res) => {
          this.closeThisDialog()
          this['$message']({
            type: 'success',
            message: '添加成功'
          })
          console.log(res)
          this.handleSelect(res)
        }).catch(err => {
          this['$message']({
            type: 'error',
            message: '添加失败'
          })
          console.log(err)
        })
      }
    }

    deleteCargo (id) {
      this.$confirm('此操作将删除商品信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('deleteCargo', id).then(() => {
          this['$message']({
            type: 'success',
            message: '删除成功'
          })
        })
      }).catch(() => {
        this['$message']({
          type: 'info',
          message: '已取消'
        })
      })
    }

    getAllCargo () {
      this.$store.dispatch('getAllGoods')
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
