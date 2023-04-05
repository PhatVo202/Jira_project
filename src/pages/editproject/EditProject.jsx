import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header";
import { Form, Input, Select, Button, Space, Breadcrumb } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "antd/es/form/Form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  fetchProjectCategorylsApi,
  fetchProjectDetailsApi,
  updateProjectApi,
} from "../../servers/project";
import Swal from "sweetalert2";

export default function EditProject() {
  const navigate = useNavigate();
  const param = useParams();

  const [stateCategory, setStateCategory] = useState();
  const [stateDescription, setStateDescription] = useState();
  const [stateCreator, setStateCreator] = useState();

  const [componentSize, setComponentSize] = useState("default");

  const editoRef = useRef();
  const [form] = useForm();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  useEffect(() => {
    if (param.id) {
      getProjectDetail();
    }
  }, [param.id]);

  useEffect(() => {
    getProjectCategory();
  }, []);

  const getProjectCategory = async () => {
    const result = await fetchProjectCategorylsApi();
    setStateCategory(result.data.content);
  };

  const getProjectDetail = async () => {
    const result = await fetchProjectDetailsApi(param.id);
    setStateDescription(result.data.content.description);
    setStateCreator(result.data.content.creator.id);
    form.setFieldsValue({
      id: result.data.content.id,
      projectName: result.data.content.projectName,
    });
  };

  const handleFinish = async (value) => {
    const data = {
      id: value.id,
      projectName: value.projectName,
      creator: stateCreator,
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
        <Breadcrumb
          className="py-3"
          items={[
            {
              title: <NavLink to="/projectmanagement">Project</NavLink>,
            },
            {
              title: (
                <>
                  <span>Update Project</span>
                </>
              ),
            },
          ]}
        />
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
                {stateCategory?.map((category, index) => {
                  return (
                    <Select.Option key={index} value={category.id}>
                      {category.projectCategoryName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Description"></Form.Item>
            <Editor
              initialValue={stateDescription}
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
