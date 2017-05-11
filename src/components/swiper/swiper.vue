<template>
  <div class="ws-swiper" :class="direction ? 'ws-vertical' : 'ws-level'" 
    @touchstart="touchStart"
    @touchend="touchEnd"
    @touchmove="touchMove">

    <div class="ws-swiper-container"
      :style="{
            'transform' : 'translate3d(' + translateX + 'px,' + translateY + 'px, 0)',
            'transition-duration': transitionDuration + 'ms'
         }">
        <slot>
          <div class="ws-pic-item" v-for="item in swiperList"><img :src="item" alt="swiper images"></div>
        </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'swiper',
    props: {
      // level === false|vertical === true
      direction: {
        type: Boolean,
        default: false
      },
      swiperList: {
        type: Boolean,
        default () {
          return []
        }
      },
      // Default does not play
      autoPlay: {
        type: Boolean,
        default: false
      },
      auto: {
        type: Number,
        default: 3000
      }
    },
    data () {
      return {
        currentPage: 0,
        startPos: 0,
        pageMove: 0,
        translateX: 0,
        translateY: 0,
        startTranslate: 0,
        transitionDuration: 500,
        timer: null
      }
    },
    mounted () {
      this.play()
    },
    methods: {
      touchStart () {
        clearInterval(this.timer)

        this.pageMove = 0
        this.transitionDuration = 0
        this.startTranslate = this.direction ? this.translateY : this.translateX
        this.startPos = this.getThouches()
      },
      touchMove () {
        this.pageMove = this.getTouchPos(event) - this.startPos
        this.setTranslate(this.startTranslate + this.pageMove)
        event.preventDefault()
      },
      touchEnd () {
        this.transitionDuration = 500
        this.pageMove = this.getThouches() - this.startPos

        if (this.pageMove > 100) {
          this.prev()
        } else if (this.pageMove < -100) {
          this.next()
        } else {
          this.setTranslatePage(this.currentPage)
        }

        this.play()
      },
      getTouchPos () {
        let _direction = this.direction ? 'pageY' : 'pageX'

        return event.changedTouches ? event.changedTouches[0][_direction] : event[_direction]
      },
      setTranslate (val) {
        this.direction ? this.translateY = val : this.translateX = val
      },
      setTranslatePage (pageNum) {
        let size = this.direction ? 'clientHeight' : 'clientWidth'
        let ev = event ? event.currentTarget : document.querySelector('.ws-swiper')
        let speed = ev[size] * pageNum

        this.currentPage = pageNum
        this.setTranslate(-speed)
      },
      getThouches () {
        let pos = this.direction ? 'pageY' : 'pageX'
        return event.changedTouches[0][pos]
      },
      prev () {
        this.currentPage >= 1 ? this.setTranslatePage(this.currentPage - 1) : this.setTranslatePage(this.currentPage)
      },
      next () {
        this.currentPage < this.swiperList.length - 1 ? this.setTranslatePage(this.currentPage + 1) : this.setTranslatePage(this.currentPage)
      },
      play () {
        if (this.autoPlay) {
          this.timer = setInterval(() => {
            if (this.swiperList.length > 1) {
              if (this.currentPage >= this.swiperList.length - 1) this.currentPage = -1
              this.next()
            }
          }, this.auto)
        }
      }
    }
  }
</script>

<style lang="less">
  .ws-swiper {
    overflow: hidden;
    
    &.ws-vertical {
      .ws-swiper-container {
        flex-wrap: wrap;
      }
    }

    .ws-swiper-container {
      width: 100%;
      height: 100%;
    }
  }
  .ws-swiper-container {
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient: horizontal;

    .ws-pic-item {
      overflow: hidden;
      width: 100%;
      height: 100%;
      -webkit-flex-shrink: 0;
      flex-shrink: 0;
      display: -webkit-flex;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        display: block;
        width: 100%;
      }
    }
  }
</style>
