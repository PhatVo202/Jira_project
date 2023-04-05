import {
  Modal,
  Input,
  Table,
  Button,
  Form,
  notification,
  Avatar,
  Tooltip,
  List,
  Breadcrumb,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header/Header";

import {
  filterData,
  setUserManagementAction,
} from "../../store/actions/userManagementAction";
import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { deleteUser, editUser } from "../../servers/user";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { LoadingContext } from "../../contexts/loading/LoadingContext";

export default function UserManagement() {
  const [form] = useForm();
  const [_, setLoadingState] = useContext(LoadingContext);
  const [values, setValues] = useState({});
  const userList = useSelector((state) => state.userManagementReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setLoadingState({ isLoading: true });
    }, 200);
    getUserList();
    setTimeout(() => {
      setLoadingState({ isLoading: false });
    }, 2000);
  }, []);
  const [modal2Open, setModal2Open] = useState(false);
  const getUserList = async () => {
    dispatch(setUserManagementAction());
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "1",
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "2",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "3",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "4",
    },
    {
      title: "Action",
      key: "5",
      render: (text) => {
        return (
          <div>
            <EditOutlined
              style={{ color: "blue", fontSize: "17px", cursor: "pointer" }}
              onClick={() => {
                setValues({
                  userId: text.userId,
                  name: text.name,
                  phoneNumber: text.phoneNumber,
                  email: text.email,
                });
                form.setFieldsValue({
                  userId: text.userId,
                  name: text.name,
                  phoneNumber: text.phoneNumber,
                  email: text.email,
                });
                setModal2Open(true);
              }}
            />

            <DeleteOutlined
              onClick={async () => {
                try {
                  await deleteUser(text.userId);
                  notification.success({
                    message: "Xoá thành công!",
                  });
                  dispatch(setUserManagementAction("", text.userId));
                } catch (error) {
                  notification.error({
                    message: error.response.data.content,
                  });
                }
              }}
              style={{
                color: "red",
                marginLeft: "20px",
                fontSize: "17px",
                cursor: "pointer",
              }}
            />
          </div>
        );
      },
    },
  ];

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleFinish = async (value) => {
    const data = {
      id: value.userId,
      name: value.name,
      phoneNumber: value.phoneNumber,
      email: value.email,
      passWord: value.passWord,
    };
    try {
      await editUser(data);
      notification.success({
        message: "Cập nhật thành công!",
      });
      setModal2Open(false);
      dispatch(setUserManagementAction(data, ""));
    } catch (error) {
      notification.error({
        message: error.response.data.content,
      });
    }
  };

  const handleSearch = (keyword) => {
    dispatch(filterData(keyword));
  };

  const isMobile = useMediaQuery({ query: `(max-width: 624px)` });

  return (
    <div>
      <Header />
      <div className="container py-5">
        <Breadcrumb
          className="py-3"
          items={[
            {
              title: <NavLink to="/projectmanagement">Project</NavLink>,
            },
            {
              title: (
                <>
                  <UserOutlined />
                  <span>User Management</span>
                </>
              ),
            },
          ]}
        />
        <div>
          <Input.Search
            className="mb-3"
            size="large"
            placeholder="Search here"
            enterButton
            onSearch={handleSearch}
            onChange
          />
          {isMobile ? (
            <List
              pagination={("bottom", "center")}
              dataSource={userList.listUser}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <List.Item.Meta
                    avatar={
                      <div>
                        <p>Name</p>
                        <p> User ID</p>
                        <p>Email</p>
                        <p>Phone Number</p>
                        <p>Actions</p>
                      </div>
                    }
                    description={
                      <div className="text-center">
                        <p>{item.name}</p>
                        <p>{item.userId}</p>
                        <p>{item.email}</p>
                        <p>{item.phoneNumber}</p>
                        <Avatar.Group
                          maxCount={2}
                          maxStyle={{
                            color: "#f56a00",
                            backgroundColor: "#fde3cf",
                            cursor: "pointer",
                            size: "small",
                          }}
                        >
                          {item?.members?.map((member, index) => {
                            return (
                              <Tooltip title={member.name} key={index}>
                                <Avatar src={member.avatar} />
                              </Tooltip>
                            );
                          })}
                        </Avatar.Group>
                        <div>
                          <EditOutlined
                            style={{
                              color: "blue",
                              fontSize: "17px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setValues({
                                userId: item.userId,
                                name: item.name,
                                phoneNumber: item.phoneNumber,
                                email: item.email,
                              });
                              form.setFieldsValue({
                                userId: item.userId,
                                name: item.name,
                                phoneNumber: item.phoneNumber,
                                email: item.email,
                              });
                              setModal2Open(true);
                            }}
                          />
                          <DeleteOutlined
                            onClick={async () => {
                              try {
                                await deleteUser(item.userId);
                                notification.success({
                                  message: "Xoá thành công!",
                                });
                                dispatch(
                                  setUserManagementAction("", item.userId)
                                );
                              } catch (error) {
                                notification.error({
                                  message: error.response.data.content,
                                });
                              }
                            }}
                            style={{
                              color: "red",
                              marginLeft: "20px",
                              fontSize: "17px",
                              cursor: "pointer",
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
            <Table columns={columns} dataSource={userList.listUser} />
          )}
        </div>
      </div>
      <Modal
        footer={null}
        title="Edit User"
        centered
        open={modal2Open}
        onCancel={() => setModal2Open(false)}
      >
        <Form
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onFinish={handleFinish}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item label="Id" name="userId">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Phone Number" name="phoneNumber">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="passWord">
            <Input />
          </Form.Item>

          <div className="text-right">
            <Button htmlType="submit" type="primary">
              Update
            </Button>
            <Button className="ml-2" onClick={() => setModal2Open(false)}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
