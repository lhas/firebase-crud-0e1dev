import React from "react";
import PropTypes from "prop-types";

const CommentList = ({ comments, onRemove, onEdit }) => (
  <div style={{ marginTop: 20 }}>
    {comments.map(comment => (
      <div key={comment.uid}>
        <strong>Nome: {comment.name}</strong>
        <p>Comentário: {comment.comment}</p>
        <em>Postado em {comment.createdAt}</em>
        <button onClick={() => onRemove(comment.uid)}>Excluir</button>
        <br />
        <button onClick={() => onEdit(comment.uid)}>Editar</button>
        <hr />
      </div>
    ))}
    {comments.length === 0 && <p>Nenhum comentário encontrado!</p>}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.array,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func
};

CommentList.defaultProps = {
  comments: [],
  onRemove: () => {},
  onEdit: () => {}
};

export default CommentList;
