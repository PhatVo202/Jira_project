import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button, Form, Input, notification } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { useMediaQuery } from 'react-responsive'
import { loginApi } from '../../servers/user'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfoAction } from '../../store/actions/userAction'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.userReducer)

  const onFinish = async (values) => {
    const data = {
      email: values.email,
      passWord: values.passWord
    }

    try {
      const result = await loginApi(data)

      localStorage.setItem('USER_INFO_KEY', JSON.stringify(result.data.content))
      dispatch(setUserInfoAction(result.data.content))

      Swal.fire({
        title: 'Đăng nhập thành công',
        text: `Xin chào ${userState.userInfo.name}`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      })

      navigate('/jira/projectmanagement')
    } catch (error) {
      notification.error({
        message: error.response.data.message
      })
    }
  }

  const isMobile = useMediaQuery({ query: `(max-width:767px)` })
  return (
    <div>
      <div className={!isMobile ? 'container-xl' : 'container'}>
        {!isMobile && (
          <div className='row'>
            <div className='col-md-6 col-lg-7 col-xl-6'>
              <div>
                <img
                  src='./img/bglogin.png'
                  alt=''
                  style={isMobile ? { display: 'none' } : { width: '100%', height: '100vh', objectFit: 'cover' }}
                />
              </div>
            </div>
            <div
              className='col-12 col-md-6 col-lg-5 col-xl-6'
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div>
                <h1 className='text-center text-primary pl-5 mb-5'>Login</h1>
                <Form
                  name='basic'
                  labelCol={{
                    span: 8
                  }}
                  wrapperCol={{
                    span: 16
                  }}
                  style={{
                    maxWidth: 600
                  }}
                  initialValues={{
                    remember: true
                  }}
                  onFinish={onFinish}
                  autoComplete='off'
                >
                  <Form.Item
                    label='Email '
                    name='email'
                    rules={[
                      {
                        required: true,
                        message: 'Email is required!'
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label='Password'
                    name='passWord'
                    rules={[
                      {
                        required: true,
                        message: 'Password is required!'
                      }
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16
                    }}
                  >
                    <Button style={{ width: '190px' }} size='large' type='primary' htmlType='submit'>
                      Submit
                    </Button>
                  </Form.Item>
                  <p>
                    Don't have an account yet?{' '}
                    <Link style={{ textDecoration: 'none' }} to='/register' className='text-primary'>
                      Register now
                    </Link>
                  </p>
                </Form>
                <div className='text-center'>
                  <button
                    className='mr-2'
                    style={{
                      backgroundColor: 'rgb(59, 89, 152)',
                      height: '42px',
                      width: '42px',
                      color: 'white',
                      borderRadius: '50%',
                      border: 'none',
                      outline: 'none',
                      boxShadow: '1px 1px 9px rgb(136 136 136) '
                    }}
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </button>
                  <button
                    style={{
                      backgroundColor: 'rgb(24 144 255)',
                      height: '42px',
                      width: '42px',
                      color: 'white',
                      borderRadius: '50%',
                      border: 'none',
                      boxShadow: '1px 1px 9px rgb(136 136 136) ',
                      outline: 'none'
                    }}
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isMobile && (
          <div style={{ overflow: 'hidden', height: '100vh' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '100px'
              }}
            >
              <h1 className='text-center text-primary mb-5'>Login</h1>
              <Form
                name='basic'
                labelCol={{
                  span: 8
                }}
                wrapperCol={{
                  span: 16
                }}
                initialValues={{
                  remember: true
                }}
                onFinish={onFinish}
                autoComplete='off'
              >
                <Form.Item
                  label='Email '
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: 'Email is required!'
                    }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label='Password'
                  name='passWord'
                  rules={[
                    {
                      required: true,
                      message: 'Password is required!'
                    }
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16
                  }}
                >
                  <Button style={{ width: '190px' }} size='large' type='primary' htmlType='submit'>
                    Submit
                  </Button>
                </Form.Item>
                <p>
                  Don't have an account yet?{' '}
                  <Link style={{ textDecoration: 'none' }} to='/register' className='text-primary'>
                    Register now
                  </Link>
                </p>
              </Form>
              <div className='text-center'>
                <button
                  className='mr-2'
                  style={{
                    backgroundColor: 'rgb(59, 89, 152)',
                    height: '42px',
                    width: '42px',
                    color: 'white',
                    borderRadius: '50%',
                    border: 'none',
                    outline: 'none',
                    boxShadow: '1px 1px 9px rgb(136 136 136) '
                  }}
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </button>
                <button
                  style={{
                    backgroundColor: 'rgb(24 144 255)',
                    height: '42px',
                    width: '42px',
                    color: 'white',
                    borderRadius: '50%',
                    border: 'none',
                    boxShadow: '1px 1px 9px rgb(136 136 136) ',
                    outline: 'none'
                  }}
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
