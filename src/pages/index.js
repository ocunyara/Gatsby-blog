import React from "react"
import { graphql, StaticQuery } from 'gatsby'

import { Post } from "../components/Post"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (

  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <StaticQuery query={indexQuery} render={data => {
      return (
        <div>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <Post
              title={node.frontmatter.title}
              author={node.frontmatter.author}
              data={node.frontmatter.data}
              body={node.excerpt}
              path={node.frontmatter.path}
              fluid={node.frontmatter.image.childImageSharp.fluid}
            />
          ))}
        </div>
      )
    }}></StaticQuery>
  </Layout>
)

const indexQuery = graphql`
query{
  allMarkdownRemark(sort: { fields: [frontmatter___data], order: DESC }){
    edges{
      node{
        frontmatter{
          title
          data(formatString: "MMM Do YYYY")
          author
          path
          image {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        excerpt
      }
    }
  }
}

`;

export default IndexPage
