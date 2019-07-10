<template>
  <div>
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
            <el-col :span="16">
              <el-input
                type="text"
                v-model="keyWord"
                placeholder="请输入内容"
                style="width:100%"
                >
                <template slot="prepend">关键词</template>
              </el-input>
            </el-col>
            <el-col :span="8" style="text-align:right;float:right">
              <el-button
                type="danger"
                @click.native="start"
                >开始</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="key-tag">
              {{"常用关键词："}}
              <el-tag
                :key="tag.name"
                v-for="tag in keyWordsTags"
                closable
                type="info"
                size="medium"
                effect="dark"
                :disable-transitions="false"
                @click.native="handleClick(tag)"
                @close="handleClose(tag)">
                {{tag.name}}
              </el-tag>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-card
                class="box-card"
                shadow="hover">
                <div class="text item">
                  {{'关键词: ' + keyWord }}
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
const KEYWORDS = 'KEY_WORDS'
export default {
  name: 'home',
  data () {
    return {
      textarea: '',
      keyWord: '',
      results: [],
      resultsHtml: [],
      total: 0,
      watched: 1
    }
  },
  computed: {
    paramTotal () {
      return this.results.length || 0
    },
    keyWords () {
      return (this.watched && JSON.parse(localStorage.getItem(KEYWORDS))) || {}
    },
    keyWordsTags () {
      return Object.keys(this.keyWords).map(key => this.keyWords[key])
    }
  },
  // watch: {
  //   keyWords: {
  //     handler (val) {
  //       localStorage.setItem(KEYWORDS, JSON.stringify(val))
  //     },
  //     immediate: true
  //   }
  // },
  methods: {
    start () {
      // 存储关键词
      this.setKeyWordsStorg(this.keyWord)
      // 开始处理
      this.handleData()
    },
    handleData () {
      this.total = 0
      this.resultsHtml = []
      // 拆分对话
      const arr = this.textarea.split('\n')
      const reg = new RegExp(this.keyWord, 'g')
      // 筛选含有关键词的对话
      this.results = arr.filter(item => reg.test(item))
      this.results.forEach(item => {
        this.total += item.match(reg).length
        const temp = item.replace(reg, '<span>$&</span>')
        this.resultsHtml.push(temp)
      })
    },
    setKeyWordsStorg (keyword) {
      const keywordObj = {
        name: keyword,
        count: 0
      }
      let obj = this.keyWords[keyword] || keywordObj
      obj.count++
      this.keyWords[keyword] = obj
      localStorage.setItem(KEYWORDS, JSON.stringify(this.keyWords))
      this.watched++
    },
    handleClose (tag) {
      delete this.keyWords[tag.name]
      localStorage.setItem(KEYWORDS, JSON.stringify(this.keyWords))
      this.watched++
    },
    handleClick (tag) {
      this.keyWord = tag.name
      this.setKeyWordsStorg(tag.name)
      this.handleData()
    }
  }
}
</script>

<style lang="scss">
.wrap {
  width: 60%;
  min-width: 900px;
  margin: 0 auto;
}
.el-row {
  margin-top: 20px;
}
.key-tag {
  line-height: 40px;
  text-align: left;
  color: #ccc;
  .el-tag {
    margin-right: 10px;
    cursor: pointer;
  }
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
  text-align: left;
}
.item {
  span {
    color: red;
  }
}
.box-card {
  /* width: 480px; */
}
</style>
