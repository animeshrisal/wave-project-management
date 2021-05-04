import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import Modal from "../components/Modal";
import TaskTable from "../components/TaskTable";
import sprintService from "../network/sprintService";
import "./Sprint.scss";

export default function Task(props) {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery(["tasks", projectId], () =>
    sprintService.getSprintList(projectId)
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const mutation = useMutation(
    (sprint) => sprintService.createSprint(projectId, sprint),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
    }
  );

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

  const goToBoard = (sprintId) => {
    props.history.push(`/projects/${projectId}/sprint/${sprintId}/board`);
  };

  return (
    <div>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        Add Project
        <Formik
          initialValues={{ name: "" }}
          onSubmit={async (values) => {
            mutation.mutate(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <label htmlFor="name">Sprint Name</label>
              <Field id="name" name="name" placeholder="Example" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
      <button onClick={showModal}> Add Sprint </button>
      {data.map((sprint) => (
        <div>
          <div onClick={() => goToBoard(sprint.id)}>Go to Board</div>
          <div>{sprint.name}</div>
          <TaskTable goToBoard={goToBoard} data={sprint.tasks} />
        </div>
      ))}
    </div>
  );
}
