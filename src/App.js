import React, { Component } from "react";
import logo from "./logo.svg";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import firebase from "./firebase";
import "./App.css";

class App extends Component {
  state = {
    form: {
      name: "",
      comment: ""
    },
    comments: []
  };

  componentDidMount() {
    firebase
      .database()
      .ref("comments")
      .on("value", snapshot => {
        const response = snapshot.val();
        const comments = !!response
          ? Object.keys(response).map(uid => ({
              ...response[uid],
              uid
            }))
          : [];
        this.setState({
          comments
        });
      });
  }

  onChangeName = event => {
    const { value } = event.target;
    this.setState({
      form: {
        ...this.state.form,
        name: value
      }
    });
  };

  onChangeComment = event => {
    const { value } = event.target;
    this.setState({
      form: {
        ...this.state.form,
        comment: value
      }
    });
  };

  onRemove = uid => {
    const commentRef = firebase
      .database()
      .ref("comments")
      .child(uid);
    commentRef.remove();
  };

  onSubmit = async event => {
    event.preventDefault();
    const comment = {
      ...this.state.form,
      createdAt: new Date().getTime()
    };
    await firebase
      .database()
      .ref("comments")
      .push(comment);
    this.setState({
      form: {
        name: "",
        comment: ""
      }
    });
  };

  onEdit = uid => {
    const commentRef = firebase.database().ref(`comments/${uid}`);
    commentRef.update({
      name: "Nome editado",
      comment: "Comentário editado"
    });
  };

  render() {
    const { comments, form } = this.state;
    const { name, comment } = form;
    return (
      <div className="App">
        <CommentForm
          name={name}
          comment={comment}
          onChangeName={this.onChangeName}
          onChangeComment={this.onChangeComment}
          onSubmit={this.onSubmit}
        />
        <CommentList
          comments={comments}
          onRemove={this.onRemove}
          onEdit={this.onEdit}
        />
      </div>
    );
  }
}

export default App;
