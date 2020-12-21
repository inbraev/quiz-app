import React from "react";
import classes from "./AnswerList.module.css";
import AnswerItem from "./AnswerItem/AnswerItem";
const AnswerList = (props) => {
  return (
    <ul className={classes.AnswerList}>
      {props.answers.map((answer, index) => {
        return (
          <AnswerItem
            answer={answer}
            state={props.state ? props.state[answer.id] : null}
            key={index}
            onAnswerClick={props.onAnswerClick}
          />
        );
      })}
    </ul>
  );
};
export default AnswerList;
