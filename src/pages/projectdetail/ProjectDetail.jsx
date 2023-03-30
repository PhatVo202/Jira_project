import {
  Avatar,
  Breadcrumb,
  Button,
  Modal,
  notification,
  Popover,
  Select,
  Tag,
  Tooltip,
  Collapse,
  Input,
  Slider,
  Form,
  InputNumber,
  Popconfirm,
  message,
} from "antd";
import "./style.scss";
import Search from "antd/es/input/Search";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import {
  getAssignUserProjectApi,
  removeTaskApi,
  removeUserFromProjectApi,
  updateAssignUserTaskApi,
  updateEstimate,
  updatePriorityApi,
  updateStatus,
  updateTimeTracking,
} from "../../servers/project";
import {
  deleteCommentAction,
  inserCommentAction,
  removeMemberBoard,
  searchMemberBoard,
  setAllComment,
  setMemberBoardAction,
  setProjectDetailArrAction,
  setTaskDetail,
} from "../../store/actions/projectDetailAction";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import { TaskType } from "../../enums";
import { fetchTaskTypeApi } from "../../servers/tasktype";
import { fetchStatusApi } from "../../servers/status";
import { Editor } from "@tinymce/tinymce-react";

import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { fetchPriorityApi } from "../../servers/priority";
import { useForm } from "antd/es/form/Form";
import parse from "html-react-parser";
import { deleteCommentApi } from "../../servers/comment";

const { Panel } = Collapse;

export default function ProjectDetail() {
  const param = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userReducer);
  const { projectDetail } = useSelector((state) => state.projectDetailReducer);
  const { arrMember } = useSelector((state) => state.projectDetailReducer);
  const { taskDetail } = useSelector((state) => state.projectDetailReducer);
  const { commentList } = useSelector((state) => state.projectDetailReducer);
  console.log(commentList);

  const [statusName, setStatusName] = useState();
  const [statusAll, setStatusAll] = useState();

  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);
  const [taskType, setTaskType] = useState();
  const [priority, setPriority] = useState();

  const [form] = useForm();
  const [estimate, setEstimate] = useState();

  const membersOptions = taskDetail?.assigness?.map((item) => {
    return { label: item.name, value: item.userId };
  });

  const editoRef = useRef();

  // const memberOption = taskDetail?.assigness?.map((item) => {
  //   return item.name;
  // });
  // console.log(memberOption);

  // const memberProjectOption = projectDetail?.members?.map((item) => {
  //   return { label: item.name, value: item.userId };
  // });

  useEffect(() => {
    getTaskTypeAll();
    getStatus();
    getPriorityAll();
  }, []);

  const getTaskTypeAll = async () => {
    const result = await fetchTaskTypeApi();
    setTaskType(result.data.content);
  };

  const getPriorityAll = async () => {
    const result = await fetchPriorityApi();
    setPriority(result.data.content);
  };

  const getStatus = async () => {
    const result = await fetchStatusApi();
    setStatusAll(result.data.content);
  };

  useEffect(() => {
    if (param.id) {
      dispatch(setProjectDetailArrAction(param.id));
    }
  }, [param.id]);

  const onSearch = (value) => {
    dispatch(searchMemberBoard(value));
  };

  const changeColors = (key) => {
    switch (key) {
      case "BACKLOG":
        return "blue";
      case "SELECTED FOR DEVELOPMENT":
        return "geekblue";
      case "IN PROGRESS":
        return "cyan";

      default:
        return "green";
    }
  };

  const handleComment = (taskId) => {
    const data = {
      taskId: taskId,
      contentComment: editoRef.current.getContent(),
    };
    console.log(data);

    dispatch(inserCommentAction(data));
  };

  return (
    <div>
      <Header />

      <div className="container py-3">
        <Breadcrumb
          className="py-2"
          items={[
            {
              title: <NavLink to="/projectmanagement">Projects</NavLink>,
            },

            {
              title: projectDetail.projectName,
            },
          ]}
        />

        <div className="row mb-4">
          <div className="col-4 ">
            <h3>Board</h3>
          </div>

          <div className="col-8">
            <div>
              <span>Members</span>
              <Avatar.Group
                maxCount={2}
                maxPopoverTrigger="hover"
                maxStyle={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                  cursor: "pointer",
                }}
              >
                {projectDetail?.members?.map((member, index) => {
                  return (
                    <Popover key={index} content={member.name} trigger="hover">
                      <Avatar src={member.avatar} />
                    </Popover>
                  );
                })}
              </Avatar.Group>

              <button
                style={{ borderRadius: "50%", color: "blue" }}
                className="btn btn-primary bg-white"
                onClick={() => setModal2Open(true)}
              >
                +
              </button>

              <Modal
                title={
                  <p>
                    Add members project{" "}
                    <span className="text-danger">
                      {projectDetail.projectName}
                    </span>
                  </p>
                }
                centered
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
                footer={null}
                width={1000}
              >
                <div className="container-xl">
                  <div className="row">
                    <div className="col-6">
                      <p>Search user</p>
                    </div>

                    <div className="col-6">
                      <Search
                        placeholder="input search text"
                        onSearch={onSearch}
                        enterButton
                      />
                    </div>

                    <div className="col-6 py-3">
                      <h6>Not yet added</h6>
                    </div>

                    <div className="col-6 py-3">
                      <h6>Already in project</h6>
                    </div>

                    <div
                      className="col-6 "
                      style={{ height: "400px", overflowY: "scroll" }}
                    >
                      <div>
                        {arrMember?.map((member, index) => {
                          return (
                            <div key={index}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  marginBottom: "10px",
                                }}
                              >
                                <Avatar src={member.avatar} />
                                <div>
                                  <Tag color="green">{member.name}</Tag>
                                  <span> - </span>
                                  <span>User ID: {member.userId}</span>
                                </div>
                                <Button
                                  onClick={async () => {
                                    const data = {
                                      projectId: projectDetail.id,
                                      userID: member.userId,
                                    };
                                    try {
                                      await getAssignUserProjectApi(data);
                                      dispatch(
                                        setMemberBoardAction(
                                          member.userId,
                                          member.userId
                                        )
                                      );
                                    } catch (error) {
                                      notification.error({
                                        message: error.response.data.content,
                                      });
                                    }
                                  }}
                                  type="primary"
                                >
                                  Add
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div
                      className="col-6"
                      style={{ height: "400px", overflowY: "scroll" }}
                    >
                      {projectDetail?.members?.map((member, index) => {
                        return (
                          <div key={index}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "10px",
                              }}
                            >
                              <Avatar src={member.avatar} />
                              <div>
                                <Tag color="green">{member.name}</Tag>
                                <span> - </span>
                                <span>User ID: {member.userId}</span>
                              </div>
                              <Button
                                onClick={async () => {
                                  const data = {
                                    projectId: projectDetail.id,
                                    userId: member.userId,
                                  };

                                  try {
                                    await removeUserFromProjectApi(data);
                                    dispatch(removeMemberBoard(member.userId));
                                  } catch (error) {
                                    notification.error({
                                      message: error.response.data.content,
                                    });
                                  }
                                }}
                                danger
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>

        <div className="row">
          {projectDetail?.lstTask?.map((item, index) => {
            return (
              <div className="col-3" key={index}>
                <div
                  onClick={() => {
                    setStatusName(item.statusName);
                    dispatch(setProjectDetailArrAction(param.id));
                  }}
                  className="bg-light pl-2 pt-2 font-weight-bold"
                  style={{
                    // height: "500px",
                    maxHeight: "500px",
                    cursor: "grab",
                  }}
                >
                  <Tag color={changeColors(item.statusName)} className="mb-2">
                    {item.statusName}
                  </Tag>
                  {item.lstTaskDeTail.map((taskDetail, index) => {
                    return (
                      <div
                        onClick={() => {
                          dispatch(setTaskDetail(taskDetail.taskId));
                          setModal3Open(true);
                          form.setFieldsValue({
                            originalEstimate: taskDetail.originalEstimate,
                            timeTrackingRemaining:
                              taskDetail.timeTrackingRemaining,
                          });
                          dispatch(setAllComment(taskDetail.taskId));
                        }}
                        key={index}
                        className="card px-2 bg-white mx-1"
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <p style={{ fontWeight: 400 }}>
                              {taskDetail.taskName}
                            </p>
                            {taskDetail.taskTypeDetail.taskType ===
                            TaskType.bug ? (
                              <FontAwesomeIcon
                                icon={faCircle}
                                style={{
                                  background: "#e54a39",
                                  color: "white",
                                  border: "none",
                                  padding: "4px 4px",
                                  fontSize: "7px",
                                  marginRight: "5px",
                                  borderRadius: "3px",
                                }}
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faCheck}
                                style={{
                                  background: "#4cace8",
                                  color: "white",
                                  border: "none",
                                  padding: "1px 1px",
                                  fontSize: "12px",
                                  marginRight: "5px",
                                  borderRadius: "3px",
                                }}
                              />
                            )}

                            <Tag color="red" className="text-danger">
                              {taskDetail.priorityTask.priority}
                            </Tag>
                          </div>
                          <div className="mt-5">
                            <Avatar.Group
                              maxCount={2}
                              size="small"
                              maxPopoverTrigger="hover"
                              maxStyle={{
                                color: "#f56a00",
                                backgroundColor: "#fde3cf",
                                cursor: "pointer",
                              }}
                            >
                              {taskDetail?.assigness?.map(
                                (assigness, index) => {
                                  return (
                                    <Tooltip
                                      title={assigness.name}
                                      placement="top"
                                      key={index}
                                    >
                                      <Avatar src={assigness.avatar}></Avatar>
                                    </Tooltip>
                                  );
                                }
                              )}
                            </Avatar.Group>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        style={{ height: "auto" }}
        title=""
        centered
        width={1000}
        open={modal3Open}
        footer={null}
        onOk={() => setModal3Open(false)}
        onCancel={() => {
          dispatch({
            type: "SET_TASKDETAIL",
            payload: {},
          });
          setModal3Open(false);
        }}
      >
        <Select value={taskDetail.taskTypeDetail?.taskType}>
          {taskType?.map((type, index) => {
            return (
              <Select.Option key={index} value={type.taskType}>
                {type.taskType}
              </Select.Option>
            );
          })}
        </Select>
        <div className="text-right">
          <Button
            onClick={async () => {
              await removeTaskApi(taskDetail.taskId);
              notification.success({
                message: "Xoá thành công!",
              });
              setModal3Open(false);

              dispatch(setProjectDetailArrAction(param.id));
            }}
          >
            <DeleteOutlined />
          </Button>
        </div>
        <h5 className="mt-3">{taskDetail?.taskName}</h5>
        <div className="container-xl">
          <div className="row">
            <div className="col-6">
              <h6>Description</h6>
              <div
                className="form-group"
                style={{ height: "150px", overflowY: "scroll" }}
              >
                {/* <Editor /> */}

                <div className="text-right mt-2">
                  <Button className="mr-2" type="primary">
                    Save
                  </Button>
                  <Button>Cancel</Button>
                </div>
              </div>
              <h6>Comment</h6>
              <div
                className="form-group"
                style={{ height: "350px", overflowY: "scroll" }}
              >
                <div className="row mb-3">
                  <div className="col-1">
                    <Avatar src={userInfo.avatar} />
                  </div>
                  <div className="col-11">
                    <Collapse accordion={true} size="small" ghost>
                      <Panel
                        collapsible="header"
                        showArrow={false}
                        header="Add Comment ..."
                        key={1}
                      >
                        <Editor
                          onInit={(evt, editor) => (editoRef.current = editor)}
                        />
                        <div className="text-right mt-2">
                          <Button
                            onClick={() => handleComment(taskDetail.taskId)}
                            className="mr-2"
                            type="primary"
                          >
                            Save
                          </Button>
                          <Button>Cancel</Button>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                </div>
                {commentList?.map((comment, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="row">
                        <div className="col-1">
                          <Avatar src={comment?.user?.avatar} />
                        </div>
                        <div className="col-11">
                          <span>{comment?.user?.name}</span>
                          <p className="mr-4 ">
                            {parse(comment?.contentComment)}
                          </p>
                          <div className="d-flex">
                            <p className="text-comment mr-3">Edit</p>
                            <Popconfirm
                              placement="topLeft"
                              title="'Are you sure to delete this task?'"
                              description="Delete the task'"
                              onConfirm={async () => {
                                await deleteCommentApi(comment.id);
                                dispatch(deleteCommentAction(comment.id));
                                message.success("Xoá thành công!");
                              }}
                              okText="Yes"
                              cancelText="No"
                            >
                              <p className="text-comment">Delete</p>
                            </Popconfirm>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
            <div className="col-6">
              <Select
                className="mb-2"
                onSelect={async (value) => {
                  const data = {
                    taskId: taskDetail.taskId,
                    statusId: value,
                  };

                  await updateStatus(data);
                  dispatch(setProjectDetailArrAction(param.id));
                }}
                // onChange={(value) => console.log(value)}
                placeholder={statusName}
                placement="bottomRight"
              >
                {statusAll?.map((item, index) => {
                  return (
                    <Select.Option key={index} value={item.statusId}>
                      {item.statusName}
                    </Select.Option>
                  );
                })}
              </Select>

              <Collapse defaultActiveKey={1}>
                <Panel header="Detail" key="1">
                  <div className="row">
                    <div className="col-4">
                      <h6>Assignees</h6>
                    </div>
                    <div className="col-8">
                      <Select
                        style={{ width: "100%" }}
                        mode="multiple"
                        // defaultValue={memberOptions}
                        // value={membersOptions}
                        // value={membersOptions}
                        onChange={(value) =>
                          console.log("thay doi value:", value)
                        }
                        onDeselect={(e) => console.log(e)}
                        placeholder={taskDetail?.assigness?.name}
                        onSelect={async (value) => {
                          const data = {
                            taskId: taskDetail.taskId,
                            userId: value,
                          };
                          try {
                            await updateAssignUserTaskApi(data);
                            dispatch(setProjectDetailArrAction(param.id));
                          } catch (error) {
                            notification.error({
                              message: error.response.data.content,
                            });
                          }
                        }}
                      >
                        {projectDetail?.members?.map((item, index) => {
                          return (
                            <Select.Option key={index} value={item.userId}>
                              {item.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </div>

                    <div className="col-4 mt-2">
                      <h6>Priority</h6>
                    </div>
                    <div className="col-8 mt-2">
                      <Select
                        onChange={async (value) => {
                          const data = {
                            taskId: taskDetail.taskId,
                            priorityId: value,
                          };

                          await updatePriorityApi(data);
                          dispatch(setProjectDetailArrAction(param.id));
                        }}
                        placeholder={taskDetail?.priorityTask?.priority}
                        style={{ width: "100%" }}
                      >
                        {priority?.map((item, index) => {
                          return (
                            <Select.Option key={index} value={item.priorityId}>
                              {item.priority}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </div>

                    <div className="col-4 mt-2">
                      <h6>Estimate</h6>
                    </div>
                    <div className="col-8 mt-2">
                      <Tooltip
                        trigger="click"
                        title={
                          <Button
                            size="small"
                            onClick={async () => {
                              const data = {
                                taskId: taskDetail.taskId,
                                originalEstimate: estimate,
                              };
                              await updateEstimate(data);
                              dispatch(setProjectDetailArrAction(param.id));
                            }}
                          >
                            <CheckOutlined />
                          </Button>
                        }
                        placement="bottomRight"
                      >
                        <Form form={form}>
                          <Form.Item
                            name="originalEstimate"
                            onChange={(value) =>
                              setEstimate(value.target.value)
                            }
                          >
                            <InputNumber
                              size="middle"
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </Form>
                      </Tooltip>
                    </div>

                    <div className="col-4">
                      <h6>Time tracking</h6>
                    </div>
                    <div
                      className="col-8"
                      style={{ border: "0.2px solid gray" }}
                    >
                      <Slider
                        value={taskDetail.timeTrackingSpent}
                        max={
                          Number(taskDetail.timeTrackingSpent) +
                          Number(taskDetail.timeTrackingRemaining)
                        }
                      />
                      <p>
                        The original estimate for this issue was{" "}
                        <span>{taskDetail.originalEstimate}</span> m.
                      </p>
                      <div>
                        <Form
                          form={form}
                          onFinish={async (value) => {
                            const data = {
                              taskId: taskDetail.taskId,
                              timeTrackingSpent: value.timeTrackingSpent,
                              timeTrackingRemaining:
                                value.timeTrackingRemaining,
                            };
                            await updateTimeTracking(data);
                            dispatch(setProjectDetailArrAction(param.id));
                            setModal3Open(false);
                          }}
                        >
                          <Form.Item
                            label="Time spent"
                            name="timeTrackingSpent"
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            label="Time remaining"
                            name="timeTrackingRemaining"
                          >
                            <Input />
                          </Form.Item>
                          <div className="text-right">
                            <Button className="mb-2 " htmlType="submit">
                              Update
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </Panel>
              </Collapse>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
