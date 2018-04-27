import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Row, Col, Upload, message, Icon } from 'antd'
import { addBannerApi, updateBannerApi } from '../../api'

const FormItem = Form.Item
const beforeUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJPG && isLt2M
}

class BasicForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      uploadUrl: null,
      isDelImg: false,
      uploadDisabled: false
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.formData) {
      this.setState({
        uploadDisabled: true
      })
    } else {
      this.setState({
        uploadDisabled: false
      })
    }
    this.setState({
      isDelImg: false
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = values
        if (this.props.formData && this.props.formData.id) {
          data.imgUrl = this.state.uploadUrl || this.props.formData.imgUrl
          data.id = this.props.formData.id
          return updateBannerApi(data).then(res => {
            console.log(res, 'res')
            if (res.code === 200) {
              message.success(res.message)
              this.props.formSubmit() 
              this.props.form.resetFields()
              this.setState({
                uploadUrl: null
              })
            } else {
              message.error(res.message)
            }
          })
        } else {
          if (this.state.uploadUrl) {
            data.imgUrl = this.state.uploadUrl
            return addBannerApi(data).then(res => {
              if (res.code === 200) {
                message.success(res.message)
                this.props.formSubmit()
                this.props.form.resetFields()
                this.setState({
                  uploadUrl: null
                })
              } else {
                message.error(res.message)
              }
            })
          } else {
            message.error('必须上传图片')
          }
        }
      }
    })
  }
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return;
    }
    if (info.file.status === 'done') {
      let response = info.file.response || {}
      let content = response.content || ''
      this.setState({
        uploadUrl: content,
        loading: false,
        isDelImg: false,
        uploadDisabled: true
      })
    }
  }

  testSortNum = (rule, value, callback) => {
    if (value && (!/^([1-9]\d{0,2}|1000)$/.test(value))) {
      callback('排序为1-1000的数字!')
    } else {
      callback()
    }
  }

  delImg = (e) => {
    e.preventDefault();
    this.setState({
      isDelImg: true,
      uploadUrl: null,
      uploadDisabled: false
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const state = this.state
    const formData = this.props.formData || {}
    const formItems = [{
      colSpan: 16,
      label: '名称',
      modal: 'name',
      placeholder: '请输入名称',
      initialValue: formData.name,
      rules: [{
        required: true, message: '请输入名称'
      }, {
        max: 30, message: '名称最长30个字符' 
      }]
    }, {
      colSpan: 8,
      label: '排序',
      modal: 'sortNum',
      placeholder: '请输入1-1000之间的数字',
      initialValue: formData.sortNum,
      rules: [{
        required: true, message: '请输入排序'
      }, {
        validator: this.testSortNum
      }]  
    }]
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text"></div>
      </div>
    )
    const imageUrl = this.state.uploadUrl || formData.imgUrl
    const editImg = (
      <div>    
        <Icon type='close' style={{float: 'right', fontSize: '18px'}} onClick={this.delImg}/>
        <img src={imageUrl} alt="" style={{width: '118px', height: '118px'}}/>
      </div>
    )

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={24}>
        {
          formItems.map((item, index) => {
            return (
              <Col span={item.colSpan} key={index}>
                <FormItem
                  label={item.label}>
                  {getFieldDecorator(item.modal, {
                    initialValue: item.initialValue,
                    rules: item.rules,
                  })(
                    <Input placeholder={item.placeholder}/>
                  )}
                </FormItem>
              </Col>
            )
          })
        }
       </Row>
       <Row>
          <Col span={14}>
            <FormItem label="封面图" className="is-required">
              <div className="flex">
                <div>
                  <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="/api/file"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                    disabled={state.uploadDisabled}
                  >
                    {(imageUrl && !state.isDelImg) ? editImg : uploadButton}
                  </Upload> 
                </div>
                <ul style={{marginLeft: '20px'}}>
                  <li>1、图片大小不能超过1MB</li>
                  <li>2、仅支持jpg／png两种格式</li>
                  <li>3、仅支持jpg／png两种格式</li>
                </ul>
              </div>              
            </FormItem>
          </Col>
       </Row>
       <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <FormItem>
              <Button className="btn" type="primary" htmlType="submit">提交</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>   
    )
  }
}
const CfgForm = Form.create()(BasicForm)
CfgForm.propTypes = {
  // 列配置
  formSubmit: PropTypes.func,
  formData: PropTypes.object
}
export default CfgForm