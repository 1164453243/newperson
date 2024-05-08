<template>
  <div class="layout">


    <!-- 右侧员工列表 -->
    <div class="employee-list">
<!--      &lt;!&ndash; 公告栏 &ndash;&gt;-->
<!--      <div class="announcement">-->
<!--        <h4>公告栏</h4>-->
<!--        <p>这里是一些重要的公告信息...</p>-->
<!--      </div>-->
      <!-- 动态 -->
      <div class="recent-employees">
        <h3>动态</h3>
        <ul>
          <li v-for="(employee, index) in recentEmployees" :key="index">
            <router-link :to="{ name: 'home', params: { id: employee.id }}">{{ employee.name }}</router-link>
          </li>
        </ul>
      </div>
      <div class="line"></div>
      <!-- 所有员工 -->
      <div  class="all-employees">
        <h3  >所有</h3>
        <ul>
          <li v-for="(employee, index) in allEmployees" :key="index">
            <router-link :to="{ name: 'home', params: { id: employee.id }}">{{ employee.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"users",
  data() {
    return {
      menuItems: ['申请'], // 左侧菜单项
      recentEmployees: [ // 最近入职员工
        { id: 1, name: '张三' },
        { id: 2, name: '李四' },
        { id: 3, name: '王五' },
      ],
      allEmployees: [ // 所有员工
        { id: 4, name: '赵六' },
        { id: 5, name: '钱七' },
        { id: 6, name: '孙八' },
        // 其他员工...
      ]
    };
  }
};
</script>

<style scoped>
.layout {
  display: flex;
  height: 100%;
  width: 100%;
  position: fixed;
}
h3 {
  text-align: left;
  Clear: both;
}
li {
  display: block;
  padding: 3px;
  float: left;
}
.menu {
  width: 15%;
  background-color: #f0f0f0;
  padding: 20px;
  /*position: fixed;*/
  height: 100%;
}

.menu-items {
  margin-bottom: 20px;
}

.menu-item {
  margin-bottom: 10px;
  cursor: pointer;
}

.announcement {
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.employee-list {
  flex: 1;
  padding: 20px;
}

.recent-employees,
.all-employees {
  margin-bottom: 20px;
}

.recent-employees h3,
.all-employees h3 {
  margin-bottom: 10px;
}

.recent-employees ul,
.all-employees ul {
  padding-left: 20px;
}

.recent-employees li,
.all-employees li {
  margin-bottom: 5px;
}
</style>
