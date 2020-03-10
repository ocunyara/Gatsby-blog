import React from 'react'

import Layout from "../components/layout";
import { Post } from "../components/Post";
import PaginationLinks from '../components/pagination'

import { graphql } from 'gatsby'


const postList = (props) => {
  const posts = props.data.allMarkdownRemark.edges
  const { currentPage, numberOfPages } = props.pageContext

  return(
    <Layout pageTitle={`Page: ${currentPage}`}>
      {posts.map(({node}) => (
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
      <PaginationLinks currentPage={currentPage} numberOfPages={numberOfPages} />
    </Layout>
  )
};

  export const postListQuery = graphql`
  query postListQuery($skip: Int!, $limit: Int!){
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip 
    ){
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


export default postList