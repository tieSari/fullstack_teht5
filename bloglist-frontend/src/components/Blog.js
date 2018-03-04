import React from 'react'
import Togglable from '../components/Togglable'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}



const Blog = ({blog, handleBlogChange}) => (

  <div style={blogStyle}>
    <Togglable buttonLabel={blog.title}>
     <div>{blog.author}</div>
     <div>{blog.url}</div>
     <div>{blog.likes} likes</div>
     <button onClick={handleBlogChange}> like </button>
     <div>Added by {blog.user.name}</div>
     </Togglable>
  </div>  
)

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog