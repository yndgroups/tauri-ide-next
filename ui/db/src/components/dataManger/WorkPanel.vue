<template>
  <div class="palm-sql-editor">
    <div class="palm-codemirror">
      <div ref="sqlEditor"></div>
    </div>
    <div class="actions">
      <RadioGroup
        size="small"
        v-model:value="state.action">
        <RadioButton
          class="my-btn"
          value="run"
          @click="actionHandler('run')">
          <span class="actions-btn">运行选中 </span><CaretRightOutlined />
        </RadioButton>
        <RadioButton
          class="my-btn"
          value="runAll"
          @click="actionHandler('runAll')">
          <span class="actions-btn">运行全部 </span><ForwardOutlined />
        </RadioButton>
        <RadioButton
          value="stop"
          class="my-btn"
          @click="actionHandler('stop')">
          <span class="actions-btn">停止 </span><StepForwardOutlined
        /></RadioButton>
        <RadioButton
          value="formatter"
          class="my-btn"
          @click="actionHandler('formatter')">
          <span class="actions-btn">美化SQL </span>
          <ReconciliationOutlined></ReconciliationOutlined
        ></RadioButton>
        <RadioButton
          value="explain"
          class="my-btn"
          @click="actionHandler('explain')">
          <span class="actions-btn">解释 </span><ReconciliationOutlined></ReconciliationOutlined
        ></RadioButton>
        <RadioButton
          value="saveChecked"
          class="my-btn"
          @click="actionHandler('saveChecked')">
          <span class="actions-btn">保存选中 </span><SaveOutlined></SaveOutlined
        ></RadioButton>
        <RadioButton
          value="saveAll"
          class="my-btn"
          @click="actionHandler('saveAll')">
          <span class="actions-btn">保存所有 </span><DeliveredProcedureOutlined></DeliveredProcedureOutlined
        ></RadioButton>
      </RadioGroup>
    </div>
    <!-- 显示结果区域 -->
    <div>
      <DisplayError
        v-if="state.showErrorText"
        :errText="state.errText" />
      <Result
        v-else-if="state.data && state.data.length"
        :data="state.data" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { format } from 'sql-formatter';
import { reactive, ref, onMounted } from 'vue';
import { ForwardOutlined, CaretRightOutlined, DeliveredProcedureOutlined, StepForwardOutlined, ReconciliationOutlined, SaveOutlined } from '@ant-design/icons-vue';
import { message, RadioButton, RadioGroup } from 'ant-design-vue';
import { PalmEditor, LanguageType, Themes } from 'palm-editor';
// import Palm from 'palmjs/dist';
import Result from './Result.vue';
import DisplayError from './DisplayError.vue';
import { testLink } from '@tauri-apps/plugin-mysql';
import { Response } from '@/types';
const sqlEditor = ref();
const state = reactive({
  action: '',
  startLineNumber: 0,
  startColumn: 0,
  endLineNumber: 0,
  endColumn: 0,
  sqlText: 'SELECT * FROM ynd_common.sys_menu',
  errText: '',
  showErrorText: false,
  data: [] as any,
});

let editor: any = {};

onMounted(() => {
  editor = new PalmEditor(sqlEditor.value, state.sqlText, {
    view: {
      height: '200px',
      placeholder: '请输入',
      change: (val: string) => {
        console.log(val, '值改变执行');
      },
      extensions: [],
      theme: Themes.basicLight,
    },
    state: {},
    languageType: LanguageType.sql,
  });
  // console.log(editor, 'editor');
});

async function executeSql() {
  let sql = editor.getSelection();
  if (!sql) {
    message.warning('请选择要执行的sql');
    return;
  }
  let { code, data, msg }: Response = await window.Bridge.invoke('plugin:mysql|execute_sql', {
    sql: sql,
  });
  if (code !== 1) {
    state.errText = data && data.length > 0 ? data[0] : msg || [];
    state.showErrorText = true;
    state.data = [];
  } else {
    state.errText = '';
    state.showErrorText = false;
    state.data = data;
  }
}

// 执行动作
const actionHandler = async (action: any) => {
  const key = 'updatable';
  state.action = action;
  switch (action) {
    case 'run':
      executeSql();
      break;
    case 'runAll':
      console.log(state.sqlText);
      message.success({ content: '运行全部', key: key });
      break;
    case 'stop':
      message.success({ content: '停止', key: key });
      break;
    case 'formatter':
      // "bigquery" | "db2" | "db2i" | "hive" | "mariadb" | "mysql" | "n1ql" | "plsql"
      // "postgresql" | "redshift" | "singlestoredb" | "snowflake" | "spark" | "sql"
      // "sqlite" | "transactsql" | "trino" | "tsql"
      let checkedSql = editor.getSelection();
      console.log(checkedSql, 'checkedSql');
      let sql = format(checkedSql, {
        language: 'mysql',
        tabWidth: 2,
        // keywordCase: 'upper',
        linesBetweenQueries: 2,
      });
      console.log(sql);
      editor.replaceSelection(sql);
      break;
    case 'explain':
      message.success({ content: '解释', key: key });
      break;
    case 'saveChecked':
      let cs = editor.getSelection();
      if (!cs) {
        message.error({ content: '请选择要保存的sql', key: key });
        return;
      }
      console.log(cs);
      let { code, msg }: Response = await window.Bridge.invoke('plugin:sqlite|save_history', {
        data: {
          id: 0,
          title: '1',
          sqlText: '1',
          linkName: '1',
          dbName: '1',
          createTime: '1',
          updateTime: '1',
        },
      });
      if (code === 1) {
        message.success(msg);
      } else {
        message.error(msg);
      }
      break;
    case 'saveAll':
      console.log(state.sqlText);
      message.success({ content: '保存所有', key: key });
      break;
  }
  setTimeout(() => {
    state.action = '';
  }, 100);
};
/***
editor.setValue(newValue)
editor.getValue()
editor.onDidChangeModelContent((val)=>{ //监听值的变化  })
editor.getAction('editor.action.formatDocument').run() //格式化代码
editor.dispose()    //销毁实例
editor.onDidChangeOptions　　//配置改变事件
editor.onDidChangeLanguage　　//语言改变事件
 */
</script>
<style scoped lang="scss">
.palm-codemirror {
  height: 200px;
  overflow-x: hidden;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}
#sql-editor {
  min-height: 200px;
  height: 50%;
  border: 1px solid var(--color-border);
}
.actions {
  text-align: left;
  padding: 10px 0;

  &-btn {
    font-size: 14px;
    font-weight: normal;
  }
}
.palm-sql-editor {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
}
.my-btn {
  pointer-events: all;
  user-select: none;
}
</style>
import { log } from 'console';
