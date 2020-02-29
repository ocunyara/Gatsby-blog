import React from "react"
import { graphql, StaticQuery } from 'gatsby'

import { Post } from "../components/Post"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { Row, Col } from 'reactstrap';

import { Sidebar } from '../components/Sidebar'

const IndexPage = () => (

  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <Row>
      <Col md="8">
        <StaticQuery query={indexQuery} render={data => {
          return (
            <div>
              {data.allMarkdownRemark.edges.map(({ node }) => (
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
            </div>
          )
        }}></StaticQuery>
      </Col>
      <Col md="4">
        <Sidebar></Sidebar>
      </Col>
    </Row>
  </Layout>
)

const indexQuery = graphql`
query{
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }){
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
