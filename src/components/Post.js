import React from 'react'
import { Link } from 'gatsby'
import { Card, CardSubtitle, CardBody, CardText, CardTitle } from 'reactstrap'
import Img from 'gatsby-image'

export const Post = ({ title, author, path, data, body, fluid }) => {
  return (
    <Card>
      <Img className="card-img-top" fluid={fluid} />
      <CardBody>
        <CardTitle>
          <Link to={path}>{title}</Link>
        </CardTitle>
        <CardSubtitle>
          <span className="text-info">{data}</span> by {''}
          <span className="text-info">{author}</span>
        </CardSubtitle>
        <CardText>{body}</CardText>
        <Link to={path} className="btn btn-outline-primary float-right">Read more</Link>
      </CardBody>
    </Card>
  )
}