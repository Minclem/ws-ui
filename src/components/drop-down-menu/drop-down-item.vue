<template>
  <div ref="dropDownItem" class="drop-down-item" @click="showDrop" :class="{ 'active': show }">
    <span class="drop-down-title">
      {{ title }}
      <i class="drop-arrow-icon"></i>
    </span>
    <ul class="drop-down-list" v-if="dropList">
      <li class="item" 
        :class="{ 'checked': value === item }"
        :data-key="Array.isArray(dropList) ? key : item"
        v-for="(item, key) in dropList"
        @click="select(key, item)">
          <span v-if="!isLink">{{ item }}</span>
          <router-link v-else :to="Array.isArray(dropList) ? key : item">{{ Array.isArray(dropList) ? item : key }}</router-link>   
        </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      dropList: [ Object, Array ],
      value: [ String, Number ],
      isLink: Boolean
    },
    data () {
      return {
        show: false
      }
    },
    methods: {
      showDrop () {
        let siblings = this.$parent.$children
        let i = 0
        let len = siblings.length

        for (; i < len; i++) {
          siblings[i].show = (siblings[i] === this) ? !siblings[i].show : false
        }
      },
      select (key, item) {
        this.$emit('input', item)
      }
    }
  }
</script>

<style lang="less">
  .drop-down-item {
    border-width: 1px 0;
    border-style: solid;
    border-color: #ececec;
    background: #fff;
    -webkit-box-flex: 1;
        -webkit-flex: 1;
                flex: 1;
    .drop-down-title {
      display: block;
      position: relative;
      margin: 8px 0;
      text-align: center;
      line-height: 28px;
      border-right: 1px solid #ececec;
      transition: all 1s;
      
      .drop-arrow-icon {
        position: absolute;
        top: 50%;
        right: 20px;
        &:before,
        &:after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-width: 8px 6px 0 6px;
          border-style: solid;
          border-color: #999 transparent transparent transparent;
          transform: translate3D(-50%, -50%, 0);
          border-radius: 4px;
        }
        &:after {
          margin-top: -2px;
          border-top-color: #fff;
        }
      }
    }
    &.active {
      .drop-arrow-icon {
        transform: rotate(-180deg)
      }
    }
    &:last-child {
      .drop-down-title {
        border-right: 0;
      }
    }
    .drop-down-list {
      display: none;
      position: absolute;
      top: 46px;
      left: 0;
      right: 0;
      z-index: 9;
      line-height: 38px;
      background: #fff;
      & > .item {
        padding: 0 1em;
        border-bottom: 1px solid #ececec;
      }
      .checked {
        position: relative;
        &:before,
        &:after {
          content: "";
          position: absolute;
          top: 40%;
          right: 10px;
          border-width: 8px 16px 0 5px;
          border-style: solid;
          border-color: #31a049 transparent transparent transparent;
          -webkit-transform: rotate(-22deg);
          transform: rotate(-22deg);
        }
        &:after {
          margin-top: -4px;
          border-top-color: #fff;
        }
      }
      a {
        display: block;
      }
    }
    &.active .drop-down-list {
      display: block;
    }
  }
</style>
