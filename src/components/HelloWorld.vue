<template>
  <div class="leave-calendar">
    <!-- 日历 -->
    <div class="calendar-container" style="font-size: 14px;text-align: left">
      <!-- 在这里放置日历组件 -->
      <van-calendar v-model="selectedDate" :min-date="minDate" :max-date="maxDate"  />
      说明：<br>
      1、在下面如实填写日期，假种，时间，理由；已批准，只能管理员可以删除，假期除紧急情况，必须要提前1天申请，否则不批准，病假必须要提供相关医疗证明。修改只能修改一次，谨慎操作<br>
      2、两个批准同时变为已批准才可以请假<br>
      3、不忙时，一天以内请假，前一个批准找组长审批，后一个自动变为已批准；忙时或者 超过2天，后一个批准需<br>
      要更高領㝵批准
    </div>

<!--    &lt;!&ndash; 请假列表 &ndash;&gt;-->
<!--    <div class="leave-list">-->
<!--      <div style="display: ruby-text;text-align: left;"><strong>姓名：</strong>小明  <strong>月份：</strong><h2>3月</h2>-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</div>-->
<!--      <van-card v-for="(leave, index) in leaveList" :key="index" class="leave-card">-->

<!--        <div class="state">{{ leave.approvalStatus }}</div>-->
<!--        <div class="leave-details">-->
<!--          <div><strong>请假类型：</strong>{{ leave.leaveType }}</div>-->
<!--          <div><strong>请假原因：</strong>{{ leave.reason }}</div>-->
<!--          <span class="leave-date">-->
<!--          <div><strong>日期：</strong>{{ leave.date }}</div>-->
<!--          <div><strong>开始：</strong>{{ leave.startTime }}</div>-->
<!--          <div><strong>结束：</strong>{{ leave.endTime }}</div>-->
<!--          </span>-->
<!--        </div>-->
<!--        <div class="botton">-->
<!--          &lt;!&ndash; 操作按钮 &ndash;&gt;-->
<!--          <van-button type="primary" @click="editLeave(leave)">编辑</van-button>-->
<!--          <van-button type="danger" @click="deleteLeave(leave)">删除</van-button>-->
<!--        </div>-->
<!--      </van-card>-->
<!--    </div>-->


    <div class="leave-list">
      <div style="display: ruby-text;text-align: left;margin-top: -22px;">小明  <h2>3月</h2>-----------------------------------</div>
      <van-card v-for="(leave, index) in leaveList" :key="index" class="leave-card">

        <table>
          <tr >
            <td width="30%">{{ leave.date }}
            <br>  {{ leave.startTime }} - {{ leave.endTime }}
            </td>
            <td  width="10%" style="color: red">
              {{ leave.leaveType }}
            </td>
            <td width="15%">8小时</td>
<!--            <td width="10%">{{ leave.startTime }}</td>-->
<!--            <td width="10%">{{ leave.endTime }}</td>-->
            <td :style="leave.bg+'background-position: left;background-size: 40%;background-repeat: no-repeat;'" width="40%">{{ leave.reason }}</td>
            <td width="5%" style="font-size: 18px;font-weight: 600;background: #ccc;border-radius: 0;">删除</td>
          </tr>
        </table>
<!--        <div class="botton">-->
<!--          &lt;!&ndash; 操作按钮 &ndash;&gt;-->
<!--          <van-button type="primary" @click="editLeave(leave)">编辑</van-button>-->
<!--          <van-button type="danger" @click="deleteLeave(leave)">删除</van-button>-->
<!--        </div>-->
      </van-card>
    </div>

    <!--  增加请假数据  -->
    <div class="leave-add">
      <span>新增</span>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: new Date(), // 当前选择的日期
      minDate: new Date(), // 最小可选日期
      maxDate: new Date(), // 最大可选日期
      leaveList: [ // 请假列表数据示例
        {
          date: '2024-05-10',
          bg:'background:url("./jujue.png");',
          person: '小明',
          startTime: '09:00',
          endTime: '17:00',
          leaveType: '年假',
          reason: '家里有急事家里有急事家里有急事家里有急事家里有急事',
          submitStatus: '已提交',
          modifyTime: '2024-05-09 14:30',
          approvalStatus: '待审批'
        },{
          date: '2024-05-10',
          startTime: '09:00',
          bg:'background:url("./daishenpi.png");',
          person: '小子',
          endTime: '17:00',
          leaveType: '年假',
          reason: '家里有急事',
          submitStatus: '已提交',
          modifyTime: '2024-05-09 14:30',
          approvalStatus: '待审批'
        },{
          date: '2024-05-10',
          startTime: '09:00',
          bg:'background:url("./yitongguo.png");',
          person: '小黄',
          endTime: '17:00',
          leaveType: '年假',
          reason: '家里有急事',
          submitStatus: '已提交',
          modifyTime: '2024-05-09 14:30',
          approvalStatus: '待审批'
        },
        // 其他请假条目...
      ]
    };
  },
  methods: {
    editLeave(leave) {
      // 编辑请假条目的逻辑
      console.log('编辑请假条目', leave);
    },
    deleteLeave(leave) {
      // 删除请假条目的逻辑
      console.log('删除请假条目', leave);
    }
  }
};
</script>

<style scoped>
.leave-calendar {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 30px;
}
.calendar-container {
  padding: 5px 30px;
}
.calendar-container {
  flex: 1;
}
.leave-add {
  height: 50px;
  padding: 0px 30px;
  //background: #4CAF50;

  color: #fff;
  font-size: 19px;
  line-height: 50px;
  display: flex;
}
.calendar-container {
  //border: 2px solid #000;
}

table, th, td {
  //border: 1px solid #c4c4c4;
  border-collapse: collapse;
  background: #fcfdf6;
  border-radius: 5px;
  overflow: hidden;
}
span.leave-date {
  display: flex;
  padding: 0px;
}
.leave-add span {
  padding: 10px;
  background: #fcfdf6;
  line-height: 35px;
  color: #2c3d50;
//text-align: left;
  box-shadow: 0 2px 4px rgb(203 203 203 / 25%);
  width: 100%;
}
.leave-list {
  padding:10px 30px;
}
.leave-details div {
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  padding-top: 10px;
}
.leave-card {
  margin-bottom: 10px;
}
.leave-card {
  //margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(203 203 203 / 25%);
  background-color: #ffffff;
  display: block;
}

van-button {
  text-align: center;
  display: block;
  width: 100%;
}
.botton {
  background: #e6e6e6;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  display: flex;
  color: #2f2f2f;
  justify-content: center;
}

.leave-card > div {
  margin-bottom: 10px;
}

.leave-card > div:last-child {
  margin-bottom: 0;
}

.leave-card .operation-btns {
  display: flex;
  justify-content: flex-end;
}

.leave-card .operation-btns van-button {
  margin-left: 10px;
}
.state {
  display: flex;
  background: #8BC34A;
  border-radius: 50%;
  height: 60px;
  width: 55px;
  color: #fff;
  line-height: 60px;
  text-align: center;
  padding-left: 5px;
  position: absolute;
  right: 30px;
  margin-top: 10px;
}
</style>
