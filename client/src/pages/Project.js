import React, { useState } from "react";

import { useQuery } from "react-query";
import Modal from "../components/Modal";
import ProjectCard from "../components/ProjectCard";
import projectService from "../network/projectService";

import "./Project.scss"

export default function Project(props) {
  const { isLoading, data, error } = useQuery(
    "projects",
    projectService.getProjectList
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  if (isLoading) return "Loading...";

  if (error) return "Error...";

  const goToProjectDetails = (id) => {
    props.history.push(`/projects/${id}`)
  }

  return (
    <React.Fragment>
          <Modal visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            >
              Add Project
          </Modal>
          <button onClick={showModal} />
      <div className="grid-container">
        {
          data.map(project => 
            <ProjectCard 
              goToProjectDetails={goToProjectDetails} 
              key={project.id} 
              className="grid-item" 
              project={project} 
              />
            )
        }
      </div>
    </React.Fragment>
  );
}
