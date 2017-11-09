<template>
  <el-dialog size="small" title="新建品牌种类" v-model="newTypeBox" validator="false" :beforeClose="closeDialog">
    <el-form @keyup.enter.native="newTypeSubmit()" labelPosition="left"
             ref="clientBox">
      <el-form-item label="名字" prop="brandName">
        <el-input v-model="brandName" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <span v-for="(key, index) in getBrandType" :key="key.text" class="tag-grid">
      <el-tag
              :type="colorArray[index]"
              close-transition>{{key.text}}
    </el-tag>
      <span class="delete-symbol" @click="deleteBrandType(key.id)">x</span>
    </span>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary"
                 @click=newTypeSubmit()>确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang='ts'>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import {mapGetters} from 'vuex'
  @Component({
    props: ['newTypeBox', 'getAllMachine', 'colorArray'],
    computed: mapGetters([
      'getBrandType'
    ])
  })
  export default class typeDialog extends Vue {
//    data
    brandName = ''
//    methods
    newTypeSubmit (): void {
      let data = {
        name: this.brandName
      }
      this.$store.dispatch('newBrandType', data).then((res) => {
        this.brandName = ''
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
    }

    deleteBrandType (id) {
      this.$confirm('此操作将删除该品牌标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('deleteBrandType', id).then(() => {
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

    closeDialog () {
      this.$emit('closeTypeDialog')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-tag{
    margin:0 5px;
  }
  .tag-grid{
    display: inline-block;
    position: relative;
    margin: 5px;
  }
  .tag-grid:hover .delete-symbol{
    display: block;
  }
  .delete-symbol{
    display: none;
    position: absolute;
    top: -10px;
    right: 0;
    border-radius: 50%;
    color: #d9534f;
    border: 1px solid #999;
    width: 13px;
    height: 13px;
    line-height: 12px;
    text-align: center;
    cursor: pointer;
  }
  .delete-symbol:hover{
    color: #fff;
    background-color: #d9534f;
    border: 1px solid #999;
  }
</style>
