<template>

  <div class="leave-details">
    <span class="state" style=" background: url('./jujue.png');background-size: 100%;"></span>
    <h2>离职详情</h2>

    <div class="detail-item">
      <strong>姓名：</strong> 李宗辉
    </div>
    <div class="detail-item">
      <strong>岗位：</strong> 销售
    </div>
    <div class="detail-item">
      <strong>级别：</strong> 中等
    </div>
    <div class="detail-item">
      <strong>类型：</strong> 离职
    </div>
    <div class="detail-item">
      <strong>入职时间：</strong> 2023-01-01 10:00
    </div>
    <div class="detail-item">
      <strong>离职时间：</strong> 2024-01-01 19:30
    </div>
<!--    <div class="detail-item">-->
<!--      <strong>离职多久：</strong> 1年零8个月2天5时3分10秒560毫秒1234323微秒-->
<!--    </div>-->
    <div class="detail-item">
      <strong>申请时间：</strong> 2023-01-01 10:00
    </div>
    <p style="color: red">
      我们希望理由填真实理由，有助于我们改进，我们不会因为任何理由对你有什么看法
    </p>
    <div class="detail-item">
      <strong>离职理由：</strong> 拜拜
    </div>

    <!-- 操作按钮 -->
    <div class="operation-btns">
      <van-button type="primary" size="small">修改</van-button>
      <van-button type="info" size="small">提交</van-button>
      <van-button type="danger" size="small">删除</van-button>
    </div>

    <!-- 审批记录 -->
    <div class="approval-records">
      <h3>审批记录</h3>
      <div class="approval-item" v-for="(record, index) in approvalRecords" :key="index">
        <strong>审批人：</strong> {{ record.approver }}
        <span>{{ record.approveTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      approvalRecords: [ // 审批记录
        { approver: '贾伟', approveTime: '2024-03-02 09:30:29' },
        { approver: '审批人2', approveTime: '2024-03-03 10:30:20' },
        // 其他审批记录...
      ]
    };
  }
};
</script>

<style scoped>
.leave-details {
  padding: 20px;
}

.detail-item {
  margin-bottom: 15px;
  text-align: left;
}
.state {
  display: block;
  width: 60px;
  height: 60px;

  background-size: 100%;
  border: 1px solid red;
  border-radius: 50px;
  position: absolute;
  right: 30px;
}
van-button {
  background: #f1f5d4;
  color: #2f2f2f;
  padding: 10px;
  display: block;
  width: 100%;
  /* float: left; */
  margin-left: 1px;
}
.operation-btns {
  margin-top: 20px;
  text-align: center;
  display: flex;
}

.approval-records {
  margin-top: 20px;
}

.approval-item {
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ddd;
}

.approval-item:last-child {
  border-bottom: none;
}
</style>
