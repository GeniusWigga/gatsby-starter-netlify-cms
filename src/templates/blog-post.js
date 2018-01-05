import React from 'react'

export const BlogPost = ({ title, body }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  )
}

export default ({ pathContext }) => {
  const { title, body } = pathContext

  return <BlogPost title={title} body={body} />
}
