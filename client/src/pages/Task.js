import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import Modal from "../components/Modal";
import taskService from "../network/taskService";

const Task = (props) => {
  const { projectId, sprintId } = useParams();
  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery(
    ["tasks", sprintId, projectId],
    () => taskService.getTaskList(projectId, sprintId)
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const mutation = useMutation(
    (task) => taskService.createTask(projectId, sprintId, task),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
        handleOk();
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

  const goToBoard = (sprintId) => {
    props.history.push(`/projects/${projectId}/sprint/${sprintId}/board`);
  };

  if (isLoading) return "Loading...";

  if (error) return "Error...";

  return (
    <div>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        Add Task
        <Formik
          initialValues={{ name: "" }}
          onSubmit={async (values) => {
            mutation.mutate(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <label htmlFor="name">Task Name</label>
              <Field id="name" name="name" placeholder="Example" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
      <button onClick={showModal}> Add Task</button>
      <div onClick={() => goToBoard(sprintId)}>Go to Board</div>
      
      { data.map((task) => (
        <div>
          <div>{task.name}</div>
          <div>{task.taskPriority}</div>
        </div>
      ))}
    </div>
  );
};


export default Task