import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJira } from "@fortawesome/free-brands-svg-icons";
import {
  DownOutlined,
  SettingOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import {
  Menu,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Slider,
  InputNumber,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useProjectAll } from "../../hooks/useAllProject";
import { fetchStatusApi } from "../../servers/status";
import { fetchPriorityApi } from "../../servers/priority";
import { fetchTaskTypeApi } from "../../servers/tasktype";

import { Editor } from "@tinymce/tinymce-react";
import { setUserInfoAction } from "../../store/actions/userAction";
import {
  getAllMember,
  getMemberByProjectId,
  setArrProjectAll,
} from "../../store/actions/projectDetailAction";
import { createTaskApi } from "../../servers/project";
import Swal from "sweetalert2";
const { Option } = Select;
export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStateReducer = useSelector((state) => state.userReducer);
  const { arrProject } = useSelector((state) => state.projectDetailReducer);

  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const [open, setOpen] = useState(false);
  // const dataProject = useProjectAll();

  const [status, setStatus] = useState([]);
  const [priority, setPriority] = useState([]);
  const [taskType, setTaskType] = useState([]);

  const { arrMember } = useSelector((state) => state.projectDetailReducer);

  const userOptions = arrMember?.map((item) => {
    return { label: item.name, value: item.userId };
  });
  const [stateProjectId, setStateProjectId] = useState();

  const editoRef = useRef();

  useEffect(() => {
    getAllProjectList();
    getStatusAll();
    getPriorityAll();
    getTaskTypeAll();
    dispatch(getAllMember(""));
  }, []);

  const getAllProjectList = () => {
    dispatch(setArrProjectAll());
  };

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
    setCurrent(e.key);
  };

  const handleLogout = () => {
    localStorage.removeItem("USER_INFO_KEY");
    dispatch(setUserInfoAction(null));
    navigate("/login");
  };

  const handleFinish = async (value) => {
    const data = {
      taskName: value.taskName,
      description: editoRef.current.getContent(),
      statusId: value.statusId,
      originalEstimate: value.originalEstimate,
      timeTrackingSpent: timeTracking.timeTrackingSpent,
      timeTrackingRemaining: timeTracking.timeTrackingRemaining,
      projectId: stateProjectId,
      typeId: value.typeId,
      priorityId: value.priorityId,
      listUserAsign: value.listUserAsign,
    };

    try {
      await createTaskApi(data);
      Swal.fire({
        title: "Tạo task thành công!",
        text: "Hoàn tất!!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      notification.error({
        message: error.response.data.content,
      });
    }

    setOpen(false);
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

        <div className="text-right">
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
              src={userStateReducer?.userInfo?.avatar}
              alt=""
              width={30}
              height={30}
              style={{ borderRadius: "50%", margin: "0 20px" }}
            />
            <div className="dropdown-menu dropdown-menu-right">
              <p className="text-muted ml-4">
                {userStateReducer?.userInfo?.name}
              </p>
              <button
                onClick={() => navigate("/my-profile")}
                className="dropdown-item"
                type="button"
              >
                Profiles
              </button>
              <hr />
              <Button onClick={handleLogout} className="dropdown-item" danger>
                Logout <ExportOutlined />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Drawer
          title="Create Task"
          width={480}
          onClose={onClose}
          open={open}
          bodyStyle={{
            paddingBottom: 80,
          }}
          // extra={

          // }
        >
          <Form layout="vertical" onFinish={handleFinish}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="projectId"
                  label="Project"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please enter user name",
                  //   },
                  // ]}
                >
                  <Select
                    onChange={(value) => {
                      dispatch(getMemberByProjectId(value));
                      setStateProjectId(value);
                    }}
                  >
                    {arrProject.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item.id}>
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
                  name="taskName"
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
                  name="statusId"
                  label="Status"
                  rules={[
                    {
                      required: true,
                      message: "Please select an owner",
                    },
                  ]}
                >
                  <Select placeholder="Please select an owner">
                    {status?.map((item, index) => {
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
                  name="priorityId"
                  label="Priority"
                  rules={[
                    {
                      required: true,
                      message: "Please choose the approver",
                    },
                  ]}
                >
                  <Select placeholder="Please choose the approver">
                    {priority?.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item.priorityId}>
                          {item.priority}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="typeId"
                  label="Task Type"
                  rules={[
                    {
                      required: true,
                      message: "Please choose the type",
                    },
                  ]}
                >
                  <Select placeholder="Please choose the type">
                    {taskType?.map((item, index) => {
                      return (
                        <Select.Option key={index} value={item.id}>
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
                  name="listUserAsign"
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
                    options={userOptions}
                    style={{ width: "100%" }}
                    placeholder="select one country"
                    onSelect={(value) => console.log(value)}
                    optionFilterProp="label"
                  ></Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Slider
                  // defaultValue={30}
                  tooltip={{ open: true }}
                  value={timeTracking.timeTrackingSpent}
                  max={
                    Number(timeTracking.timeTrackingSpent) +
                    Number(timeTracking.timeTrackingRemaining)
                  }
                />
                <div className="row mb-3">
                  <div className="text-left col-6 font-weight-bold">
                    {timeTracking.timeTrackingSpent} hour (s) spent
                  </div>
                  <div className="text-right col-6 font-weight-bold">
                    {timeTracking.timeTrackingRemaining} hour (s) remaining
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <label>Total Estimated Hours</label>
                <InputNumber
                  size="middle"
                  min={0}
                  name="timeTrackingSpent"
                  max={100000}
                  defaultValue={0}
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: value,
                    });
                  }}
                />
              </Col>
              <Col span={12}>
                <label>Hours spent</label>
                <InputNumber
                  size="middle"
                  min={0}
                  name="timeTrackingRemaining"
                  max={100000}
                  defaultValue={0}
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining: value,
                    });
                  }}
                />
              </Col>
              <Col span={24}>
                <label>Original Estimate</label>
                <Form.Item name="originalEstimate">
                  <InputNumber
                    size="middle"
                    min={0}
                    max={100000}
                    defaultValue={0}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Description">
                  <Editor
                    onInit={(evt, editor) => (editoRef.current = editor)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <div className="text-right">
              <Button type="text" onClick={onClose}>
                Cancel
              </Button>
              <Button className="ml-2 mr-2" htmlType="reset">
                Reset
              </Button>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </div>
          </Form>
        </Drawer>
      </div>
    </div>
  );
}
