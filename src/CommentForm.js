import React from 'react';

const CommentForm = (props) => {
    return (
        <form className="comments-block__inputs" onSubmit={props.addComment}>
            <input
                type="text" 
                value={props.name} 
                className="comments-block__input_name"
                placeholder="Введите Имя"
                required={true}
                onChange = {props.handleChangeName}
            />

            <textarea
                value={props.comment} 
                className="comments-block__input_comment" 
                placeholder="Ваш комментарий" 
                required={true}
                onChange={props.handleChangeComment}
            />

            <button 
                type="submit" 
                className="comments-block__btn-add"
            >
                Добавить комментарий
            </button> 
      </form> 
    )
}

export default CommentForm;