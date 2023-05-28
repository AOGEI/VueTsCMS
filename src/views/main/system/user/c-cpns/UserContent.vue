<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick"
        >新建用户</el-button
      >
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <!-- <el-table-column prop="date" label="Date" width="180" /> 内容例子-->
        <el-table-column type="selection" width="50px" align="center" />
        <el-table-column
          type="index"
          label="序号"
          width="60px"
          align="center"
        />

        <el-table-column
          label="用户名"
          prop="name"
          width="150px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="真实姓名"
          prop="realname"
          width="140px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="手机号码"
          prop="cellphone"
          width="140px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="状态"
          prop="enable"
          width="100px"
          align="center"
        >
          <!-- 作用域插槽 -->
          <template #default="scope">
            <el-button
              size="small"
              :type="scope.row.enable ? 'primary' : 'danger'"
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createAt" align="center">
          <template #default="scope">{{
            formatUTC(scope.row.createAt)
          }}</template>
        </el-table-column>
        <el-table-column label="更新时间" prop="updateAt" align="center">
          <template #default="scope">{{
            formatUTC(scope.row.updateAt)
          }}</template>
        </el-table-column>

        <el-table-column label="操作" width="150px" align="center">
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
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        small
        layout="total, sizes, prev, pager, next, jumper"
        :total="userTotalCount"
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
//.定义新建用户事件
const emit = defineEmits(['newClick', 'editClick'])

//用户权限判断
const isCreate = usePermissions('users:create')
const isDelete = usePermissions('users:delete')
const isUpdate = usePermissions('users:update')
const isQuery = usePermissions('users:query')

//分页使用的变量
const currentPage = ref(1)
const pageSize = ref(10)

//1.使用systemStore，发起action，请求userlist数据
const systemStore = useSystemStore()
// systemStore.postUsersListAction({ offset: 1, size: 15 })
fetchUserListData()

//2.获取userlist数据，进行展示
const { usersList, userTotalCount } = storeToRefs(systemStore)

//3.底部分页
function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}

//4.定义函数，用于方便发送网络请求
function fetchUserListData(forData: any = {}) {
  if (!isQuery) return
  //1.获取offset和size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * 10
  const pageInfo = { size, offset }

  //2.发起网络请求(forData用于接收查询组件传来的数据)
  const queryInfo = { ...pageInfo, ...forData }
  systemStore.postUsersListAction(queryInfo)
}

//5.删除数据的操作
function handleDeleteBtnClick(id: number) {
  //1.删除所选用户
  systemStore.deleteUserByIdAction(id)
  //2.刷新用户列表
  //fetchUserListData()
}

//6.新建和编辑用户的操作
function handleNewUserClick() {
  emit('newClick')
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}
//把网络请求函数暴露出去,以便在User.vue使用
defineExpose({ fetchUserListData })
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
