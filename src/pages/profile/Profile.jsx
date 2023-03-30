import { Avatar, Button, Form, Input, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../components/header/Header";
import { editUser } from "../../servers/user";

export default function Profile() {
  const navigate = useNavigate();
  const userhookState = useSelector((state) => state.userReducer);
  const [form] = useForm();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    form.setFieldsValue({
      id: userhookState?.userInfo?.id,
      email: userhookState?.userInfo?.email,
      name: userhookState?.userInfo?.name,
      phoneNumber: userhookState?.userInfo?.phoneNumber,
    });
  };

  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleFinish = async (value) => {
    const data = {
      id: value.id,
      email: value.email,
      name: value.name,
      phoneNumber: value.phoneNumber,
      passWord: value.passWord,
    };

    await editUser(data);
    Swal.fire({
      title: "Cập nhật thành công!",
      text: "Hoàn tất!!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
    navigate("/projectmanagement");
  };
  return (
    <div>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-5">
            <Avatar
              style={{ width: "300px", height: "300px" }}
              src={userhookState?.userInfo?.avatar}
            />
          </div>
          <div className="col-7">
            <Form
              form={form}
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="vertical"
              initialValues={{
                size: componentSize,
              }}
              onFinish={handleFinish}
              onValuesChange={onFormLayoutChange}
              size={componentSize}
              style={{
                maxWidth: 1000,
              }}
            >
              <Form.Item
                label=" Id"
                name="id"
                rules={[
                  {
                    required: true,
                    message: "Email is required!",
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="Phone number" name="phoneNumber">
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="passWord">
                <Input />
              </Form.Item>

              <div style={{ textAlign: "right" }}>
                <Space className="my-5">
                  <Button>Cancel</Button>
                  <Button htmlType="submit" type="primary">
                    Update
                  </Button>
                </Space>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
