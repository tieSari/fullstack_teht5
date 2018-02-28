import React from 'react'
import Blog from './components/Blog'
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
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newBlog,
      author: ''
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.notes.concat(newBlog),
          newBlog: ''
        })
      })
  }
  

 login = async (event) => {
  event.preventDefault()
  try{
    const user = await loginService.login({
      username: this.state.username,
      password: this.state.password
    })

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

  handleBlogChange = (event) => {
    this.setState({ newBlog: event.target.value })
  }

  handleLoginFieldChange = (event) => {
  this.setState({ [event.target.name]: event.target.value })
}

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

       // <Notification message={this.state.error} />

        // <h2>Luo uusi blogi</h2>

        // <form onSubmit={this.addBlog}>
        //   <input
        //     value={this.state.newBlog}
        //     onChange={this.handleBlogChange}
        //   />
        //   <button type="submit">tallenna</button>
        // </form>

  render() {
    if (this.state.user === null) {
    return (
      <div>
        <h1>Blogs</h1>


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
        <h3>user {this.state.user.name} logged in </h3>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    )
  }

}
export default App;
