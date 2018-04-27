import React from 'react'
import { getBannerApi } from '../api'
import { Switch, Icon } from 'antd'

export default (vm) => ({
  api: {
    requestFn(reqParams) {
      return getBannerApi(reqParams).then(data => {
        return data
      })
    },
    handleResponse(err, res, setState) {
      if (!err) {
        let content = res.content || {}
        content.list.map((item, index) => {
          return item.key = index
        })
        const list = content.list || []
        const total = content.total || 0
        setState({
          data: list,
          total
        })
      }
    }
  },
  columns: [{
    title: '排序',
    dataIndex: 'sortNum',
    align: 'center',
    width: '20%'
  }, {
    title: '名称',
    dataIndex: 'name',
    align: 'center',
    width: '22%'
  }, {
    title: '封面图',
    dataIndex: 'imgUrl',
    width: '25%',
    align: 'center',
    render(text, record) {
      const imageUrl = record.imgUrl
      return (
        <div className="scan-img">
          <div className="img-wrap flex--center">
            <img src={imageUrl} alt="" className="cover-img"/>
          </div>
          <div className="scan-wrap flex--center">
            <Icon type="search" className="scan-icon" onClick={(e) => vm.imgScan(imageUrl)}/>
          </div>
        </div>
      )
    }
  }, {
    title: '操作',
    align: 'center',
    width: '25%',
    render: (text, record) => {
      return (
        <div className='edit-wrap'>
          <span className='btn-span' onClick={(e) => vm.edtRowItem(record)}>编辑</span>
          <span className='btn-span' onClick={(e) => vm.delRow(record)}>删除</span>
          <Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
        </div>
      )  
    }
  }]
})