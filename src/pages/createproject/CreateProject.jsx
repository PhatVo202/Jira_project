import { Form, Button, Input, Select, Space, Breadcrumb } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import {
  createProjectAuthorizeApi,
  fetchProjectCategorylsApi,
} from "../../servers/project";
import Swal from "sweetalert2";

export default function CreateProject() {
  const navigate = useNavigate();
  const [dataCategory, setDataCategory] = useState([]);

  const editoRef = useRef(null);
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  useEffect(() => {
    getProjectCategory();
  }, []);

  const getProjectCategory = async () => {
    const result = await fetchProjectCategorylsApi();
    console.log(result);
    setDataCategory(result.data.content);
  };

  const handleFinish = async (value) => {
    const data = {
      projectName: value.projectName,
      description: editoRef.current.getContent(),
      categoryId: value.categoryName,
      alias: value.projectName,
    };

    await createProjectAuthorizeApi(data);
    Swal.fire({
      title: "Tạo dự án thành công!",
      text: "Hoàn tất!!",
      icon: "success",
      timer: 2000,
      showConfirmButton: true,
    });
    navigate("/projectmanagement");
  };
  return (
    <div>
      <Header />
      <div className="container py-5">
        <div>
          <Breadcrumb
            className="my-4"
            items={[
              {
                title: (
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/projectmanagement"
                  >
                    Project
                  </Link>
                ),
              },
              {
                title: "New project",
              },
            ]}
          />
        </div>
        <Form
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
          onFinish={handleFinish}
        >
          <Form.Item
            label="Project name"
            name="projectName"
            rules={[
              {
                required: true,
                message: "ProjectName is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Project category" name="categoryName">
            <Select>
              {dataCategory.map((item, index) => {
                return (
                  <Select.Option key={index} value={item.id}>
                    {item.projectCategoryName}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Editor onInit={(evt, editor) => (editoRef.current = editor)} />
          </Form.Item>

          <div className="text-right mt-4">
            <Button htmlType="submit">Create project</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
