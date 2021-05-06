import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import Modal from "../components/Modal";
import projectService from "../network/projectService";
import sprintService from "../network/sprintService";
import { userService } from "../network/userService";
import "./Sprint.scss";

function Sprint(props) {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [members, setMembers] = useState([]);
  const [userDropdown, setUserDropdown] = useState([]);

  const { isLoading, data, error } = useQuery(["sprint", projectId], () =>
    sprintService.getSprintList(projectId)
  );

  const { isSuccess } = useQuery(
    ["project", "projectMembers", projectId],
    () => projectService.getProjectMembers(projectId),
    {
      onSuccess: (member) => {
        setMembers(member);
      },
    }
  );


  const { memberData } = useQuery(
    ["project", "userDropdown"],
    () => userService.getUsersList(),
    {
      onSuccess: (member) => {
        setUserDropdown(member.results);
      },
    }
  );

  const mutation = useMutation(
    (sprint) => sprintService.createSprint(projectId, sprint),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
        handleOk();
      },
    }
  );

  const inviteMember = useMutation(
    (user) => projectService.inviteMember(projectId, user),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("sprint");
      }
    }
  )

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showInviteModal = () => {
    setIsInviteModalVisible(true);
  };

  const handleInviteOk = () => {
    setIsInviteModalVisible(false);
  };

  const handleInviteCancel = () => {
    setIsInviteModalVisible(false);
  };

  if (isLoading) return "Loading...";

  if (error) return "Error...";

  const goToTasks = (sprintId) => {
    props.history.push(`/projects/${projectId}/sprint/${sprintId}/tasks`);
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

      {/* Invite Member Modal */}
      <Modal
        visible={isInviteModalVisible}
        onOk={handleInviteOk}
        onCancel={handleInviteCancel}
      >
        Invite member
        <Formik
          initialValues={{ user: "" }}
          onSubmit={async (values) => {
            inviteMember.mutate(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <label htmlFor="invite">Invite Member</label>
              <Field as="select" name="user">
                { userDropdown.map((member) => (
                  <option key={member.id} id={member.id} value={member.id}>
                    {member.username}
                  </option>
                ))}
              </Field>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
      {/* End */}
      <button onClick={showModal}> Add Sprint </button>
      <button onClick={showInviteModal}> Invite Member</button>
      {data.map((sprint) => (
        <div key={sprint.id}>
          <div onClick={() => goToTasks(sprint.id)}>Go to task</div>
          <div>{sprint.name}</div>
        </div>
      ))}
    </div>
  );
}

export default Sprint;
