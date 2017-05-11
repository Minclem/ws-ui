<template>
  <section class="ws-home">
    <header class="ws-home-header">Vue Components</header>
  	<section class="ws-demo-list">
  		<router-link class="ws-demo-cell" v-for="(item, key) in demoList" :to="item.url" :key="key">{{ item.title }}</router-link>	
  	</section>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        demoList: [
          {title: 'swiper', url: '/demo/swiper'},
          {title: 'loading', url: '/demo/loading'},
          {title: 'drop-down-menu', url: '/demo/drop-down-menu'}
        ]
      }
    }
  }
</script>
