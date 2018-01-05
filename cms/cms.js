import React from 'react'
import CMS from 'netlify-cms'

import { BlogPost } from 'site/templates/blog-post'

const BlogPostPreview = ({ entry, widgetFor }) => (
  <BlogPost body={widgetFor('body')} title={entry.getIn(['data', 'title'])} />
)

CMS.registerPreviewStyle('/styles.css')
CMS.registerPreviewTemplate('blog', BlogPostPreview)
