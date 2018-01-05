import React from 'react'
import Link from 'gatsby-link'
import Script from 'react-load-script'

export default class Home extends React.Component {
  handleScriptLoad() {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/'
          })
        }
      })
    }
    window.netlifyIdentity.init()
  }

  render() {
    const { pathContext } = this.props

    const blogEntries = Object.keys(pathContext).map(key => {
      const blog = pathContext[key]
      return (
        <Link key={key} to={`/blog/${key}`}>
          <h1>{blog.title}</h1>
          <p>{blog.description}</p>
        </Link>
      )
    })

    return (
      <section className="section">
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <div className="container">{blogEntries}</div>
      </section>
    )
  }
}
