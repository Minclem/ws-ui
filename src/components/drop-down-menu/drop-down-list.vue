<template>
  <section class="drop-down-menu">
    <slot></slot>
  </section>
</template>

<style lang="less">
  .drop-down-menu {
    display: -webkit-flex;
    display: flex !important;
    flex-wrap: wrap;
    
    position: relative;
  }
</style>
