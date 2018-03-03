import React from 'react'
import blogService from '../services/blogs'
import Notification from '../components/Notification'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newBlog: '',
      title: '',
      author: '',
      url: '',
      error: null
    }
  }

  handleLoginFieldChange = (event) => {
  this.setState({ [event.target.name]: event.target.value })
}

addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

   console.log(this.state.blogs) 
    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          newBlog: '',
          error: `käyttäjä ${this.state.author} luonut blogin ${this.state.title}`,
    })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
      })
  }

  render() {
    const style = {
      color: 'green',
    background: 'lightgrey',
  'font-size': 20,
  'border-style': 'solid',
  'border-radius': 5,
  padding: 10,
  'margin-bottom': 10
}
      return (
      <div>

        <h2>Luo uusi blogi</h2>
 <Notification message={this.state.error} style={style}/>
         <form onSubmit={this.addBlog}>
  <div>
    title
    <input
      type="text"
      name="title"
      value={this.state.title}
      onChange={this.handleLoginFieldChange}
    />
  </div>
  <div>
    author
    <input
      type="text"
      name="author"
      value={this.state.author}
      onChange={this.handleLoginFieldChange}
    />
  </div>
    <div>
    url
    <input
      type="text"
      name="url"
      value={this.state.url}
      onChange={this.handleLoginFieldChange}
    />
  </div>
  <button type="submit">create</button>
</form>
</div>
      )}
}

  export default BlogForm;