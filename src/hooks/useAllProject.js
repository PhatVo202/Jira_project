import { useEffect, useState } from "react";

import { fetchAllProjectApi } from "../servers/project";

export const useProjectAll = () => {
  const [dataProject, setDataProject] = useState([]);

  useEffect(() => {
    getAllProject();
  }, []);

  const getAllProject = async () => {
    const result = await fetchAllProjectApi();

    setDataProject(result.data.content);
  };

  return dataProject;
};
