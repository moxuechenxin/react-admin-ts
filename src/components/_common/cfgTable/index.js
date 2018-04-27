import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

class CfgTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: [], // 表格数据列表
      current: 1,
      total: 0,
      pageSize: 10
    }
  }

  componentDidMount() {
    // 生成初始化查询参数
    this.queryParams = this.getQueryParams()
    // 监听参数变化，触发回调
    this.unwatchParams = this.$_watch('queryParams', this.handleParamsChange.bind(this))
    if (this.props.immediate) {
      this.init()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // 监听apiKeysMap变化，重置查询参数
    if (prevProps.apiKeysMap !== this.props.apiKeysMap) {
      this.queryParams = this.getQueryParams()
    }
  }

  init() {
    this.handleParamsChange()
  }
  
  // 请求参数格式转换
  convertParams(apiKeysMap = {}) {
    const state = this.state
    const queryParams = {}
    Object.keys(apiKeysMap).forEach(key => {
      const val = apiKeysMap[key]
      if (typeof val === 'object') {
        if (val.innerKey) {
          this.setState({
            [val.innerKey]: val.value
          })
        }
        queryParams[key] = val.value
      } else {
        queryParams[val] = state[key]
      }
    })
    return queryParams
  }

  // 获取查询参数
  getQueryParams() {
    return this.convertParams({
      current: 'current',
      pageSize: 'pageSize',
      ...this.props.apiKeysMap
    })
  }

  // 数据请求
  getData(queryParams) {
    const {requestFn, handleResponse} = this.props.api
    this.setState({
      loading: true
    })
    return requestFn(queryParams || this.queryParams).then((res) => {
      handleResponse(undefined, res, (mergeData) => {
        this.setState(mergeData)
      })
    }).catch((err) => {
      handleResponse(err)
    }).finally(() => {
      this.setState({
        loading: false
      })
    })
  }

  handleParamsChange(queryParams) {
    this.getData(queryParams)
  }

  render() {
    const props = this.props
    const state = this.state

    const pagination = {
      current: state.current,
      total: state.total,
      pageSize: state.pageSize,
      onChange: (page) => {
        this.setState({
          current: page
        })
        this.queryParams.current = page
      }
    }

    return (
      <Table 
        loading={state.loading}
        columns={props.columns} 
        dataSource={state.data} 
        pagination={pagination}
        {...props.tableProps}/>
    )
  }
}

CfgTable.propTypes = {
  // 列配置
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  // 搜索接口：{请求处理函数、响应处理函数}
  api: PropTypes.shape({
    requestFn: PropTypes.func, // 函数返回一个promise
    handleResponse: PropTypes.func // (err, res, setState)
  }).isRequired,
  // 传入的搜索接口字段配置
  apiKeysMap: PropTypes.object.isRequired,
  // Table组件的props(合并loading, columns, dataSource, pagination)
  tableProps: PropTypes.object,
  // 是否加载组件时立即调用请求
  immediate: PropTypes.bool
}
CfgTable.defaultProps = {
  immediate: true
}

export default CfgTable