import React from 'react'
import blogService from '../services/blogs'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newBlog: '',
      title: '',
      author: '',
      url: ''
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
          newBlog: ''
        })
      })
  }

  render() {
      return (
      <div>

        <h2>Luo uusi blogi</h2>

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