import React from 'react'
import CMS from 'netlify-cms'

import { BlogPostTemplate } from 'site/templates/blog-post'

const BlogPostPreview = ({ entry, widgetFor }) => (
  <BlogPostTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    title={entry.getIn(['data', 'title'])}
  />
)

CMS.registerPreviewStyle('/styles.css')
CMS.registerPreviewTemplate('blog', BlogPostPreview)
