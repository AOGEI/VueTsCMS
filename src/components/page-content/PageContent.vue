<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig.header?.title ?? '数据列表' }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">{{
        contentConfig.header?.btnTitle ?? '新建部门'
      }}</el-button>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'handler'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  type="primary"
                  icon="Edit"
                  size="small"
                  text
                  @click="handleEditBtnClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="isDelete"
                  type="danger"
                  icon="Delete"
                  size="small"
                  text
                  @click="handleDeleteBtnClick(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot
                  :name="item.slotName"
                  v-bind="scope"
                  :prop="item.prop"
                  age="18"
                ></slot>
              </template>
            </el-table-column>
          </template>

          <template v-else>
            <el-table-column align="center" v-bind="item"></el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        small
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'
import usePermissions from '@/hooks/usePermissions'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}

const props = defineProps<IProps>()
//.定义新建用户事件
const emit = defineEmits(['newClick', 'editClick'])

//获取用户是否有对应的增删改查权限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

//分页使用的变量
const currentPage = ref(1)
const pageSize = ref(10)
const systemStore = useSystemStore()
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})

fetchPageListData()
//2.获取userlist数据，进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

//3.底部分页
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

//4.定义函数，用于方便发送网络请求
function fetchPageListData(formData: any = {}) {
  //没有权限直接退出
  if (!isQuery) return

  //1.获取offset和size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  //2.发起网络请求(forData用于接收查询组件传来的数据)
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

//5.删除数据的操作
function handleDeleteBtnClick(id: number) {
  //1.删除所选用户
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
  //2.刷新用户列表
}

//6.新建和编辑用户的操作
function handleNewUserClick() {
  emit('newClick')
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}
//把网络请求函数暴露出去,以便在User.vue使用
defineExpose({ fetchPageListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: aliceblue;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
  .title {
    font-size: 22px;
  }
}
.table {
  .el-button {
    padding: 5px 8px;
    margin-left: 0;
  }
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
