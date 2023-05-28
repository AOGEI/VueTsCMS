<template>
  <div class="countcard">
    <div class="header">
      <span class="title">{{ title }}</span>
      <el-tooltip :content="tips" placement="top" effect="light">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span v-if="props.amount === 'saleroom'" style="color: red">￥</span>
      <span ref="countOneRef">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span>{{ subtitle }}</span>
      <span v-if="props.amount === 'saleroom'" style="color: red">￥</span>
      <span ref="countTwoRef">{{ number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CountUp } from 'countup.js'
import { onMounted, ref } from 'vue'
interface IProps {
  amount?: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
}
//给props默认数据
const props = withDefaults(defineProps<IProps>(), {
  title: '商品总销量',
  tips: '所有商品总销量',
  number1: 509989,
  number2: 509989,
  subtitle: '商品总销量'
})

//创建CountUp的实例对象
const countOneRef = ref<HTMLElement>()
const countTwoRef = ref<HTMLElement>()
//参数一：执行动画的元素
//参数二：数字增加到指定参数
//参数三：动画的其他配置
onMounted(() => {
  const countUpOne = new CountUp(countOneRef.value!, props.number1, {})
  const countUpTwo = new CountUp(countTwoRef.value!, props.number2, {})

  //开始执行
  countUpOne.start()
  countUpTwo.start()
})
</script>

<style lang="less" scoped>
.countcard {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  background-color: white;
  height: 130px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  .header {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    align-items: center;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
    flex: 1;
  }
  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    //字体间距
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
