import React from "react";

const BoardCard = (props) => {
  return (
    <div>
      {props.name}
      {props.taskPriority}
    </div>
  );
};

export default BoardCard;
