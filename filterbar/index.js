Component({
  properties: {
    twoStageDataLeft: {
      type: Object,
      value: {}
    },
    radioData: {
      type: Object,
      value: {}
    },
    sortData: {
      type: Object,
      value: {}
    },
    filterData: {
      type: Object,
      value: {}
    },
    top: {
      type: String,
      value: ''
    }
  },
  data: {
    twoStage: false,
    radio: false,
    sort: false,
    filter: false,
    twoStageDataRight: [],
    twoStageSelectedLeft: {},
    twoStageSelectedRight: '',
    radioSelected: '0',
    sortSelected: '0',
    filterSelected: [],
    // 返回筛选下来的参数对象数组
    selectedArray: []
  },
  methods: {
    // 二级激活
    onTwoStageActive(e) {
      this.setData({
        twoStage: !this.data.twoStage,
        radio: false,
        sort: false,
        filter: false
      })
    },
    // 单选激活
    onRadioActive(e) {
      this.setData({
        twoStage: false,
        radio: !this.data.radio,
        sort: false,
        filter: false
      })
    },
    // 排序激活
    onSortActive(e) {
      this.setData({
        twoStage: false,
        radio: false,
        sort: !this.data.sort,
        filter: false
      })
    },
    // 筛选激活
    onFilterActive(e) {
      this.setData({
        twoStage: false,
        radio: false,
        sort: false,
        filter: !this.data.filter
      })
    },

    // 向数组添加唯一参数（小程序没有集合set对象）
    addUnique2Array(array, args) {
      const _args = args.target ? args.target.dataset : args
      const value = _args.group.value + ':' + _args.item.value
      const label = _args.group.label + ':' + _args.item.label
      let flag = false
      for (let i = 0; i < array.length; i++) {
        const group = value.split(':')[0]
        const arrayGroup = array[i].value.split(':')[0]
        // 找到该组
        if (arrayGroup === group) {
          array[i].value = value
          array[i].label = label
          flag = true
        }
      }
      if (!flag) {
        array.push({
          value: value,
          label: label
        })
      }
    },

    // 二级左栏
    onTwoStageLeft(e) {
      const selectedItemValue = e.target.dataset.item.value
      const selectedItemLabel = e.target.dataset.item.label
      const rightData = e.target.dataset.item.children
      this.setData({
        twoStageDataRight: rightData ? rightData : '',
        twoStageSelectedLeft: {
          value: selectedItemValue,
          label: selectedItemLabel
        },
        twoStageSelectedRight: '',
      })
      if (rightData == null || rightData.length == 0) {
        this.closeFilter()
        this.addUnique2Array(this.data.selectedArray, e)
        this.triggerEvent('filter', {
          selectedArray: this.data.selectedArray
        })
      }
    },
    // 二级右栏
    onTwoStageRight(e) {
      const selectedGroupValue = e.target.dataset.group.value
      const selectedGroupLabel = e.target.dataset.group.label
      const selectedItemValue = e.target.dataset.item.value
      const selectedItemLabel = e.target.dataset.item.label
      this.closeFilter()
      this.setData({
        twoStageSelectedRight: selectedItemValue
      })
      this.addUnique2Array(this.data.selectedArray, {
        group: {
          value: selectedGroupValue,
          label: selectedGroupLabel
        },
        item: {
          value: this.data.twoStageSelectedLeft.value + ':' + selectedItemValue,
          label: this.data.twoStageSelectedLeft.label + ':' + selectedItemLabel
        }
      })
      this.triggerEvent('filter', {
        selectedArray: this.data.selectedArray
      })
    },
    // 单选
    onRadio(e) {
      this.closeFilter()
      this.setData({
        radioSelected: e.target.dataset.item.value
      })
      this.addUnique2Array(this.data.selectedArray, e)
      this.triggerEvent('filter', {
        selectedArray: this.data.selectedArray
      })
    },
    // 排序
    onSort(e) {
      this.closeFilter()
      this.setData({
        sortSelected: e.target.dataset.item.value
      })
      this.addUnique2Array(this.data.selectedArray, e)
      this.triggerEvent('filter', {
        selectedArray: this.data.selectedArray
      })
    },
    // 筛选
    onFilter(e) {
      this.addUnique2Array(this.data.filterSelected, {
        group: {
          value: e.target.dataset.group.value,
          label: e.target.dataset.group.label
        },
        item: {
          value: e.target.dataset.item.value,
          label: e.target.dataset.item.label
        }
      })
      this.setData({
        filterSelected: this.data.filterSelected
      })
      this.addUnique2Array(this.data.selectedArray, e)
      this.triggerEvent('filter', {
        selectedArray: this.data.selectedArray
      })
    },

    // 关闭筛选
    closeFilter() {
      this.setData({
        twoStage: false,
        radio: false,
        sort: false,
        filter: false,
      })
    },
  }
})