import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

import { useQuery, useQueryClient } from "react-query";
import { useMutation } from "react-query";
import Modal from "../components/Modal";
import ProjectCard from "../components/ProjectCard";
import projectService from "../network/projectService";

import "./Project.scss"

export default function Project(props) {


  const queryClient = useQueryClient();
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

  const mutation = useMutation((project) => projectService.createProject(project), {
    onSuccess: () => {
      queryClient.invalidateQueries("projects")
    }
  });


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
              <Formik
                initialValues={{name: ''}}
                onSubmit={async (values) => {
                  mutation.mutate(values)
                }}
              >
                {({isSubmitting}) => (
                <Form>
                  <label htmlFor="name">Project Name</label>
                  <Field id="name" name="name" placeholder="Example" />
                  <button type="submit" disabled={isSubmitting} >
                    Submit
                  </button>
                </Form>
                )}
              </Formik>
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
