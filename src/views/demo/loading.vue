<template>
  <section class="ws-demo-page">
    <p class="button" @click="showLaoding('loadingSHow')">不包含文字的Loading</p>
    <p class="button" @click="showLaoding('loadingTextSHow')">包含文字的Loading</p>

    <loading :show="loadingSHow"></loading>
    <loading :show="loadingTextSHow" text="Loading"></loading>
  </section>
</template>

<script>
  import Loading from '@/components/loading/loading'

  export default {
    components: {
      Loading
    },
    data () {
      return {
        loadingSHow: false,
        loadingTextSHow: false
      }
    },
    methods: {
      showLaoding (obj) {
        this[obj] = !this[obj]

        setTimeout(() => {
          this[obj] = !this[obj]
        }, 3000)
      }
    }
  }
</script>
