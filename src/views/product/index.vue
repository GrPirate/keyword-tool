<template>
  <div ref="chart" class="word-echart"></div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-wordcloud'
import { getData } from '../../api/words'
let myChart
function createRandomItemStyle () {
  return {
    normal: {
      color: 'rgb(' + [
        Math.round(Math.random() * 160),
        Math.round(Math.random() * 160),
        Math.round(Math.random() * 160)
      ].join(',') + ')'
    }
  }
}
export default {
  data () {
    return {
      results: null,
      series: null
    }
  },
  methods: {
    getWords () {
      return getData()
        .then(res => {
          this.results = res.data
          return Promise.resolve()
        })
        .catch(err => {
          console.error(err)
        })
    },
    setChart () {
      const item = {
        name: 'Word Clouds',
        type: 'wordCloud',
        shape: 'circle',
        left: 'center',
        top: 'center',
        sizeRange: [12, 80],
        rotationRange: [0, 180],
        rotationStep: 90,
        gridSize: 10,

        // Global text style
        textStyle: {
          normal: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            // Color can be a callback function or a color string
            color: function () {
              // Random color
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')'
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        drawOutOfBound: false,
        data: []
      }
      item.data = this.results.map(v => {
        return {
          name: v.name,
          value: v.count,
          textStyle: createRandomItemStyle()
        }
      })
      this.series = [item]
      myChart.setOption({
        title: {
          text: 'Word Clouds',
          link: '/#/product'
        },
        tooltip: {
          show: true
        },
        series: this.series
      })
    }
  },
  mounted () {
    myChart = echarts.init(this.$refs.chart, 'vintage')
    this.getWords()
      .then(() => {
        this.setChart()
      })
  }
}
</script>

<style lang="scss" scoped>
.word-echart {
  width: 1366px;
  height: 600px;
  max-height: 800px;
  margin: 50px auto;
  overflow: hidden;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
  background-color: white;
}
</style>
