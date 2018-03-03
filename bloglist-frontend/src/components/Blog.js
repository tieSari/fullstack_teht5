import React from 'react'
import Togglable from '../components/Togglable'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({blog}) => (

  <div style={blogStyle}>
    <Togglable buttonLabel={blog.title}>
     <div>{blog.author}</div>
     <div>{blog.url}</div>
     <div>{blog.likes} likes</div>
     <button> like </button>
     <div>Added by {blog.user.name}</div>
     </Togglable>
  </div>  
)

export default Blog