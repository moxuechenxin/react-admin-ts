import React, { Component } from 'react'
import CfgTable from '@/components/_common/cfgTable'
import tableCfgMaker from './_consts/tableCfgMaker'
import CfgForm from './_thumbs/cfgForm'
import './index.scss'
import { Input, Button, Icon, Modal } from 'antd'
import { deleteBannerApi } from './api'

class Moudle_banner extends Component {
  constructor(props) {
    super(props)
    this.CfgTable = null
    this.state = {
      apiKeysMap: {
        // current: 'pageNum',
        // name: {
        //   value: 'oigo'
        // },
        pageSize: {
          innerKey: 'pageSize',
          value: 5
        }
      },
      imgUrl: '',
      imgVisible: false,
      visible: false,
      delVisible: false,
      delType: 'del', // del=>删除单条数据 dels=>删除多条数据
      rowItem: null,
      selectedRows: [],
      hasSelected: false
    }
    const tableCfg = tableCfgMaker(this)
    this.api = tableCfg.api
    this.columns = tableCfg.columns
    this.formData = null
    this.tableProps = {
      rowKey: 'id',
      rowSelection: {
        onChange: this.handleRowSelectChange.bind(this)
      }
    }
    this.formSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
  }

  // 表单提交回调函数
  handleSubmit () {
    this.onCancel()
    this.getData()
  }
  handleRowSelectChange (selectedRowKeys, selectedRows) {
    this.setState({
      hasSelected: selectedRowKeys.length > 0,
      selectedRows: selectedRows
    })
  }

  // 弹框相关 
  showModal = () => {
    this.setState({
      visible: true
    })
  }
  onCancel = () => {
    this.setState({
      visible: false
    })
  }

  // 查看图片
  imgScan = (imgUrl) => {
    this.setState({
      imgUrl: imgUrl,
      imgVisible: true
    })
  }
  closeImgModal = () => {
    this.setState({
      imgUrl: '',
      imgVisible: false
    })
  }
  
  // 新增数据
  addDataModal = () => {
    this.showModal()
    this.formData = null
  }

  // 编辑数据
  edtRowItem = (rowItem) => {
    this.showModal()
    this.formData = rowItem
  }

  // 删除弹框
  sureDel = () => {
    this.closeDelModal()
    if (this.state.delType === 'del') {
      this.delRowItem()
    } else {
      this.delRowItems()
    }
  }
  closeDelModal= () => {
    this.setState({
      delVisible: false
    })
  }
  // 删除数据
  delRow = (rowItem) => {
    let type = 'del'
    if (rowItem && rowItem.id) {
      type = 'del'
      this.setState({
        rowItem: rowItem
      })
    } else {
      type = 'dels'
    }
    this.setState({
      delVisible: true,
      delType: type
    })
  }
  delRowItem = () => {
    let id = this.state.rowItem.id
    return deleteBannerApi({
      ids: id + ''
    }).then(res => {
      this.setState({
        current: 1
      })
      this.getData()
    })
  }
  delRowItems = () => {
    let ids = this.state.selectedRows.map(item => {return item.id}).join(',')
    return deleteBannerApi({
      ids: ids
    }).then(res => {
      this.setState({
        hasSelected: false,
        selectedRows: [],
        current: 1
      })
      this.getData()
    })
  }

  // 请求数据
  getData = () => {
    this.CfgTable.getData()
  }

  render() {
    const state = this.state
    return (
      <div id="module-banner" >
        <div className="flex--center search-head">
          <div className="search-wrap">
            <span>搜索关键字:</span>
            <Input placeholder="请在此输入名称 / ID"/>
            <Button type="primary" style={{ marginLeft: '20px' }}>搜索</Button>
          </div>
          <div className="btn-wrap">
            <Button
              type="primary"
              onClick={ this.addDataModal }>
              新增
              <Icon type="plus" style={{ fontSize: 16 }} />
            </Button>
            <Button type="primary"
              onClick={this.delRow}
              disabled={!state.hasSelected}
              style={{ marginLeft: '10px' }}>批量删除</Button>
          </div>
        </div>
        <CfgTable
          ref={(Comp) => this.CfgTable = Comp}
          apiKeysMap={state.apiKeysMap}
          columns={this.columns}
          api={this.api}
          tableProps={this.tableProps}/>
        {/*  编辑新增数据弹框 */}
        <Modal
          title="新增BANNER"
          width="720px"
          visible={state.visible}
          onCancel={this.onCancel}
          footer={ null }>
          <CfgForm formSubmit={this.formSubmit} formData={this.formData}/>
        </Modal>
        {/*  删除提示弹框 */}
        <Modal
          title="提示"
          okText="确认"
          cancelText="取消"
          onOk={this.sureDel}
          visible={state.delVisible}
          onCancel={this.closeDelModal}>
          <div className="flex--center">
            <Icon type="exclamation-circle" className="danger-icon"/>
            <span>是否删除选中的Banner？</span>
          </div>
        </Modal>
        {/*  图片预览弹框 */}
        <Modal
          title="图片预览"
          width="500px"
          visible={state.imgVisible}
          onCancel={this.closeImgModal}
          footer={ null }>
          <div className="flex--center modal-scan-img">
            <img src={state.imgUrl} alt="" />
          </div>
        </Modal>
      </div>
    )
  }
}

export default Moudle_banner
