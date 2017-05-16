<template>
  <div class="ws-swiper" :class="'ws-' + direction"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd">
    <div class="ws-swiper-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import $dom from '@/assets/js/dom.js'

  export default {
    name: 'swiper',
    props: {
      // level or vertical
      direction: {
        type: String,
        default: 'level'
      },
      autoPlay: Boolean,
      auto: {
        type: Number,
        default: 3000
      },
      setIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        rollingDirection: 'pageX',
        rollingMove: 0,
        currentPage: 0,
        startPos: 0,
        // startTranslate: 0,
        translateX: 0,
        translateY: 0,
        pageWidth: 0,
        transitionDuration: 300
      }
    },
    mounted () {
      this.rollingDirection = this.direction === 'level' ? 'pageX' : 'pageY'
      this.initPage()
    },
    methods: {
      initPage () {
        this.currentPage = this.setIndex
        this.getDrapObj()
        this.getWidth()
      },
      touchStart () {
        this.transitionDuration = 0
        this.startPos = this.getThouches()
      },
      touchMove () {
        this.rollingMove = this.getThouches() - this.startPos
      },
      touchEnd () {
        this.transitionDuration = 300
        if (this.rollingMove > 100) {
          this.prevPage()
          return
        }
        if (this.rollingMove < -100) {
          this.nextPage()
          return
        }
        this.rollingMove = 0
      },
      getThouches () {
        return event.changedTouches[0][this.rollingDirection]
      },
      setDrapMove (el, speed = 0) {
        el.style.webkitTransition = this.transitionDuration
          ? '-webkit-transform ' + this.transitionDuration + 'ms ease-in-out' : ''
        el.style.webkitTransform = 'translate3d(' + speed + 'px, 0, 0)'
      },
      getDrapObj () {
        let child = this.$children
        let len = child.length

        if (this.currentPage < 0) this.currentPage = len - 1
        if (this.currentPage >= len) this.currentPage = 0

        let cur = this.currentPage
        let prev = cur === 0 ? len - 1 : cur - 1
        let next = cur === len - 1 ? 0 : cur + 1

        this.drapObj = {
          cur: child[cur].$el,
          prev: child[prev].$el,
          next: child[next].$el
        }

        $dom('.ws-swiper-item').removeClass('is-show-page is-prev-page is-next-page')
        $dom(child[cur].$el).addClass('is-show-page')
        $dom(child[prev].$el).addClass('is-prev-page')
        $dom(child[next].$el).addClass('is-next-page')
      },
      prevPage () {
        this.rollingMove = this.pageWidth
        setTimeout(() => {
          this.currentPage--
        }, this.transitionDuration)
      },
      nextPage () {
        this.rollingMove = -this.pageWidth
        setTimeout(() => {
          this.currentPage++
        }, this.transitionDuration)
      },
      getWidth () {
        this.pageWidth = this.drapObj.cur.clientWidth
      }
    },
    watch: {
      currentPage (val) {
        this.getDrapObj()
        this.$emit('change', val)
      },
      rollingMove (val) {
        this.setDrapMove($dom('.is-show-page')[0], val)
        this.setDrapMove($dom('.is-prev-page')[0], -this.pageWidth + val)
        this.setDrapMove($dom('.is-next-page')[0], this.pageWidth + val)
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
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
  .ws-swiper-item {
    display: none;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &.is-show-page,
    &.is-prev-page,
    &.is-next-page {
      display: block;
    }
    &.is-show-page {
      z-index: 9;
    }
    img {
      display: block;
      width: 100%;
    }
  }
</style>
