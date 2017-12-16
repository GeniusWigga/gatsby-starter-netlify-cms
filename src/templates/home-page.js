import React from 'react';

export const HomePageTemplate = ({title, sliderImages}) => {
  return <section className="section section--gradient">
    <div className="container">
      <div>{title}</div>
      {sliderImages.map((image, i) => (<img key={i} src={image.src} />))}
    </div>
  </section>;
};

export default ({data}) => {
  const {markdownRemark: post} = data;
  return <HomePageTemplate
    sliderImages={post.sliderImages}
  />;
};

export const aboutPageQuery = graphql`
  query AboutPage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
