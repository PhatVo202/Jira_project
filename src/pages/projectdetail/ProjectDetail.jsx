import { Avatar, Breadcrumb, Popover } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import { setProjectDetailArrAction } from "../../store/actions/projectDetailAction";

export default function ProjectDetail() {
  const param = useParams();
  const dispatch = useDispatch();
  const { projectDetail } = useSelector((state) => state.projectDetailReducer);

  console.log(projectDetail);

  useEffect(() => {
    if (param.id) {
      dispatch(setProjectDetailArrAction(param.id));
    }
  }, [param.id]);
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
        <div className="row">
          <div className="col-4">
            <h3>Board</h3>
          </div>
          <div className="col-8">
            <span>Members</span>
            <div>
              {projectDetail?.members?.map((member, index) => {
                return (
                  <div key={index}>
                    <Popover content={member.name} trigger="hover">
                      <Avatar src={member.avatar} />
                    </Popover>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
