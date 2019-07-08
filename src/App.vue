<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1>关键词抓取</h1>
      </el-header>
      <el-main>
        <div class="wrap">
          <el-row>
            <el-col :span="24">
              <el-input
                type="textarea"
                :rows="2"
                :autosize="{minRows: 2, maxRows: 6}"
                placeholder="请输入内容"
                v-model="textarea">
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="display:flex;justify-content: space-between;">
              <el-input
                type="text"
                v-model="keyWords"
                placeholder="请输入内容"
                style="width:60%"
                >
                <template slot="prepend">关键词</template>
              </el-input>
              <el-button type="danger" @click.native="start">开始</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-card
                class="box-card"
                shadow="hover">
                <div class="text item">
                  {{'关键词: ' + keyWords }}
                </div>
                <div class="text item">
                  {{'关键词出现总数: ' + total }}
                </div>
                <div class="text item">
                  {{'关键词出现段落总数: ' + paramTotal }}
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>详情</span>
                  <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                </div>
                <div v-for="(item, i) in resultsHtml" :key="i" class="text item" v-html="item">
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      textarea: '',
      keyWords: '',
      results: [],
      resultsHtml: [],
      total: 0
    }
  },
  computed: {
    paramTotal () {
      return this.results.length || 0
    }
  },
  methods: {
    start () {
      this.total = 0
      this.resultsHtml = []
      // 拆分对话
      const arr = this.textarea.split('\n')
      const reg = new RegExp(this.keyWords, 'g')
      // 筛选含有关键词的对话
      this.results = arr.filter(item => reg.test(item))
      this.results.forEach(item => {
        this.total += item.match(reg).length
        const temp = item.replace(reg, '<span>$&</span>')
        this.resultsHtml.push(temp)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.wrap {
  width: 900px;
  margin: 0 auto;
}
.el-row {
  margin-top: 20px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
  text-align: left;
}
.item span {
  color: red;
}
.box-card {
  /* width: 480px; */
}
</style>
