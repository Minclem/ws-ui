<!--
  滚动组件
-->
<template>
  <div class="scroller"
    :style="{ 'background-color': bgColor }"
    @scroll="scroll"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend">
    <div class="scroll-box"
      :style="{
        'transform' : 'translate3d(0,' + translateY + 'px, 0)',
        'transition-duration': transitionDuration + 'ms'
      }">
      <div class="pull-dowm pull">{{ pullDownConfig[dowmStatus] }}</div>
      <slot></slot>
      <div class="pull-up pull">{{ pullUpConfig[upStatus] }}</div>
      <slot name="end"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'scroller',
    props: {
      bgColor: String 
    },
    data: function () {
      return {
        startPos: 0,
        translateY: 0,
        maxScroll:  0,
        scrollY: 0,
        scrollEnd: 0,
        transitionDuration: 0,
        timer: null,
        dowmStatus: 0,
        upStatus: 0,
        pullDownConfig: {
          '0': '下拉刷新',
          '1': '释放立即刷新',
          '2': '正在刷新',
          '3': '刷新成功'
        },
        pullUpConfig: {
          '0': '',
          '1': '上拉加载更多',
          '2': '释放立即加载',
          '3': '正在加载',
          '4': '加载成功'
        }
      }
    },
    methods: {
      touchstart: function () {
        // 初始化
        this.transitionDuration = 0;
        this.startPos = this.getTouchPos();
        this.getMaxScroll();
        clearTimeout(this.timer);
      },
      touchmove: function (e) {
        var Y;
        /**
         * 验证是否下拉到底部
         * 如果下拉到底部时将起始点进行重置
         */
        if(this.maxScroll === this.scrollY + this.$el.offsetHeight + 5){
          this.startPos = this.getTouchPos()
        }
        // 滑动的距离 = 手指滑动的位置 - 滑动起始位置  
        Y  = this.getTouchPos() - this.startPos;

        // 下拉操作
        if ( Y > 0 && this.scrollY === 0) {
          this.translateY = Y;
          // 刷新操作提示
          if (Y > 40) this.dowmStatus = 1;
        }
        // 上拉操作
        if (Y < -1 && this.scrollEnd) {
          this.translateY = Y;
          this.upStatus = 1;

          // 加载操作
          if(Y < -40) {
            this.upStatus = 2;
            this.load();
          }
        }
      },
      touchend: function (e) {
        // 设置会弹
        this.transitionDuration = 500;
        // 
        if (this.translateY > 40 && this.scrollY === 0) {
          this.dowmStatus = 2;
          // 刷新时进行停顿
          this.translateY = 40;
          this.refresh();
        } else {
          this.translateY = 0
        }

      },
      scroll: function () {
        /**
         * 获取滚动距离
         * 判断是否滚动到底部
         */ 
        var self = this.$el;
        var maxScroll = this.getMaxScroll();
        var oftTop = self.scrollTop + self.offsetHeight;

        this.scrollY = self.scrollTop;
        this.scrollEnd = ( oftTop === maxScroll );
      },
      load: function () {
        // 模拟加载
        this.upStatus = 3;
        this.timer = setTimeout(()=>{
          this.upStatus = 4;
        }, 1000)
        this.timer = setTimeout(()=>{
          this.translateY = 0;
          this.upStatus = 0;
        }, 1500)
      },
      refresh: function () {
        // 模拟刷新
        this.timer = setTimeout(()=>{
          this.dowmStatus = 3;
        }, 1000)
        this.timer = setTimeout(()=>{
          this.translateY = 0
        }, 1500)
      },
      getMaxScroll: function () {
        // 获取最大的滚动范围
        return this.maxScroll = this.$el.children[0].offsetHeight;
      },
      getTouchPos: function () {
        // 获取滑动的位置
        return event.changedTouches && event.changedTouches[0]['pageY']
      }
    }
  }
</script>


<style scoped>
  .scroller {
    position: relative;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    background: #f5f8f9;
  }
  .scroller li {
    line-height: 40px;
    padding: 0 20px;
    border-bottom: 1px dashed #aaa;
  }
  .pull {
    width: 100%;
    line-height: 40px;
    text-align: center;
    color: #c0cad0;
  }
  .pull-dowm {
    position: absolute;
    top: -40px;
    left: 0;
  }
</style>
