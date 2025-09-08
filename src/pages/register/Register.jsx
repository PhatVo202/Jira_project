import React from 'react'
import { Button, Form, Input, notification } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { useMediaQuery } from 'react-responsive'
import { registerApi } from '../../servers/user'
import Swal from 'sweetalert2'

export default function Register() {
  const navigate = useNavigate()
  const handleFinish = async (values) => {
    const data = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      passWord: values.passWord,
      email: values.email
    }

    try {
      await registerApi(data)

      Swal.fire({
        title: 'Đăng ký thành công!',
        text: 'Hoàn tất!!',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      })

      navigate('/login')
    } catch (error) {
      notification.error({
        message: error.response.data.message
      })
    }
  }

  const isMobile = useMediaQuery({ query: `(max-width: 767px)` })
  return (
    <div>
      <div className={!isMobile ? 'container-xl' : 'container'}>
        {!isMobile && (
          <div className='row'>
            <div className='col-md-6 col-lg-7 col-xl-6 '>
              <div>
                <img
                  style={isMobile ? { display: 'none' } : { width: '100%', height: '100vh', objectFit: 'cover' }}
                  src='./img/bgregister1.png'
                  alt=''
                />
              </div>
            </div>
            <div
              className='col-12 col-md-6 col-lg-5 col-xl-6 '
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <div>
                <h1 className='text-primary text-center mb-5 pl-5'>Register</h1>
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
                    remember: true,
                    name: '',
                    email: '',
                    phoneNumber: '',
                    passWord: ''
                  }}
                  onFinish={handleFinish}
                  autoComplete='off'
                >
                  <Form.Item label='Name ' name='name'>
                    <Input placeholder='name' />
                  </Form.Item>

                  <Form.Item label='Email' name='email'>
                    <Input placeholder='email' />
                  </Form.Item>

                  <Form.Item label='Phone' name='phoneNumber'>
                    <Input placeholder='phone' />
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
                    <Input.Password placeholder='passWord' />
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
                    Already have an account?{' '}
                    <Link style={{ textDecoration: 'none' }} to='/login' className='text-primary'>
                      Login now
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
          <div
            style={{
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <div>
              <h1 className='text-primary text-center mb-5 pl-5'>Register</h1>
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
                  remember: true,
                  name: '',
                  email: '',
                  phoneNumber: '',
                  passWord: ''
                }}
                onFinish={handleFinish}
                autoComplete='off'
              >
                <Form.Item label='Name ' name='name'>
                  <Input placeholder='name' />
                </Form.Item>

                <Form.Item label='Email' name='email'>
                  <Input placeholder='email' />
                </Form.Item>

                <Form.Item label='Phone' name='phoneNumber'>
                  <Input placeholder='phone' />
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
                  <Input.Password placeholder='passWord' />
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
                  Already have an account?{' '}
                  <Link style={{ textDecoration: 'none' }} to='/login' className='text-primary'>
                    Login now
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
