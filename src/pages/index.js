import React from "react"
import { graphql, StaticQuery } from 'gatsby'

import { Post } from "../components/Post"
import Layout from "../components/layout"
import PaginationLinks from '../components/pagination'

const IndexPage = () => {
  const postsPerPage = 2
  let numberOfPages = null

  return (
    <Layout pageTitle="Post blog">
      <StaticQuery query={indexQuery} render={
          data => {
            numberOfPages = Math.ceil(
              data.allMarkdownRemark.totalCount / postsPerPage
            )
            return (
              <div>
                {data.allMarkdownRemark.edges.map(({node}) => (
                  <Post
                    key={node.id}
                    title={node.frontmatter.title}
                    author={node.frontmatter.author}
                    date={node.frontmatter.date}
                    body={node.excerpt}
                    slug={node.fields.slug}
                    fluid={node.frontmatter.image.childImageSharp.fluid}
                    tags={node.frontmatter.tags}
                  />
                ))}
                <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
              </div>
            )
      }}></StaticQuery>
    </Layout>
  )
}

const indexQuery = graphql`
query{
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }
    limit: 2
  ){
    totalCount,
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

export default IndexPage
