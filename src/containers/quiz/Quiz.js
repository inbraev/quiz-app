import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import {
  fetchQuizById,
  quizAnswerClick,
  retryQuiz,
} from "../../store/actions/quiz";
class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }
  componentWillUnmount() {
    this.props.retryQuiz();
  }
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {this.props.loading || !this.props.quiz ? (
            <Loader></Loader>
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.props.retryQuiz}
            />
          ) : (
            <ActiveQuiz
              answers={this.props.quiz[this.props.activeQuestion].answers}
              question={this.props.quiz[this.props.activeQuestion].question}
              onAnswerClick={this.props.quizAnswerClick}
              quizLength={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              state={this.props.answerState}
            ></ActiveQuiz>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    loading: state.quiz.loading,
    isFinished: state.quiz.isFinished,
    results: state.quiz.results,
    activeQuestion: state.quiz.activeQuestion,
    quiz: state.quiz.quiz,
    answerState: state.quiz.answerState,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (id) => dispatch(quizAnswerClick(id)),
    retryQuiz: () => dispatch(retryQuiz()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
