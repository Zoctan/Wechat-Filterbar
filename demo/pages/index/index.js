// 获取应用实例
const app = getApp()

Page({
  data: {

  },
  onFilterConfirm(e) {
    console.log('筛选 => ', e.detail.selectedArray)
  },
  onMultiChange(e) {
    console.log('多项筛选 => ', e.detail.selectedArray)
  }
})