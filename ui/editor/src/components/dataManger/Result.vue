<template>
  <div class="result-table">
    <a-tabs v-model:activeKey="state.activeKey">
      <a-tab-pane
        key="queryResult"
        tab="查询结果"></a-tab-pane>
      <a-tab-pane
        key="historyQuery"
        tab="历史查询"
        force-render></a-tab-pane>
      <a-tab-pane
        key="saveQuery"
        tab="保存的查询"></a-tab-pane>
      <a-tab-pane
        key="historyExport"
        tab="历史导出"></a-tab-pane>
    </a-tabs>
    <a-table
      v-if="state.columns && state.columns.length"
      :columns="state.columns"
      :data-source="data"
      :scroll="{ y: 300, x: 1000 }"
      @resizeColumn="handleResizeColumn"
      :row-class-name="(_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)"
      :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
      :pagination="{ pageSizeOptions: ['10', '20', '50', '100', '200', '300', '400', '500', '1000'] }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'sqlText'">
          <a-tooltip>
            <template #title>{{ record.sqlText }}</template>
            <!-- {{ Palm.str.slicingStr(record.sqlText, 20, '...') }} -->
          </a-tooltip>
        </template>
        <template v-if="column.key === 'operation'">
          <!-- <span v-if="editableData[record.key]">
            <a-popconfirm
              title="确定修改?"
              @confirm="save(record.key)">
              <a-button
                type="text"
                primary
                size="small"
                >保存</a-button
              >
            </a-popconfirm>
            <a-popconfirm
              title="确定取消?"
              @confirm="cancel(record.key)">
              <a-button
                type="text"
                info
                size="small"
                >取消</a-button
              >
            </a-popconfirm>
          </span>
          <span v-else>
            <span @click="edit(record.key)">编辑</span>
          </span> -->
          <span
            class="mg-r10"
            span
            style="color: var(--info)"
            ><EditOutlined
          /></span>
          <a-popconfirm
            title="确定删除?"
            @confirm="confirm(record.id)">
            <span style="color: var(--danger)">
              <DeleteOutlined color="icon-color" />
            </span>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
    <!-- <div class="export">
      <a-button
        size="samll"
        class="mg-r5"
        type="primary"
        @click="Palm.urls.exportCsv"
        >导出选中</a-button
      >
      <a-button
        @click="out"
        size="samll"
        >导出全部</a-button
      >
    </div> -->
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, reactive, onMounted } from 'vue';
// import Palm from 'palmjs/dist';
import { Response } from '@/types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
const props = defineProps({
  data: {
    type: Array,
    default: [],
    required: true,
  },
});
// 初始化数据
const state = reactive({
  activeKey: 'queryResult',
  columns: [] as any,
  selectedRowKeys: [] as any,
});

onMounted(() => {
  if (props.data && props.data.length) {
    state.columns = [];
    let first = props.data[0] as any;
    for (let k in first) {
      state.columns.push({
        title: k,
        dataIndex: k,
        resizable: true,
        key: k,
        width: 100,
      });
    }
    console.log(state.columns, 'state.columns');
  }
});

console.time('test');

const onSelectChange = (selectedRowKeys: any[]) => {
  // console.log('selectedRowKeys changed: ', selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
};

function handleResizeColumn(w: any, col: any) {
  col.width = w;
}

onMounted(async () => {
  // getPageList();
});

// const getPageList = async () => {
//   let { data }: Response = await window.Bridge.invoke('plugin:sqlite|get_history_query_list', {
//     pageInfo: {
//       pageIndex: 1,
//       pageSize: 10,
//       params: {},
//     },
//     operationType: 2,
//   });
//   if (data && Array.isArray(data)) {
//     dataSource.value = data;
//   }
// };

const confirm = async (id: string) => {
  let { code, msg }: Response = await window.Bridge.invoke('plugin:sqlite|delete', {
    id: `${id}`,
    tbMark: 2,
  });
  // console.log(code, msg, data);
  if (code === 1) {
    // getPageList();
    message.success(msg);
  } else {
    message.error(msg);
  }
};

onBeforeMount(() => {
  state.columns.push({
    title: '操作',
    key: 'operation',
    fixed: 'right',
    align: 'center',
    width: 200,
  });
});

console.timeEnd('test');
</script>
<style lang="scss" scoped>
.result-table {
  width: calc(100vw - 400px);
  overflow: auto;
}
.export {
  bottom: 0;
  left: 0;
}
:deep(.ant-table-wrapper .ant-table-thead > tr > th),
:deep(.ant-table-wrapper tfoot > tr > th) {
  padding: 6px;
}
:deep(.ant-table-wrapper .ant-table-tbody > tr > td),
:deep(.ant-table-wrapper tfoot > tr > td) {
  padding: 3px 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:deep(.table-striped) td {
  background-color: #fafafa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
:deep(.table-striped) td {
  background-color: #ebf3fe;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
