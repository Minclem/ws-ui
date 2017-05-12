import Vue from 'vue'
import Loading from '@/components/loading/loading'

describe('loading.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Loading)
    const vm = new Constructor().$mount()
    expect(typeof vm.show).to.equal('boolean')
    expect(typeof vm.text).to.equal('string')
  })
})
