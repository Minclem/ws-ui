<template>
  <section class="ws-loading" v-show="show">
   <div class="ws-mask"></div>
   <div class="ws-toast" :class="{'has-loading-tips': !!text}">
     <div class="ws-toast-loading">
       <div class="ws-loading-leaf" v-for="i in 12" :class="['ws-loading-leaf-' + (i - 1)]"></div>
      </div>
     <div class="ws-toast-content">
      <slot>
        {{text}}
      </slot>
     </div>
   </div>
  </section>
</template>
<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="less">
  @import '../../assets/less/mixins.less';

  .ws-loading {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;

    .ws-mask {
      display: block !important;
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      top: 0;
      top: 50px;
      left: 0;
    }
    .ws-toast {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      width: 4.5em;
      min-height: 4.5em;
      text-align: center;
      color: #fff;
      background: rgba(40, 40, 40, 0.75);
      border-radius: 5px;
      transform: translateY(-50%) translateX(-50%);
      
      &.has-loading-tips {
        width: 7em;
        min-height: 7em;

        .ws-toast-loading {
          top: 38%;
        }
      }
    }
    .ws-toast-loading {
      position: absolute;
      top: 48%;
      left: 50%;
      width: 0;
      height: 0;
      z-index: 1;
    }
    .ws-toast-content {
      margin: 68% 0 10px;
      font-size: 12px;
      letter-spacing: 1px;
      animation:mymove 5s infinite;
    }
    .ws-loading-leaf {
      position: absolute;
      top: -1px;
      opacity: 0.25;
      
      &:before {
        content:" ";
        position: absolute;
        width: .5em;
        height: .25em;
        background: rgb(209, 209, 213);
        box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px;
        border-radius: 50%;
        transform-origin: left 50% 0px;
      }
    }
    .loading-while(ws-loading-leaf, load, 12);
    @keyframes load-1 {
      0%,0.01% {opacity: .25 } 
      0.02% {opacity: 1 } 
      60.01%,to {opacity: .25 } 
    }
    @keyframes load-2 {
      0%,8.34333% {opacity: .25 } 
      8.35333% {opacity: 1 } 
      68.3433%,to {opacity: .25 } 
    }
    @keyframes load-3 {
      0%,16.6767% {opacity: .25 } 
      16.6867% {opacity: 1 } 
      76.6767%,to {opacity: .25 } 
    }
    @keyframes load-4 {
      0%,25.01% {opacity: .25 } 
      25.02% {opacity: 1 } 
      85.01%,to {opacity: .25 } 
    }
    @keyframes load-5 {
      0%,33.3433% {opacity: .25 } 
      33.3533% {opacity: 1 } 
      93.3433%,to {opacity: .25 } 
    }
    @keyframes load-6 {
      0% {opacity: .27095833 } 
      41.6767% {opacity: .25 } 
      41.6867% {opacity: 1 } 
      1.67667% {opacity: .25 } 
      to {opacity: .27095833 } 
    }
    @keyframes load-7 {
      0% {opacity: .375125 } 
      50.01% {opacity: .25 } 
      50.02% {opacity: 1 } 
      10.01% {opacity: .25 } 
      to {opacity: .375125 } 
    }
    @keyframes load-8 {
      0% {opacity: .47929167 } 
      58.3433% {opacity: .25 } 
      58.3533% {opacity: 1 } 
      18.3433% {opacity: .25 } 
      to {opacity: .47929167 } 
    }
    @keyframes load-9 {
      0% {opacity: .58345833 } 
      66.6767% {opacity: .25 } 
      66.6867% {opacity: 1 } 
      26.6767% {opacity: .25 } 
      to {opacity: .58345833 } 
    }
    @keyframes load-10 {
      0% {opacity: .687625 } 
      75.01% {opacity: .25 } 
      75.02% {opacity: 1 } 
      35.01% {opacity: .25 } 
      to {opacity: .687625 } 
    }
    @keyframes load-11 {
      0% {opacity: .79179167 } 
      83.3433% {opacity: .25 } 
      83.3533% {opacity: 1 } 
      43.3433% {opacity: .25 } 
      to {opacity: .79179167 } 
    }
    @keyframes load-12 {
      0% {opacity: .89595833 } 
      91.6767% {opacity: .25 } 
      91.6867% {opacity: 1 } 
      51.6767% {opacity: .25 } 
      to {opacity: .89595833 } 
    }
  }
</style>
