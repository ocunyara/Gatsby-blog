import React from 'react'
import { Link } from 'gatsby'
import { Card, CardSubtitle, CardBody, CardText, CardTitle, Badge } from 'reactstrap'
import Img from 'gatsby-image'

import { slugify } from '../util/utility'

export const Post = ({ title, author, path, data, body, fluid, tags }) => {
  return (
    <Card>
      <Link to={path}>
        <Img className="card-img-top" fluid={fluid} />
      </Link>
      <CardBody>
        <CardTitle>
          <Link to={path}>{title}</Link>
        </CardTitle>
        <CardSubtitle>
          <span className="text-info">{data}</span> by {''}
          <span className="text-info">{author}</span>
        </CardSubtitle>
        <CardText>{body}</CardText>
        <ul className="post-tags">
          {tags.map(tag => (
            <li>
              <Link to={`/tag/${slugify(tag)}`} >
                <Badge color="primary" className="text-uppercase">{tag}</Badge>
              </Link>
            </li>
          ))}
        </ul>
        <Link to={path} className="btn btn-outline-primary float-right">Read more</Link>
      </CardBody>
    </Card>
  )
}