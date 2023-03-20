import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJira } from "@fortawesome/free-brands-svg-icons";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import {
  Menu,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useProjectAll } from "../../hooks/useAllProject";
import { fetchStatusApi } from "../../servers/status";
import { fetchPriorityApi } from "../../servers/priority";
import { fetchTaskTypeApi } from "../../servers/tasktype";

import { Editor } from "@tinymce/tinymce-react";
import { setUserInfoAction } from "../../store/actions/userAction";
const { Option } = Select;
export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStateReducer = useSelector((state) => state.userReducer);
  const [open, setOpen] = useState(false);
  const dataProject = useProjectAll();
  console.log(dataProject);
  const [status, setStatus] = useState([]);
  const [priority, setPriority] = useState([]);
  const [taskType, setTaskType] = useState([]);

  const editoRef = useRef();

  useEffect(() => {
    getStatusAll();
    getPriorityAll();
    getTaskTypeAll();
  }, []);

  const getStatusAll = async () => {
    const result = await fetchStatusApi();
    setStatus(result.data.content);
  };

  const getPriorityAll = async () => {
    const result = await fetchPriorityApi();
    setPriority(result.data.content);
  };

  const getTaskTypeAll = async () => {
    const result = await fetchTaskTypeApi();
    console.log(result);
    setTaskType(result.data.content);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const items = [
    {
      label: (
        <Link style={{ textDecoration: "none" }} to="/projectmanagement">
          {" "}
          Jira
        </Link>
      ),
      key: "mail",
      icon: <FontAwesomeIcon icon={faJira} />,
    },
    {
      label: "Projects",
      key: "Projects",
      icon: <DownOutlined />,
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            {
              label: "Option 1",
              key: "setting:1",
            },
            {
              label: "Option 2",
              key: "setting:2",
            },
          ],
        },
        {
          type: "group",
          label: "Item 2",
          children: [
            {
              label: "Option 3",
              key: "setting:3",
            },
            {
              label: "Option 4",
              key: "setting:4",
            },
          ],
        },
      ],
    },
    {
      label: "User",
      key: "User",
      icon: <DownOutlined />,
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            {
              label: "Option 1",
              key: "setting:1",
            },
            {
              label: "Option 2",
              key: "setting:2",
            },
          ],
        },
        {
          type: "group",
          label: "Item 2",
          children: [
            {
              label: "Option 3",
              key: "setting:3",
            },
            {
              label: "Option 4",
              key: "setting:4",
            },
          ],
        },
      ],
    },
    {
      label: (
        <button
          className="btn"
          onClick={showDrawer}
          style={{ textDecoration: "none" }}
        >
          Create Task
        </button>
      ),
      key: "Create task",
    },
  ];

  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const handleLogout = () => {
    localStorage.removeItem("USER_INFO_KEY");
    dispatch(setUserInfoAction(null));
    navigate("/login");
  };

  return (
    <div className="container-xl">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <div>
          <div className="btn-group">
            <SettingOutlined
              className=" dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            />

            <div className="dropdown-menu dropdown-menu-right">
              <button
                onClick={() => {
                  navigate("/user");
                }}
                className="dropdown-item"
                type="button"
              >
                User management
              </button>
              <button className="dropdown-item" type="button">
                Jira setting
              </button>
              <button className="dropdown-item" type="button">
                Project
              </button>
            </div>
          </div>

          <div className="btn-group">
            <img
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              src={userStateReducer.userInfo.avatar}
              alt=""
              width={30}
              height={30}
              style={{ borderRadius: "50%", margin: "0 20px" }}
            />
            <div className="dropdown-menu dropdown-menu-right">
              <p className="dropdown-item">{userStateReducer.userInfo.name}</p>
              <button className="dropdown-item" type="button">
                Profiles
              </button>
              <hr />
              <Button onClick={handleLogout} className="dropdown-item" danger>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Drawer
          title="Create Task"
          width={720}
          onClose={onClose}
          open={open}
          bodyStyle={{
            paddingBottom: 80,
          }}
          // extra={

          // }
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="name"
                  label="Project"
                  rules={[
                    {
                      required: true,
                      message: "Please enter user name",
                    },
                  ]}
                >
                  <Select>
                    {dataProject.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item.projectName}>
                          {item.projectName}
                        </Select.Option>
                      );
                    })}
                  </Select>
                  <span className="font-weight-bold">
                    * You can only create tasks of your own projects!
                  </span>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="url"
                  label="Task name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Task name",
                    },
                  ]}
                >
                  <Input placeholder="Task name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[
                    {
                      required: true,
                      message: "Please select an owner",
                    },
                  ]}
                >
                  <Select placeholder="Please select an owner">
                    {status.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item.statusId}>
                          {item.statusName}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={48}>
              <Col span={12}>
                <Form.Item
                  name="approver"
                  label="Priority"
                  rules={[
                    {
                      required: true,
                      message: "Please choose the approver",
                    },
                  ]}
                >
                  <Select placeholder="Please choose the approver">
                    {priority.map((item, index) => {
                      return (
                        <Select.Option value={item.priorityId}>
                          {item.priority}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Task Type"
                  rules={[
                    {
                      required: true,
                      message: "Please choose the type",
                    },
                  ]}
                >
                  <Select placeholder="Please choose the type">
                    {taskType.map((item, index) => {
                      return (
                        <Select.Option value={item.id}>
                          {item.taskType}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={48}>
              <Col span={24}>
                <Form.Item
                  name="assigners"
                  label="Assigners"
                  rules={[
                    {
                      required: true,
                      message: "Please choose the approver",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="select one country"
                    defaultValue={["china"]}
                    optionLabelProp="label"
                  >
                    <Option value="china" label="China">
                      <Space>
                        <span role="img" aria-label="China">
                          🇨🇳
                        </span>
                        China (中国)
                      </Space>
                    </Option>
                    <Option value="usa" label="USA">
                      <Space>
                        <span role="img" aria-label="USA">
                          🇺🇸
                        </span>
                        USA (美国)
                      </Space>
                    </Option>
                    <Option value="japan" label="Japan">
                      <Space>
                        <span role="img" aria-label="Japan">
                          🇯🇵
                        </span>
                        Japan (日本)
                      </Space>
                    </Option>
                    <Option value="korea" label="Korea">
                      <Space>
                        <span role="img" aria-label="Korea">
                          🇰🇷
                        </span>
                        Korea (韩国)
                      </Space>
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="description" label="Description">
                  <Editor
                    onInit={(evt, editor) => (editoRef.current = editor)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={onClose} type="primary">
                Submit
              </Button>
            </Space>
          </Form>
        </Drawer>
      </div>
    </div>
  );
}
