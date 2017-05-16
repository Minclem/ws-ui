<template>
	<section class="ws-demo-page">
    <!-- <p class="pd-2pt">1、左右滚动</p> -->
    <swiper>
      <swiper-item v-for="(item, $index) in swiperList" :key="$index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
    <!-- <p class="pd-2pt">2、上下滚动（上下滚动时需要为Swiper设置高度）</p> -->
	</section>
</template>

<script>
  import Swiper from '@/components/swiper/swiper'
  import SwiperItem from '@/components/swiper/swiper-item'

  export default {
    components: {
      Swiper,
      SwiperItem
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
