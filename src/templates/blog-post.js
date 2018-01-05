import React from 'react'
import Content, { HTMLContent } from '../components/Content'
import Helmet from 'react-helmet'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  return (
    <section className="section">
      {helmet ? helmet : ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ({ data }) => {
  const { markdownRemark: post } = data

  if(!post) {
    console.log("data: ", data);
    return;
  }

  return (
    <div>Test Blog</div>
  )
}

// export const pageQuery = graphql`
//   query BlogPostByPath($path: String!) {
//     markdownRemark(frontmatter: { path: { eq: $path } }) {
//       html
//       frontmatter {
//         path
//         date(formatString: "MMMM DD, YYYY")
//         title
//         description
//       }
//     }
//   }
// `
