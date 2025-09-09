import React, { useEffect, useRef, useState } from 'react'
import { createTaskApi } from '../../servers/project'
import {
  ProjectOutlined,
  PlusCircleOutlined,
  FormOutlined,
  PieChartOutlined,
  FundViewOutlined,
  UserOutlined,
  SolutionOutlined,
  TeamOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Layout,
  Menu,
  Row,
  Select,
  Slider,
  theme,
  notification
} from 'antd'
import { getMemberByProjectId, setArrProjectAll } from '../../store/actions/projectDetailAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faJira } from '@fortawesome/free-brands-svg-icons'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react'
import { useMediaQuery } from 'react-responsive'

import Swal from 'sweetalert2'
import { fetchStatusApi } from '../../servers/status'
import { fetchPriorityApi } from '../../servers/priority'
import { fetchTaskTypeApi } from '../../servers/tasktype'
import { setUserInfoAction } from '../../store/actions/userAction'

const HomeLayout = () => {
  const { Content, Footer, Sider } = Layout
  const { userInfo } = useSelector((state) => state.userReducer)
  const { arrProject } = useSelector((state) => state.projectDetailReducer)
  const { arrMember } = useSelector((state) => state.projectDetailReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [status, setStatus] = useState([])
  const [open, setOpen] = useState(false)
  const [priority, setPriority] = useState([])
  const [taskType, setTaskType] = useState([])

  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0
  })

  useEffect(() => {
    if (open) {
      if (!status.length) getStatusAll()
      if (!priority.length) getPriorityAll()
      if (!taskType.length) getTaskTypeAll()
      if (!arrProject?.length) getAllProjectList()
    }
  }, [open])

  const getAllProjectList = () => dispatch(setArrProjectAll())

  const getStatusAll = async () => {
    const result = await fetchStatusApi()
    setStatus(result.data.content)
  }

  const getPriorityAll = async () => {
    const result = await fetchPriorityApi()
    setPriority(result.data.content)
  }

  const getTaskTypeAll = async () => {
    const result = await fetchTaskTypeApi()
    setTaskType(result.data.content)
  }

  const [stateProjectId, setStateProjectId] = useState()
  const userOptions = arrMember?.map((item) => {
    return { label: item.name, value: item.userId }
  })
  const editoRef = useRef()

  const handleFinish = async (value) => {
    const data = {
      taskName: value.taskName,
      description: editoRef.current.getContent(),
      statusId: value.statusId,
      originalEstimate: value.originalEstimate,
      timeTrackingSpent: timeTracking.timeTrackingSpent,
      timeTrackingRemaining: timeTracking.timeTrackingRemaining,
      projectId: stateProjectId,
      typeId: value.typeId,
      priorityId: value.priorityId,
      listUserAsign: value.listUserAsign
    }

    try {
      await createTaskApi(data)
      Swal.fire({
        title: 'Tạo task thành công!',
        text: 'Hoàn tất!!',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      })
    } catch (error) {
      notification.error({
        message: error.response.data.content
      })
    }

    setOpen(false)
  }

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label
    }
  }

  const items = [
    getItem(
      'Project Manager',
      '1',
      <NavLink to='/jira/projectmanagement'>
        <PieChartOutlined />
      </NavLink>
    ),
    getItem(
      'User',
      'sub1',

      <SolutionOutlined />,

      [
        getItem(
          'My account',
          '2',
          <NavLink to='/jira/my-profile'>
            <UserOutlined />
          </NavLink>
        ),
        getItem(
          'User management',
          '3',
          <NavLink to='/jira/user'>
            <TeamOutlined />
          </NavLink>
        )
      ]
    ),
    getItem('Project', 'sub2', <ProjectOutlined />, [
      getItem(
        'Create project',
        '4',
        <NavLink to='/jira/createproject'>
          <PlusCircleOutlined />
        </NavLink>
      ),
      getItem(
        'View all project',
        '5',
        <NavLink to='/jira/projectmanagement'>
          <FundViewOutlined />
        </NavLink>
      )
    ]),

    getItem(
      'Create Task',
      '6',
      <NavLink onClick={() => showDrawer()}>
        <FormOutlined />
      </NavLink>
    )
  ]

  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const isMobile = useMediaQuery({ query: `(max-width:500px)` })

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('USER_INFO_KEY')
    dispatch(setUserInfoAction(null))
    navigate('/login')
  }
  return (
    <>
      <Layout
        style={{
          minHeight: '100vh'
        }}
      >
        <Sider breakpoint='lg' collapsedWidth={0} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className='demo-logo-vertical mt-4' style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to='/jira/projectmanagement' className='navbar-brand text-white'>
              <FontAwesomeIcon icon={faJira} className='mr-2' />
              Jira SoftWare
            </Link>
          </div>

          <div className='my-4' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
            <img style={{ borderRadius: '50%' }} src={userInfo.avatar} alt='' width={50} height={50} />
            <div>
              <p className='text-white' style={{ fontSize: '17px' }}>
                {userInfo.name}
              </p>
              <LogoutOutlined
                style={{ fontSize: '25px', cursor: 'pointer' }}
                onClick={handleLogout}
                className='text-white'
              />
            </div>
          </div>

          <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline' items={items} />
        </Sider>
        <Layout>
          {/* <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          /> */}
          <Content
            style={{
              margin: '0 16px'
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center'
            }}
          >
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
      <div>
        <Drawer
          title='Create Task'
          width={isMobile ? 360 : 700}
          onClose={onClose}
          open={open}
          bodyStyle={{
            paddingBottom: 80
          }}
        >
          <Form layout='vertical' onFinish={handleFinish}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name='projectId' label='Project'>
                  <Select
                    onChange={(value) => {
                      dispatch(getMemberByProjectId(value))
                      setStateProjectId(value)
                    }}
                  >
                    {arrProject.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item.id}>
                          {item.projectName}
                        </Select.Option>
                      )
                    })}
                  </Select>
                  <span className='font-weight-bold'>* You can only create tasks of your own projects!</span>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name='taskName'
                  label='Task name'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Task name'
                    }
                  ]}
                >
                  <Input placeholder='Task name' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name='statusId'
                  label='Status'
                  rules={[
                    {
                      required: true,
                      message: 'Please select an owner'
                    }
                  ]}
                >
                  <Select placeholder='Please select an owner'>
                    {status?.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item.statusId}>
                          {item.statusName}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={48}>
              <Col span={12}>
                <Form.Item
                  name='priorityId'
                  label='Priority'
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the approver'
                    }
                  ]}
                >
                  <Select placeholder='Please choose the approver'>
                    {priority?.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item.priorityId}>
                          {item.priority}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name='typeId'
                  label='Task Type'
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the type'
                    }
                  ]}
                >
                  <Select placeholder='Please choose the type'>
                    {taskType?.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item.id}>
                          {item.taskType}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={48}>
              <Col span={24}>
                <Form.Item
                  name='listUserAsign'
                  label='Assigners'
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the approver'
                    }
                  ]}
                >
                  <Select
                    mode='multiple'
                    options={userOptions}
                    style={{ width: '100%' }}
                    placeholder='select one country'
                    optionFilterProp='label'
                  ></Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Slider
                  // defaultValue={30}
                  tooltip={{ open: true }}
                  value={timeTracking.timeTrackingSpent}
                  max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)}
                />
                <div className='row mb-3'>
                  <div className='text-left col-6 font-weight-bold'>
                    {timeTracking.timeTrackingSpent} hour (s) spent
                  </div>
                  <div className='text-right col-6 font-weight-bold'>
                    {timeTracking.timeTrackingRemaining} hour (s) remaining
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <label>Total Estimated Hours</label>
                <InputNumber
                  size='middle'
                  min={0}
                  name='timeTrackingSpent'
                  max={100000}
                  defaultValue={0}
                  style={{ width: '100%' }}
                  onChange={(value) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: value
                    })
                  }}
                />
              </Col>
              <Col span={12}>
                <label>Hours spent</label>
                <InputNumber
                  size='middle'
                  min={0}
                  name='timeTrackingRemaining'
                  max={100000}
                  defaultValue={0}
                  style={{ width: '100%' }}
                  onChange={(value) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining: value
                    })
                  }}
                />
              </Col>
              <Col span={24}>
                <label>Original Estimate</label>
                <Form.Item name='originalEstimate'>
                  <InputNumber size='middle' min={0} max={100000} defaultValue={0} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label='Description'>
                  <Editor onInit={(evt, editor) => (editoRef.current = editor)} />
                </Form.Item>
              </Col>
            </Row>

            <div className='text-right'>
              <Button type='text' onClick={onClose}>
                Cancel
              </Button>
              <Button className='ml-2 mr-2' htmlType='reset'>
                Reset
              </Button>
              <Button htmlType='submit' type='primary'>
                Submit
              </Button>
            </div>
          </Form>
        </Drawer>
      </div>
    </>
  )
}
export default HomeLayout
