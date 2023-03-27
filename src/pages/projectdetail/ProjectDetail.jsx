import {
  Avatar,
  Breadcrumb,
  Button,
  Modal,
  Popover,
  Select,
  Tag,
  Tooltip,
} from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import {
  getAssignUserProjectApi,
  removeUserFromProjectApi,
} from "../../servers/project";
import {
  removeMemberBoard,
  searchMemberBoard,
  setMemberBoardAction,
  setProjectDetailArrAction,
} from "../../store/actions/projectDetailAction";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircle } from "@fortawesome/free-solid-svg-icons";
import { TaskType } from "../../enums";

export default function ProjectDetail() {
  const param = useParams();
  const dispatch = useDispatch();
  const { projectDetail } = useSelector((state) => state.projectDetailReducer);
  const { arrMember } = useSelector((state) => state.projectDetailReducer);

  console.log(projectDetail);

  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);

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
                                    await getAssignUserProjectApi(data);
                                    dispatch(
                                      setMemberBoardAction(
                                        member.userId,
                                        member.userId
                                      )
                                    );
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

                                  await removeUserFromProjectApi(data);
                                  dispatch(removeMemberBoard(member.userId));
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
                  onClick={() => setModal3Open(true)}
                  className="bg-light pl-2 pt-2 font-weight-bold"
                  style={{ height: "200px" }}
                >
                  <Tag color={changeColors(item.statusName)} className="mb-2">
                    {item.statusName}
                  </Tag>
                  {item.lstTaskDeTail.map((taskDetail, index) => {
                    return (
                      <div key={index} className="card px-2 bg-white mx-1">
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
                              {taskDetail.assigness.map((assigness, index) => {
                                return (
                                  <Tooltip
                                    title={assigness.name}
                                    placement="top"
                                    key={index}
                                  >
                                    <Avatar src={assigness.avatar}></Avatar>
                                  </Tooltip>
                                );
                              })}
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

        <Modal
          title=""
          centered
          width={1000}
          open={modal3Open}
          onOk={() => setModal3Open(false)}
          onCancel={() => setModal3Open(false)}
        >
          <Select
            defaultValue="lucy"
            style={{
              width: 120,
            }}
            // onChange={handleChange}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "Yiminghe",
                label: "yiminghe",
              },
              {
                value: "disabled",
                label: "Disabled",
                disabled: true,
              },
            ]}
          />
        </Modal>
      </div>
    </div>
  );
}
