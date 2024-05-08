<template>
  <div id="app">
    <!-- 左侧菜单栏 -->
    <div class="menu">
      <!-- 菜单 -->
      <div class="menu-items">
        <div class="menu-item" >申请</div>
      <!--   状态方块忙按钮     -->
        <span class="menu-mang"></span>
      </div>

    </div>
    <!--  占位使用  -->
    <div class="aaa"></div>
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->

    <router-view/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //margin-top: 60px;
}
.menu-mang {
  /* padding: 4px; */
  background: #f00;
  display: block;
  height: 20px;
  width: 20px;
  position: absolute;
  right: 0;
}

.menu-item {
  height: 50px;
  line-height: 50px;
  padding: 0px 20px;
  background: #ccc;
  display: inline-block;
}

.menu {
  background: #e5e4e4;
  height: 50px;
  text-align: left;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.aaa{
  height: 50px;
}
</style>
