import Vue from 'vue'
import Swiper from '@/components/swiper/swiper'

describe('swiper.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Swiper)
    const vm = new Constructor().$mount()
    expect(Array.isArray(vm.swiperList))
      .to.equal(true)
  })
})
