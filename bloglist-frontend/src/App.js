import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: '',
      showAll: true,
      error: null,
      username: '',
      password: '',
      user: null,
      likes:0
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    this.setState({user})
    blogService.setToken(user.token)
  }
  }

  // addBlog = (event) => {
  //   event.preventDefault()
  //   const blogObject = {
  //     title: this.state.newBlog,
  //     author: ''
  //   }

  //   blogService
  //     .create(blogObject)
  //     .then(newBlog => {
  //       this.setState({
  //         blogs: this.state.notes.concat(newBlog),
  //         newBlog: ''
  //       })
  //     })
  // }
  

 login = async (event) => {
  event.preventDefault()
  try{
    const user = await loginService.login({
      username: this.state.username,
      password: this.state.password
    })
 window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)

    this.setState({ username: '', password: '', user})
  } catch(exception) {
    this.setState({
      error: 'käyttäjätunnus tai salasana virheellinen',
    })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }
}
//  blogAdded = (newBlog) => {
//   this.setState({blogs: this.state.blogs.concat(newBlog)})
// }

  handleBlogChange = (blog) => {
    const currBlog = blog
    console.log('log' ,blog)
    const blogObject = {
      _id: currBlog._id,
      title: currBlog.title,
      author: currBlog.author,
      url: currBlog.url,
      likes: currBlog.likes + 1,
      user: currBlog.user
    }

    blogService.update(blogObject._id, blogObject)
  }

  handleLoginFieldChange = (event) => {
  this.setState({ [event.target.name]: event.target.value })
}

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }
  handleSignOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({user: null})
  }


       // 

        // <h2>Luo uusi blogi</h2>

        // <form onSubmit={this.addBlog}>
        //   <input
        //     value={this.state.newBlog}
        //     onChange={this.handleBlogChange}
        //   />
        //   <button type="submit">tallenna</button>
        // </form>

  render() {
            const style = {
      color: 'red',
  background: 'lightgrey',
  'font-size': 20,
  'border-style': 'solid',
  'border-radius': 5,
  padding: 10,
  'margin-bottom': 10
            }

    if (this.state.user === null) {
    return (
      <div>
        <h1>Blogs</h1>
    <Notification message={this.state.error} style={style} />

        <h2>Kirjaudu</h2>

<form onSubmit={this.login}>
  <div>
    käyttäjätunnus
    <input
      type="text"
      name="username"
      value={this.state.username}
      onChange={this.handleLoginFieldChange}
    />
  </div>
  <div>
    salasana
    <input
      type="password"
      name="password"
      value={this.state.password}
      onChange={this.handleLoginFieldChange}
    />
  </div>
  <button type="submit">kirjaudu</button>
</form>
</div>
    )
    }

       return(  
         <div>    
        <h2>blogs</h2>
        <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
          <BlogForm></BlogForm>
        </Togglable>
        <h3>user {this.state.user.name} logged in </h3> <button onClick={this.handleSignOut}>LogOut</button>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog} handleBlogChange={this.handleBlogChange}/>
        )}
      </div>
    )
  }

}
export default App;
