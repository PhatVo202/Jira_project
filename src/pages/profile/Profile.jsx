import {
  Avatar,
  Breadcrumb,
  Button,
  Form,
  Input,
  Space,
  notification,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editUser, loginApi } from "../../servers/user";
import { setUserInfoAction } from "../../store/actions/userAction";
import { useDispatch } from "react-redux";

export default function Profile() {
  const navigate = useNavigate();
  const userhookState = useSelector((state) => state.userReducer);
  const [form] = useForm();
  const dispatch = useDispatch();

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
    try {
      const data = {
        id: value.id,
        email: value.email,
        name: value.name,
        phoneNumber: value.phoneNumber,
        passWord: value.passWord,
      };

      const dataSignIn = {
        email: value.email,
        passWord: value.passWord,
      };

      await editUser(data);

      const result = await loginApi(dataSignIn);
      localStorage.setItem(
        "USER_INFO_KEY",
        JSON.stringify(result.data.content)
      );
      dispatch(setUserInfoAction(result.data.content));
      Swal.fire({
        title: "Cập nhật thành công!",
        text: "Hoàn tất!!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/jira/projectmanagement");
    } catch (error) {
      notification.error({
        message: error.response.data.message,
      });
    }
  };
  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center col-sm-12 text-md-center col-lg-5">
            <Avatar
              style={{ width: "300px", height: "300px" }}
              src={userhookState?.userInfo?.avatar}
            />
          </div>
          <div className="col-12 col-sm-12 col-lg-7 mt-lg-0 mt-5">
            <Form
              form={form}
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 24,
              }}
              layout="vertical"
              initialValues={{
                size: componentSize,
              }}
              onFinish={handleFinish}
              onValuesChange={onFormLayoutChange}
              size="large"
              style={{
                maxWidth: 1200,
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
                  <Button onClick={() => navigate("/jira/projectmanagement")}>
                    Cancel
                  </Button>
                  <Button htmlType="submit" type="primary">
                    Update
                  </Button>
                </Space>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
