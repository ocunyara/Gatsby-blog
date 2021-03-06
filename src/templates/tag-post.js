import React from 'react'
import Layout from "../components/layout";
import { Post } from "../components/Post";

import { graphql } from 'gatsby'

const tagPost = ({data, pageContext}) => {
  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const pageHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`

  return (
    <Layout pageTitle={pageHeader}>
      {data.allMarkdownRemark.edges.map(({node}) => (
        <Post key={node.id}
              slug={node.fields.slug}
              author={node.frontmatter.author}
              title={node.frontmatter.title}
              body={node.excerpt}
              tags={node.frontmatter.tags}
              data={node.frontmatter.data}
              fluid={node.frontmatter.image.childImageSharp.fluid}
        />
      ))}
    </Layout>
  )
};

export const tagQuery = graphql`
  query($tag: String!){
    allMarkdownRemark(
      sort: { fields: [frontmatter___date] }
      filter: {frontmatter: {tags: {in: [$tag]}}} 
    ){
      totalCount
      edges{
        node{
          id
          frontmatter{
            title
            date(formatString: "MMM Do YYYY")
            author
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields{
            slug
          }
          excerpt
        }
      }
    }
  }
`;

export default tagPost