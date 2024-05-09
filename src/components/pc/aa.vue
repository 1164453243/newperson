<template>
  <div>
    <a-table :columns="columns" :data-source="dataSource" bordered>
<!--    <a-table :columns="columns" :data-source="dataSource" :slot="col" bordered>-->
      <template slot="type" slot-scope="text, record, index" >
        <div>
          <a-input v-model="record.type" v-if="record.editable" @change="handleChange($event, index, 'type')" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="startTime" slot-scope="text, record, index">
        <div>
          <a-input v-model="record.startTime" v-if="record.editable" @change="handleChange($event, index, 'startTime')" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="endTime" slot-scope="text, record, index">
        <div>
          <a-input v-model="record.endTime" v-if="record.editable" @change="handleChange($event, index, 'endTime')" />
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
        <div>
          <a-input v-model="record.reason" v-if="record.editable" @change="handleChange($event, index, 'reason')" />
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
      <template #approver1="{ text, record, index }">
        <div>
          <a-input v-model="record[col]" v-if="record.editable" @change="handleChange($event, index, 'approver1')" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template #approver2="{ text, record, index }">
        <div>
          <a-input v-model="record[col]" v-if="record.editable" @change="handleChange($event, index, 'approver2')" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
<!--      <template #actions="{ text, record, index }">-->
<!--        <a-button type="link" v-if="record.editable" @click="save(index)">保存</a-button>-->
<!--        <a-button type="link" v-else @click="edit(index)">Edit</a-button>-->
<!--      </template>-->
      <template slot="actions" slot-scope="text, record">
        <div class="editable-row-operations">
        <span style="padding: 10px" v-if="record.editable">
          <a  @click="() => save(record.id)">保存</a>
          <a-popconfirm title="是否取消?" @confirm="() => cancel(record.id)">
            <a style="margin-left: 10px">取消</a>
          </a-popconfirm>
        </span>
          <span v-else>
          <a :disabled="editingKey !== ''" @click="() => edit(record.id)">编辑</a>
        </span>
        </div>
      </template>
      <template slot="approval" slot-scope="text, record">
        <a-button type="primary" @click="approve(record.id)">通过</a-button>
        <a-button type="danger" @click="reject(record.id)">取消</a-button>
      </template>
    </a-table>
<!--    <a-button v-if="true" type="link" @click="edit(record)">编辑</a-button>-->
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Table, Button, Select, DatePicker, Input, InputNumber } from 'ant-design-vue';

export default defineComponent({
  components: {
    'a-table': Table,
    'a-button': Button,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-date-picker': DatePicker,
    'a-input': Input,
    'a-input-number': InputNumber
  },
  data() {

    return {

      dataSource: [
        { id: 1, type: '病假', startTime: '2024-05-01', endTime: '2024-05-02', hours: 16, reason: '感冒发烧', status: '待审批', approver1: '张三', approver2: '李四' ,editable : true},
        { id: 2, type: '事假', startTime: '2024-06-01', endTime: '2024-06-02', hours: 8, reason: '家里有急事', status: '已批准', approver1: '王五', approver2: '赵六' }

      ],
      editingKey: '',
      columns: [
        { title: '请假类型', dataIndex: 'type', key: 'type',scopedSlots: { customRender: 'type' }},
        { title: '请假开始时间', dataIndex: 'startTime', key: 'startTime' ,scopedSlots: { customRender: 'startTime' }},
        { title: '请假结束时间', dataIndex: 'endTime', key: 'endTime',scopedSlots: { customRender: 'endTime' } },
        { title: '请假小时数', dataIndex: 'hours', key: 'hours' ,scopedSlots: { customRender: 'hours' }},
        { title: '原因', dataIndex: 'reason', key: 'reason',scopedSlots: { customRender: 'reason' } },
        { title: '单据状态', dataIndex: 'status', key: 'status' },
        { title: '审批人1', dataIndex: 'approver1', key: 'approver1' },
        { title: '审批人2', dataIndex: 'approver2', key: 'approver2' },
        { title: '操作', key: 'actions' ,scopedSlots: { customRender: 'actions' } },
        { title: '审批操作', key: 'approval',scopedSlots: { customRender: 'approval' }  }
      ]
    };
  },
  methods: {
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
    deleteItem(record) {
      console.log(record)

      // 删除操作
    },
    approve(record) {
      console.log(record)

      // 批准操作
    },
    reject(record) {
      console.log(record)

      // 拒绝操作
    },
    cancel(key) {
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

    save(record) {
      console.log(record)

      // 保存编辑操作
    },
    updateValue(dataIndex) {
      return (value) => {
        this.save(dataIndex, value);
      };
    }
  }
});
</script>
