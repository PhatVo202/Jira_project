import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";

import {
  AutoComplete,
  Input,
  Table,
  Avatar,
  Tag,
  Button,
  notification,
  Popover,
} from "antd";
import {
  deleteProjectApi,
  getAssignUserProjectApi,
  removeUserFromProjectApi,
} from "../../servers/project";
import { EditOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import { fetchGetUserApi, getUserProjectIdApi } from "../../servers/user";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProjectAction,
  setMemberInfoAction,
  setProjectDetailAction,
  setProjectListAction,
} from "../../store/actions/projectDetailAction";
import { useProjectAll } from "../../hooks/useAllProject";

export default function ProjectManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [userSearch, setUserSearch] = useState([]);
  const listAllProject = useSelector((state) => state.projectDetailReducer);

  useEffect(() => {
    getAllProject();
  }, []);

  const dataProject = useProjectAll();

  const getAllProject = () => {
    dispatch(setProjectListAction());
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: (id2, id1) => {
        return id2.id - id1.id;
      },
      sortDirection: ["descend"],
      key: 1,
    },
    {
      title: "Project name",
      dataIndex: "projectName",
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName1?.trim().toLowerCase();
        let projectName2 = item2.projectName2?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
      sortDirection: ["descend"],
      key: 2,
    },
    {
      title: "Category name",
      dataIndex: "categoryName",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
      sortDirection: ["descend"],
      key: 3,
    },
    {
      title: "Creator",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },

      key: 4,
      render: (text) => {
        return <Tag color="lime">{text.creator.name}</Tag>;
      },
    },
    {
      title: "Members",
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
      key: 5,
      render: (text) => {
        return (
          <div>
            {text?.members?.map((item, index) => {
              return (
                <Popover
                  placement="topLeft"
                  title={"Members"}
                  content={() => {
                    return (
                      <table className="table" key={index}>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Account</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{item.userId}</td>
                            <td>
                              <Avatar
                                height={30}
                                width={30}
                                style={{ borderRadius: "50%" }}
                                src={item.avatar}
                                alt=""
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>
                              <CloseOutlined
                                onClick={async () => {
                                  const data = {
                                    projectId: text.id,
                                    userId: item.userId,
                                  };
                                  try {
                                    await removeUserFromProjectApi(data);
                                    notification.success({
                                      message: "Xoá user thành công!",
                                    });
                                  } catch (error) {
                                    notification.error({
                                      message: error.response.data.content,
                                    });
                                  }
                                }}
                                style={{
                                  backgroundColor: "red",
                                  width: "30px",
                                  height: "30px",
                                  lineHeight: "30px",
                                  cursor: "pointer",
                                  borderRadius: "50%",
                                  color: "white",
                                  textAlign: "center",
                                }}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    );
                  }}
                  trigger="hover"
                >
                  <Avatar src={item.avatar}></Avatar>
                </Popover>
              );
            })}
            {/* {text.members?.length > 3 ? <Avatar>...</Avatar> : ""} */}
            <Popover
              placement="bottomRight"
              title={"text"}
              content={() => {
                return (
                  <div>
                    <AutoComplete
                      style={{ width: "100%" }}
                      onSearch={search}
                      value={value}
                      options={userSearch.map((item, index) => {
                        return {
                          label: item.name,
                          value: item.userId.toString(),
                        };
                      })}
                      onChange={(text) => {
                        setValue(text);
                      }}
                      onSelect={async (valueSelect, option) => {
                        console.log({ valueSelect: valueSelect });
                        console.log({ option: option });
                        setValue(option.label);
                        const data = {
                          projectId: text.id,
                          userId: valueSelect,
                        };

                        try {
                          await getAssignUserProjectApi(data);
                          dispatch(setMemberInfoAction(valueSelect, text.id));
                        } catch (error) {
                          notification.error({
                            message: error.response.data.content,
                          });
                        }
                      }}
                    />
                  </div>
                );
              }}
              trigger="click"
            >
              <Button style={{ borderRadius: "50%" }}>+</Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: 6,
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
      render: (text) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                dispatch(setProjectDetailAction(text));
                navigate(`/edit/${text.id}`);
              }}
              style={{
                cursor: "pointer",
                color: "blue",
                width: "40px",
                height: "20px",
              }}
            />
            <DeleteOutlined
              onClick={async () => {
                try {
                  await deleteProjectApi(text.id);
                  dispatch(deleteProjectAction(text.id));
                  notification.success({
                    message: "Xoá thành công!",
                  });
                } catch (error) {
                  notification.error({
                    message: error.response.data.content,
                  });
                }
              }}
              style={{
                cursor: "pointer",
                color: "red",
                width: "40px",
                height: "20px",
              }}
            />
          </>
        );
      },
    },
  ];

  const search = async (value) => {
    const result = await fetchGetUserApi(value);
    setUserSearch(result.data.content);
  };

  const handleSearch = (value) => {};

  return (
    <div>
      <Header />
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <h3>Project</h3>
          <Button type="primary" onClick={() => navigate("/createproject")}>
            Create Project
          </Button>
        </div>
        <div>
          <Input.Search
            size="large"
            placeholder="Search here"
            enterButton
            onSearch={handleSearch}
          />

          <Table columns={columns} dataSource={listAllProject.projectList} />
        </div>
      </div>
    </div>
  );
}
