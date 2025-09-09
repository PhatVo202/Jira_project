import { useContext, useEffect, useMemo, useState } from 'react'

import { AutoComplete, Input, Table, Avatar, Tag, Button, notification, Popover, Space, List, Tooltip } from 'antd'
import { deleteProjectApi, getAssignUserProjectApi, removeUserFromProjectApi } from '../../servers/project'
import { EditOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons'
import { fetchGetUserApi } from '../../servers/user'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteMemberAction,
  deleteProjectAction,
  filterProjectAction,
  setMemberInfoAction,
  setProjectListAction
} from '../../store/actions/projectDetailAction'
import { LoadingContext } from '../../contexts/loading/LoadingContext'
import { useMediaQuery } from 'react-responsive'

export default function ProjectManagement() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [userSearch, setUserSearch] = useState([])
  const listAllProject = useSelector((state) => state.projectDetailReducer)

  const [_, setLoadingState] = useContext(LoadingContext)

  const [pinCode, setPinCode] = useState('')

  useEffect(() => {
    const getAllProject = async () => {
      try {
        // setLoadingState({ isLoading: true })
        await dispatch(setProjectListAction())
      } catch (error) {
        console.error('Error fetching project list:', error)
      } finally {
        // setLoadingState({ isLoading: false })
      }
    }
    getAllProject()
  }, [])

  const isMobile = useMediaQuery({ query: `(max-width :624px)` })

  const columns = useMemo(() => [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: (id2, id1) => {
        return id2.id - id1.id
      },
      sortDirection: ['descend'],
      key: 1
    },
    {
      title: 'Project name',
      dataIndex: 'projectName',
      sorter: (a, b) => a.projectName.trim().localeCompare(b.projectName.trim()),
      sortDirection: ['descend'],
      key: 2,
      render: (text, record) => {
        return (
          <NavLink to={`/jira/projectdetail/${record.id}`} style={{ textDecoration: 'none' }}>
            {text}
          </NavLink>
        )
      },
      responive: ['sm']
    },
    {
      title: 'Category name',
      dataIndex: 'categoryName',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2
      },
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase()
        let categoryName2 = item2.categoryName?.trim().toLowerCase()
        if (categoryName2 < categoryName1) {
          return -1
        }
        return 1
      },
      sortDirection: ['descend'],
      key: 3
    },
    {
      title: 'Creator',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1
      },

      key: 4,
      render: (text) => {
        return <Tag color='green'>{text?.creator?.name}</Tag>
      }
    },
    {
      title: 'Members',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1
      },
      key: 5,
      render: (text) => {
        return (
          <div>
            {text?.members?.slice(0, 3).map((item, index) => {
              return (
                <Popover
                  placement='topLeft'
                  title={'Members'}
                  content={() => {
                    return (
                      <table className='table' key={index}>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Account</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{item.userId}</td>
                            <td>
                              <Avatar height={30} width={30} style={{ borderRadius: '50%' }} src={item.avatar} alt='' />
                            </td>
                            <td>{item.name}</td>
                            <td>
                              <CloseOutlined
                                onClick={async () => handleRemoveUser(text.id, item.userId)}
                                style={{
                                  backgroundColor: 'red',
                                  width: '30px',
                                  height: '30px',
                                  lineHeight: '30px',
                                  cursor: 'pointer',
                                  borderRadius: '50%',
                                  color: 'white',
                                  textAlign: 'center'
                                }}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )
                  }}
                  trigger='hover'
                >
                  <Avatar src={item.avatar}></Avatar>
                </Popover>
              )
            })}
            {text?.members?.length > 3 ? (
              <Popover
                placement='topLeft'
                title={'Members'}
                trigger='hover'
                content={() => {
                  return (
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Avatar</th>
                          <th>Account</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {text?.members?.slice(3, 100).map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.userId}</td>
                              <td>
                                <Avatar
                                  height={30}
                                  width={30}
                                  style={{ borderRadius: '50%' }}
                                  src={item.avatar}
                                  alt=''
                                />
                              </td>
                              <td>{item.name}</td>
                              <td>
                                <Space>
                                  <CloseOutlined
                                    onClick={async () => handleRemoveUser(text.id, item.userId)}
                                    style={{
                                      backgroundColor: 'red',
                                      width: '30px',
                                      height: '30px',
                                      lineHeight: '30px',
                                      cursor: 'pointer',
                                      borderRadius: '50%',
                                      color: 'white',
                                      textAlign: 'center'
                                    }}
                                  />
                                </Space>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  )
                }}
              >
                <Avatar>...</Avatar>
              </Popover>
            ) : (
              ''
            )}
            <Popover
              placement='bottomRight'
              title={'text'}
              content={() => {
                return (
                  <div>
                    <AutoComplete
                      style={{ width: '100%' }}
                      onSearch={search}
                      value={value}
                      options={userSearch.map((item, index) => {
                        return {
                          label: item.name,
                          value: item.userId.toString()
                        }
                      })}
                      onChange={(text) => {
                        setValue(text)
                      }}
                      onSelect={async (valueSelect, option) => {
                        setValue(option.label)
                        const data = {
                          projectId: text.id,
                          userId: valueSelect
                        }

                        try {
                          await getAssignUserProjectApi(data)
                          dispatch(setMemberInfoAction(valueSelect, text.id))
                        } catch (error) {
                          notification.error({
                            message: error.response.data.content
                          })
                        }
                      }}
                    />
                  </div>
                )
              }}
              trigger='click'
            >
              <Button style={{ borderRadius: '50%' }}>+</Button>
            </Popover>
          </div>
        )
      }
    },
    {
      title: 'Action',
      key: 6,
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1
      },
      render: (text) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                navigate(`/jira/edit/${text.id}`)
              }}
              style={{
                cursor: 'pointer',
                color: 'blue',
                width: '40px',
                height: '20px'
              }}
            />
            <DeleteOutlined
              onClick={async () => {
                try {
                  await deleteProjectApi(text.id)
                  dispatch(deleteProjectAction(text.id))
                  notification.success({
                    message: 'Xoá thành công!'
                  })
                } catch (error) {
                  notification.error({
                    message: error.response.data.content
                  })
                }
              }}
              style={{
                cursor: 'pointer',
                color: 'red',
                width: '40px',
                height: '20px'
              }}
            />
          </>
        )
      }
    }
  ])

  const search = async (value) => {
    const result = await fetchGetUserApi(value)
    setUserSearch(result.data.content)
  }

  //debounce search
  useEffect(() => {
    const getData = setTimeout(() => {
      if (pinCode === '') {
        dispatch(setProjectListAction())
      } else {
        dispatch(filterProjectAction(pinCode))
      }
    }, 200)
    return () => clearTimeout(getData)
  }, [pinCode])

  const handleRemoveUser = async (projectId, userId) => {
    const data = {
      projectId,
      userId
    }

    try {
      await removeUserFromProjectApi(data)
      dispatch(deleteMemberAction(projectId, userId))
      notification.success({
        message: 'Xoá user thành công!'
      })
    } catch (error) {
      notification.error({
        message: error.response.data.content
      })
    }
  }

  return (
    <>
      <div className='container py-5'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px'
          }}
        >
          <h3>Project</h3>
          <Button type='primary' onClick={() => navigate('/jira/createproject')}>
            Create Project
          </Button>
        </div>
        <div>
          <Input.Search
            size='large'
            className='mb-3'
            placeholder='Search here'
            enterButton
            onChange={(e) => setPinCode(e.target.value)}
          />

          {isMobile ? (
            <List
              pagination={('bottom', 'center')}
              dataSource={listAllProject.projectList}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <List.Item.Meta
                    avatar={
                      <div>
                        <p>ProjectName</p>
                        <p>Category Name</p>
                        <p>Creator</p>
                        <p>Members</p>
                        <p>Actions</p>
                      </div>
                    }
                    description={
                      <div className='text-center'>
                        <p>
                          <NavLink to={`/jira/projectdetail/${item.id}`}>{item.projectName}</NavLink>
                        </p>
                        <p>{item.categoryName}</p>
                        <p>
                          <Tag color='green'>{item.creator.name}</Tag>
                        </p>
                        <Avatar.Group
                          maxCount={2}
                          maxStyle={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                            cursor: 'pointer',
                            size: 'small'
                          }}
                        >
                          {item?.members?.map((member, index) => {
                            return (
                              <Tooltip title={member.name} key={index}>
                                <Avatar src={member.avatar} />
                              </Tooltip>
                            )
                          })}
                        </Avatar.Group>
                        <br />
                        <div>
                          <EditOutlined
                            onClick={() => {
                              navigate(`/jira/edit/${item.id}`)
                            }}
                            style={{
                              cursor: 'pointer',
                              color: 'blue',
                              width: '40px',
                              height: '20px'
                            }}
                          />
                          <DeleteOutlined
                            onClick={async () => {
                              try {
                                await deleteProjectApi(item.id)
                                dispatch(deleteProjectAction(item.id))
                                notification.success({
                                  message: 'Xoá thành công!'
                                })
                              } catch (error) {
                                notification.error({
                                  message: error.response.data.content
                                })
                              }
                            }}
                            style={{
                              cursor: 'pointer',
                              color: 'red',
                              width: '40px',
                              height: '20px'
                            }}
                          />
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Table columns={columns} dataSource={listAllProject.projectList} />
          )}
        </div>
      </div>
    </>
  )
}
