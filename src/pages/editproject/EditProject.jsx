import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header";
import { Form, Input, Select, Button, Space } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { updateProjectApi } from "../../servers/project";
import Swal from "sweetalert2";

export default function EditProject() {
  const navigate = useNavigate();
  const [componentSize, setComponentSize] = useState("default");
  const projectDetailReducer = useSelector(
    (state) => state.projectDetailReducer
  );
  const editoRef = useRef();
  const [form] = useForm();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  useEffect(() => {
    getProjectDetail();
  }, []);

  const getProjectDetail = () => {
    form.setFieldsValue({
      id: projectDetailReducer.projectInfo.id,
      projectName: projectDetailReducer.projectInfo.projectName,
      categoryName: projectDetailReducer.projectInfo.categoryName,
    });
  };

  const handleFinish = async (value) => {
    const data = {
      id: value.id,
      projectName: value.projectName,
      creator: projectDetailReducer.projectInfo.creator.id,
      description: editoRef.current.getContent(),
      categoryId: value.categoryName,
    };

    await updateProjectApi(value.id, data);
    Swal.fire({
      title: "Tạo dự án thành công!",
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
        <h3>Update Project</h3>
        <div>
          <Form
            form={form}
            onFinish={handleFinish}
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
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            style={{
              maxWidth: 1000,
            }}
          >
            <Form.Item
              label="Project ID"
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
            <Form.Item label="Project name" name="projectName">
              <Input />
            </Form.Item>
            <Form.Item label="Project category" name="categoryName">
              <Select>
                <Select.Option value="1">Dự án web</Select.Option>
                <Select.Option value="2">Dự án phần mềm</Select.Option>
                <Select.Option value="3">Dự án di động</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Description"></Form.Item>
            <Editor
              initialValue={projectDetailReducer.projectInfo.projectName}
              onInit={(evt, editor) => (editoRef.current = editor)}
            />

            <div style={{ textAlign: "right" }}>
              <Space className="my-5">
                <Button onClick={() => navigate("/projectmanagement")}>
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
  );
}
