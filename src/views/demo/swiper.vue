<template>
	<section class="ws-demo-page">
    <p class="pd-2pt">1、左右滚动</p>
    <swiper :swiper-list="swiperList"></swiper>
    <p class="pd-2pt">2、上下滚动（上下滚动时需要为Swiper设置高度）</p>
    <swiper :swiper-list="swiperList" :direction="true"></swiper>
	</section>
</template>

<script>
  import Swiper from '@/components/swiper/swiper'

  export default {
    components: {
      Swiper
    },
    data () {
      return {
        swiperList: [
          '/static/demo/demo1.jpg',
          '/static/demo/demo2.jpg',
          '/static/demo/demo3.jpg',
          '/static/demo/demo4.jpg',
          '/static/demo/demo5.jpg',
          '/static/demo/demo6.jpg'
        ]
      }
    }
  }
  
</script>

<style>
  .ws-swiper {
    height: 230px;
  }
</style>
