import { Modal, Input, Table, Button, Form, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/header/Header";

import {
  filterData,
  setUserManagementAction,
} from "../../store/actions/userManagementAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { deleteUser, editUser } from "../../servers/user";

export default function UserManagement() {
  const [form] = useForm();
  const [values, setValues] = useState({});
  const userList = useSelector((state) => state.userManagementReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    getUserList();
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

  return (
    <div>
      <Header />
      <div className="container py-5">
        <Button>Create User</Button>
        <div>
          <Input.Search
            placeholder="Search here"
            enterButton
            onSearch={handleSearch}
            onChange
          />
          <Table columns={columns} dataSource={userList.listUser} />
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
