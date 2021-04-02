import React from 'react';
import CommentsItem from './comments-item';
import CommentForm from './CommentForm';

const url = 'https://ancient-sierra-96481.herokuapp.com'

class CommentsBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      comment: '',
      comments: [
      ],

    }
    
    window.onload = () => {
      const comments = []
      fetch(url)
      .then(responce => responce.json())
      .then(data => {
        console.log(data)
        for (let i in data) {
          comments.push(data[i])
        }
        this.setState({comments: comments})
      })
    }


  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeComment(event) {
    this.setState({comment: event.target.value});
  }

  
  addComment(ev) {
    ev.preventDefault()
    const comments = this.state.comments;
    if (this.state.name && this.state.comment) {
      const options = { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'};
      comments.push({
        id: Math.floor(Math.random() * 10000),
        name: this.state.name,
        comment: this.state.comment,
        date: new Date().toLocaleString('ru', options)
      });
    fetch(`${url}/comments_table`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: comments[comments.length - 1].id,
        name: comments[comments.length - 1].name,
        comment: comments[comments.length - 1].comment,
        date: comments[comments.length - 1].date
      })
    })  
    .then(responce => console.log(responce.text()))
  }

    this.setState({comments});
    this.setState({name: ''})
    this.setState({comment: ''});
  }

  deleteComment(id, index) {
    const comments = this.state.comments;
    fetch(`${url}/comments_table/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(responce => console.log(responce.text()))
    comments.splice(index, 1);
    this.setState({comments});
  }

  render() {
    return (
      <aside className="comments-block">
        <h1 className="comments-block__title">Комментарии</h1>

        <CommentForm
          name={this.state.name}
          comment={this.state.comment}
          handleChangeName={this.handleChangeName.bind(this)}
          handleChangeComment={this.handleChangeComment.bind(this)}
          addComment={this.addComment.bind(this)}
        />

        <ul className="comments-block__ul">
          { 
            this.state.comments.map((comment, i) => {
              if(this.state.comments.length > 0) {
                return (
                  <CommentsItem
                    key={i}
                    name={comment.name}
                    comment={comment.comment}
                    date={comment.date}
                    deleteComment={this.deleteComment.bind(this, comment.id, i)}
                    />
                );
              }

            })

          }
        </ul>
      </aside>
    );
  };
};

export default CommentsBlock;
