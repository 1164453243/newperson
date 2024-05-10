<template>

  <div id="app">
    <a-calendar>
      <ul slot="dateCellRender" slot-scope="value" class="events">
        <li v-for="item in getListData(value)" :key="item.content">
          <a-badge :status="item.type" :text="item.content" />
        </li>
      </ul>

      <template slot="monthCellRender" slot-scope="value">
        <div v-if="getMonthData(value)" class="notes-month">
          <section>{{ getMonthData(value) }}</section>
          <span>Backlog number</span>

        </div>

      </template>

    </a-calendar>
    <p class="rl-p">
      说明:<br/>
      1、在下面如实填写目期，假种，时间，理由;已批准，只能管理员可以删除，假期除紧急情况，必须要提前1天申请，否则不批准,病假必须要提供相关医疗证明。修改只能修改一次，谨慎操作<br/>
      2、两个批准同时变为已批准才可以请假<br/>
      3、不忙时，一天以内请假，前一个批准找组长审批，后一个自动变为已批准，忙时或者 超过2天，后一个批准需要更高领导批准<br/>
    </p>
    <p class="title" style="font-size: 16px;font-weight: 600;text-align: left">小明3月</p>
    <a-table :columns="columns" :data-source="dataSource" bordered>
      <!--    <a-table :columns="columns" :data-source="dataSource" :slot="col" bordered>-->
      <template slot="type" slot-scope="text, record" >
        <div>
<!--          <a-input v-model="record.type" v-if="record.editable" @change="handleChange($event, index, 'type')" />-->
          <a-select v-model="record.type" v-if="record.editable" style="width: 100px;">
            <a-select-option value="病假">病假</a-select-option>
            <a-select-option value="事假">事假</a-select-option>
            <a-select-option value="年假">年假</a-select-option>
          </a-select>
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="startTime" slot-scope="text, record">
        <div>
<!--          <a-input v-model="record.startTime" v-if="record.editable" @change="handleChange($event, index, 'startTime')" />-->
          <a-date-picker v-model="record.startTime" v-if="record.editable" format="YYYY-MM-DD HH:mm:zz"></a-date-picker>
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="endTime" slot-scope="text, record">
        <div>
<!--          <a-input v-model="record.endTime" v-if="record.editable" @change="handleChange($event, index, 'endTime')" />-->
          <a-date-picker v-model="record.endTime" v-if="record.editable" format="YYYY-MM-DD HH:mm:zz"></a-date-picker>
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="hours" slot-scope="text, record, index">
        <div>
          <a-input-number v-model="record.hours" v-if="record.editable" @change="handleChange($event, index, 'hours')" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="reason" slot-scope="text, record, index">
        <div style="width: 200px;">
          <a-textarea v-model="record.reason" v-if="record.editable" @change="handleChange($event, index, 'reason')" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template #status="{ text, record }">
        <div>
          <span v-if="record.editable">{{ text }}</span>
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="approver1"  slot-scope=" text, record ">
        <div>
          <ul style="width: 200px;">
            <li v-for="(item,index) in record.approver1" :key="index" v-html="item"></li>
          </ul>
        </div>
      </template>
<!--      <template #approver2="{ text, record, index }">-->
<!--        <div>-->
<!--          <a-input v-model="record[col]" v-if="record.editable" @change="handleChange($event, index, 'approver2')" />-->
<!--          <template v-else>-->
<!--            {{ text }}-->
<!--          </template>-->
<!--        </div>-->
<!--      </template>-->
      <!--      <template #actions="{ text, record, index }">-->
      <!--        <a-button type="link" v-if="record.editable" @click="save(index)">保存</a-button>-->
      <!--        <a-button type="link" v-else @click="edit(index)">Edit</a-button>-->
      <!--      </template>-->
      <template slot="actions" slot-scope="text, record">
        <div class="editable-row-operations">
        <span style="padding: 10px;    width: 120px;display: block;" v-if="record.editable">
          <a  @click="() => save(record.id)">保存</a>
          <a-popconfirm title="是否取消?" @confirm="() => cancel(record.id)">
            <a style="margin-left: 10px">取消</a>
          </a-popconfirm>
        </span>
          <span v-else>
          <a :disabled="editingKey !== ''" @click="() => edit(record.id)">编辑</a>
          <a style="margin-left: 10px" :disabled="editingKey !== ''" @click="() => edit(record.id)">提交</a>
        </span>
        </div>
      </template>
      <template slot="approval" slot-scope="text, record" >
        <div style="width: 190px;display: flex">
        <a-button type="primary" @click="approve(record.id)">通过</a-button>
        <a-button style="margin-left: 10px;" type="danger" @click="reject(record.id)">拒绝</a-button>
        </div>
      </template>
    </a-table>

    <p class="title">
    <span @click="add()">新增请假</span>
    <span style="margin-left: 30px" to="">新增离职</span>
    </p>
    <!-- 底部流白   -->

    <div style="height: 80px"></div>
  </div>

</template>
<script>
//时间选择器
import moment from 'moment';
// import { defineComponent } from 'vue';
import { defineComponent } from 'vue';
import { Table, Button, Input, Select, DatePicker, Tooltip } from 'ant-design-vue';

export default defineComponent({
  components: {
    'a-table': Table,
    'a-button': Button,
    'a-input': Input,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-date-picker': DatePicker,
    'a-tooltip': Tooltip
  },
  data() {
    return {
      dataSource: [
        { id: 1, type: '病假', startTime: '2024-05-01 01:15', endTime: '2024-05-02 01:15', hours: 16, reason: '感冒发烧', status: '待审批', approver1: ["张三->通过 2024-01-03 12:12","李四->通过 2024-01-03"] ,editable : true},
        { id: 2, type: '事假', startTime: '2024-06-01 01:15', endTime: '2024-06-02 01:15', hours: 8, reason: '家里有急事', status: '已批准', approver1: ["张三->通过 2024-01-03 12:12","李四->拒绝 2024-01-03"] }

      ],
      editingKey: '',
      columns: [
        { title: '类型', dataIndex: 'type', key: 'type',scopedSlots: { customRender: 'type' }},
        { title: '请假开始时间', dataIndex: 'startTime', key: 'startTime' ,scopedSlots: { customRender: 'startTime' }},
        { title: '请假结束时间', dataIndex: 'endTime', key: 'endTime',scopedSlots: { customRender: 'endTime' } },
        { title: '时长', dataIndex: 'hours', key: 'hours' ,scopedSlots: { customRender: 'hours' }},
        { title: '理由', dataIndex: 'reason', key: 'reason',scopedSlots: { customRender: 'reason' } },
        { title: '单据状态', dataIndex: 'status', key: 'status' },
        { title: '审批人记录', dataIndex: 'approver1', key: 'approver1' ,scopedSlots:{ customRender: 'approver1' } },
        // { title: '审批人2', dataIndex: 'approver2', key: 'approver2' },
        { title: '操作', key: 'actions' ,scopedSlots: { customRender: 'actions' } },
        { title: '审批操作', key: 'approval',scopedSlots: { customRender: 'approval' }  }
      ]
    };
  },
  methods: {
    moment,
    onChange(dates, dateStrings) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    },
    edit(record) {
      console.log(record)
      // 编辑操作
      const newData = [...this.dataSource];
      const target = newData.find(item => record === item.id);
      this.editingKey = record;
      if (target) {
        target.editable = true;
        this.dataSource = newData;
      }
    },
    approve(record) {
      // 批准操作
      console.log(record)
    },
    add() {
      // 新增操作
      // console.log(record)
      this.dataSource.push({editable : true});
    },
    reject(record) {
      // 拒绝操作
      console.log(record)
    },
    save(record) {
      // 保存操作
      console.log(record)
    },
    cancel(key) {
      //取消操作
      const newData = [...this.dataSource];
      const target = newData.find(item => key === item.id);
      console.log(target)
      this.editingKey = '';
      if (target) {
        // Object.assign(target, this.cacheData.find(item => key === item.id));
        delete target.editable;
        this.dataSource = newData;
      }
    },
    editItem(index) {
      console.log(index)
      // 编辑项目逻辑
    },
    deleteItem(index) {
      console.log(index)
      // 删除项目逻辑
    },
    getListData(value) {
      let listData;
      switch (value.date()) {
        case 8:
          listData = [
            { type: 'warning', content: 'This is warning event.' },
            { type: 'success', content: 'This is usual event.' },
          ];
          break;
        case 10:
          listData = [
            { type: 'warning', content: 'This is warning event.' },
            { type: 'success', content: 'This is usual event.' },
            { type: 'error', content: 'This is error event.' },
          ];
          break;
        case 15:
          listData = [
            { type: 'warning', content: 'This is warning event' },
            { type: 'success', content: 'This is very long usual event。。....' },
            { type: 'error', content: 'This is error event 1.' },
            { type: 'error', content: 'This is error event 2.' },
            { type: 'error', content: 'This is error event 3.' },
            { type: 'error', content: 'This is error event 4.' },
          ];
          break;
        default:
      }
      return listData || [];
    },

    getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    },
  },
});
</script>
<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
#app{
  background: #FAFAF1;
  width: 90%;
  margin: 0 auto;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.km_list {
  display: block;
  padding: 10px;
  //width: 80%;
  //margin: 0 auto;
}
.title{
  font-size: 16px;
  font-weight: 600;
  text-align: left;

  padding-left: 10px;
}

/*.km_list td{*/
/*   //padding: 10px;*/
/*}*/
/*.km_list th{*/
/*  text-align: left;*/
/*}*/
.edit-input {
  border: none;
  outline: none;
  background-color: transparent;
  font-size: inherit;
  padding: 0;
  margin: 0;
  width: auto;
}
.rl-p{
  text-align: left;
  padding: 20px;
  background: #c6c5c5;
  //width: 80%;
  //margin: 0 auto;
  font-weight: 600;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
</style>
