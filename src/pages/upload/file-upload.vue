<template>
  <div>
    <vue-file-upload url="upload.do"
                     ref="vueFileUploader"
                     :filters="filters"
                     :events="cbEvents"
                     :request-options="reqopts"
                     @onAdd="onAddItem">
      <span slot="label">选择文件</span>
    </vue-file-upload>
    <table>
      <thead>
      <tr>
        <th>name</th>
        <th>size</th>
        <th>progress</th>
        <th>status</th>
        <th>action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="file in files">
        <td v-text="file.name"></td>
        <td v-text="file.size"></td>
        <td v-text="file.progress"></td>
        <td v-text="onStatus(file)"></td>
        <td>
          <button type="button" @click="uploadItem(file)">上传</button>
          <button type="button" @click="uploadAll"> 上传所有文件</button>
          <button type="button" @click="clearAll"> 清空文件列表</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import VueFileUpload from 'vue-file-upload'

  export default {
    data () {
      return {
        files: [],
        // 文件过滤器，只能上传图片
        filters: [
          {
            name: 'imageFilter',
            fn (file) {
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|'
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1
            }
          }
        ],
        // 回调函数绑定
        cbEvents: {
          onCompleteUpload: (file, response, status, header) => {
            console.log(file)
            console.log('finish upload;')
          }
        },
        // xhr请求附带参数
        reqopts: {
          formData: {
            tokens: 'tttttttttttttt'
          },
          responseType: 'json',
          withCredentials: false
        }
      }
    },
    mounted () {
      // 设置formData数据
      this.$refs.vueFileUploader.setFormDataItem('authorization', '123')
    },
    methods: {
      onStatus (file) {
        if (file.isSuccess) {
          return '上传成功'
        } else if (file.isError) {
          return '上传失败'
        } else if (file.isUploading) {
          return '正在上传'
        } else {
          return '待上传'
        }
      },
      onAddItem (files) {
        console.log(files)
        this.files = files
      },
      uploadItem (file) {
        // 单个文件上传
        console.log(file)
        file.upload()
      },
      uploadAll () {
        // 上传所有文件
        this.$refs.vueFileUploader.uploadAll()
      },
      clearAll () {
        // 清空所有文件
        this.$refs.vueFileUploader.clearAll()
      }
    },
    components: {
      VueFileUpload
    }
  }
</script>
