import React from 'react'
import { Card, CardTitle,CardText, CardBody, Form, FormGroup, Input } from 'reactstrap'

import { graphql, StaticQuery } from "gatsby";
import Img from 'gatsby-image'
import { Link } from 'gatsby'

const Sidebar = ({ author, authorFluid }) => (
  <div>
    {author && (
      <Card>
        <Img className="card-image-top" fluid={authorFluid} />
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">
            {author.name}
          </CardTitle>
          <CardText>{author.bio}</CardText>
        </CardBody>
      </Card>
    )}
    <Card>
      <CardBody>
        <CardTitle className="text-center text-uppercase mb-3">
          Newsletter
        </CardTitle>
        <Form className="text-center">
          <FormGroup>
            <Input type="email" name="email" className="style-input" placeholder="Email"/>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <CardTitle className="text-center text-uppercase">
          Recent Posts
        </CardTitle>
        <StaticQuery query={sidebarQuery} render={data => {
          return (
            <div>
              {data.allMarkdownRemark.edges.map(({ node }) => (
                <Card key={node.id} >
                  <Link to={`/${node.fields.slug}`}>
                    <Img className="card-image-top" fluid={node.frontmatter.image.childImageSharp.fluid}/>
                  </Link>
                  <CardBody>
                    <CardTitle><Link to={`/${node.fields.slug}`}>{node.frontmatter.title}</Link></CardTitle>
                  </CardBody>
                </Card>
              ))}
            </div>
          )
        }}></StaticQuery>
      </CardBody>
    </Card>
  </div>
)


const sidebarQuery = graphql`
  query sidebarQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges{
        node{
          id
          frontmatter{
            title
            image{
              childImageSharp{
                fluid(maxWidth: 300){
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields{
            slug
          }
        }
      }
    }
  }
`

export default Sidebar