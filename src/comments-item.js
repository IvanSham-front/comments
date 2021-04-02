import React from 'react';

const CommentsItem = (props) => {
    return (
        <li className="comments-block__li">
            <div>
                <span className="comments-block__name-author">{props.name}</span>
                <p className="comments-block__name-comment">{props.comment}</p>
            </div>

            <div>
                <span className="comments-block__date-comment">
                {props.date}
                </span>
                <button
                className="comments-block__btn-close"
                onClick={props.deleteComment}
                title="Удалить комментарий"
                >
                X
                </button>
            </div>

        </li>
    )
}

export default CommentsItem;