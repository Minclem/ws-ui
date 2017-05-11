<template>
  <section class="ws-demo-page">
    <h3>类型一（列表数据为数组时）<br> 类型二（列表数据为对象时）<br> 类型三（链接导航）</h3>
    <div class="ws-row text-center">
      <span class="ws-col-4">value: {{ value1 }}</span>
      <span class="ws-col-4">value: {{ value2 }}</span>
      <span class="ws-col-4">value: {{ value3 }}</span>
    </div> 
    <drop-down-list>
      <drop-down-item title="选择菜单一" :drop-list="menu[0]" v-model="value1"></drop-down-item>
      <drop-down-item title="选择菜单二" :drop-list="menu[1]" v-model="value2"></drop-down-item>
      <drop-down-item title="选择菜单三" :drop-list="menu[2]" v-model="value3"></drop-down-item>
    </drop-down-list>

    <drop-down-list>
      <drop-down-item title="导航菜单一" :drop-list="menu1[0]" v-model="value1"></drop-down-item>
      <drop-down-item title="导航菜单二" :drop-list="menu1[1]" v-model="value2"></drop-down-item>
      <drop-down-item title="导航菜单三" :drop-list="menu1[2]" v-model="value3"></drop-down-item>
    </drop-down-list>
    
    <drop-down-list>
      <drop-down-item title="导航菜单一" :drop-list="menu2[0]" v-model="value1" :is-link="true"></drop-down-item>
      <drop-down-item title="导航菜单二" :drop-list="menu2[1]" v-model="value2" :is-link="true"></drop-down-item>
      <drop-down-item title="导航菜单三" :drop-list="menu2[2]" v-model="value3" :is-link="true"></drop-down-item>
    </drop-down-list>
  </section>
</template>

<script>
  import DropDownList from '@/components/drop-down-menu/drop-down-list'
  import DropDownItem from '@/components/drop-down-menu/drop-down-item'
  export default {
    components: {
      DropDownList,
      DropDownItem
    },
    data () {
      return {
        value1: '菜单一（1）',
        value2: '菜单二（2）',
        value3: '菜单三（3）',
        menu: [
          ['菜单一（1）', '菜单一（2）', '菜单一（3）', '菜单一（4）'],
          ['菜单二（1）', '菜单二（2）', '菜单二（3）'],
          ['菜单三（1）', '菜单三（2）', '菜单三（3）', '菜单三（4）', '菜单三（5）']
        ],
        menu1: [
          {
            0: '菜单一（1）',
            1: '菜单一（2）',
            2: '菜单一（3）',
            3: '菜单一（4）'
          },
          {
            0: '菜单二（1）'
          },
          {
            0: '菜单三（1）'
          }
        ],
        menu2: [
          {
            'swiper': '/demo/swiper',
            'loading': '/demo/loading',
            'drop-down-menu': '/demo/drop-down-menu'
          },
          {
            'loading': '/demo/loading'
          },
          {
            'drop-down-menu': '/demo/drop-down-menu'
          }
        ]
      }
    }
  }
  
</script>

<style scoped lang="less">
  .ws-demo-page {
    line-height: 40px;

    h3 {
      margin-bottom: 2em;
      padding: 0 1em;
      font-weight: bold;
      box-shadow: 0 0 1px #b8bbbf;
      background: #f6f8fa;
    }
    .drop-down-menu {
      margin-top: 2em;
    }
  }
</style>
