<template>
  <canvas :style="backgroundColor"></canvas>
</template>

<script>
export default {
  props: {
    bgColor: String, // canvasの背景色
    colorString: String, // 色パターン文字列
    colorNum: [Number, String], // 色hsl 色相値 0〜360
    circleNum: [Number, String], // 円の数
    circleSpeed: String, // 移動スピード(veryslow, slow, fast, veryfast)
    circleSize: String, // 円の大きさ(verysmall, small, big, verybig)
    flgSizeFix: [Boolean, String], // 固定円サイズ(指定がなければランダム)
    moveType: String // 移動タイプ(vert horizon)
  },
  data() {
    return {
      ctx: null,
      width: 0,
      height: 0,
      circleManage: [],
      drawCount: 0,
      moveVertical: 1,
      moveHorizontal: 1,
      colorList: {
        red: 0,
        orange: 25,
        yellow: 60,
        yellowgreen: 85,
        green: 110,
        greenblue: 165,
        lightblue: 180,
        blue: 200,
        bluepurple: 260,
        purple: 285,
        lightpuple: 300,
        purplered: 315,
        lightred: 340
      }
    }
  },
  computed: {
    backgroundColor() {
      return `background-color: ${this.bgColor}`
    }
  },
  mounted() {
    this.settingCanvas()
    this.initPoint()
    requestAnimationFrame(this.draw)
    window.addEventListener('resize', this.settingCanvas)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.settingCanvas)
  },
  methods: {
    /**
     * canvas設定
     */
    settingCanvas() {
      const parent = this.$el.parentNode
      this.width = parent.clientWidth
      this.height = parent.clientHeight
      this.ctx = this.$el.getContext('2d')
      this.$el.width = this.width
      this.$el.height = this.height
    },
    /**
     * 円情報初期設定
     */
    initPoint() {
      this.circleManage = []
      // 表示数用 乱数取得
      const maxNum = this.circleNum || 30
      const minNum = this.circleNum ? this.circleNum / 2 : 10
      const circleNum = Math.floor(Math.random() * (maxNum - minNum) + minNum)
      let cnt = 0
      // 円の移動スピード veryslow, slow, fast, veryfast
      let speed = 1.0;
      switch (this.circleSpeed) {
        case 'veryslow':
          speed = 0.1;
          break;
        case 'slow':
          speed = 0.5;
          break;
        case 'fast':
          speed = 2.0;
          break;
        case 'veryfast':
          speed = 5.0;
          break;
      }
      // 円の大きさ verysmall, small, big, verybig
      let sizeRate = 1.0
      switch (this.circleSize) {
        case 'verysmall':
          sizeRate = 0.1;
          break;
        case 'small':
          sizeRate = 0.5;
          break;
        case 'big':
          sizeRate = 2.5;
          break;
        case 'verybig':
          sizeRate = 4.5;
          break;
      }
      // 移動タイプ vert horizon
      switch (this.moveType) {
        case 'vert':
          this.moveHorizontal = 0
          break;
        case 'horizon':
          this.moveVertical = 0
          break;
      }
      // 円サイズベース
      let baseSize = 50
      while(cnt < circleNum) {
        // 輝度
        const lightness =  Math.floor(Math.random() * (80 - 40) + 50)
        // 円サイズ固定フラグ
        if(this.flgSizeFix === false) {
          baseSize = Math.floor(Math.random() * (50 - 5) + 5)
        }
        // それぞれの円の大きさ (最大 - 最小) + 最小
        this.circleManage.push({
          x: Math.floor(Math.random() * (this.width - 0) + 0),
          y: Math.floor(Math.random() * (this.height - 0) + 0),
          r: baseSize * sizeRate,
          moveX: Math.random() * (Math.random() < 0.5 ? -1 : 1) * speed * this.moveHorizontal,
          moveY: Math.random() * (Math.random() < 0.5 ? -1 : 1) * speed * this.moveVertical,
          color: `hsl(${this.desideColorNum()}, 100%, ${lightness}%)`
        })
        cnt++
      }
    },
    /**
     * 描画
     */
    draw() {
      // リセット
      this.ctx.clearRect(0, 0, this.width, this.height)
      for(let i in this.circleManage) {
        this.calcPoint(this.circleManage[i], i)
        this.settingCircle(this.circleManage[i])
      }
      requestAnimationFrame(this.draw)
    },
    /**
     * 色情報
     */
    desideColorNum() {
      let num = 200
      const obj = this.colorList;
      if(Object.prototype.hasOwnProperty.call(obj)) {
        num = this.colorList[this.colorString]
      } else if(!isNaN(this.colorNum)) {
        num = this.colorNum
      }
      return num
    },
    /**
     * 円移動座標計算
     * @param arg 円一つ分の情報
     * @param i 配列キー
     */
    calcPoint(arg, i) {
      arg.x += arg.moveX
      arg.y += arg.moveY
      if(arg.x < 0) {
        arg.x = this.width
      } else if (arg.x > this.width) {
        arg.x = 0
      }
      if(arg.y < 0) {
        arg.y = this.height
      } else if (arg.y > this.height) {
        arg.y = 0
      }
      this.circleManage[i] = arg
    },
    /**
     * 円情報描画設定
     * @param arg
     */
    settingCircle(arg) {
      this.ctx.beginPath()
      this.ctx.arc(arg.x, arg.y, arg.r, 0, Math.PI*2, false)
      this.ctx.strokeStyle = arg.color
      this.ctx.fillStyle = arg.color
      this.ctx.fill();
      this.ctx.closePath()
      this.ctx.stroke()
    },
  }
}
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>