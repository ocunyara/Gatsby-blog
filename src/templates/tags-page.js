import React from 'react';

import Layout from '../components/layout'

import { Badge, Button } from 'reactstrap'
import { slugify } from '../util/utility'

const tagsPage = ({ pageContext }) => {
  const {tags, tagPostCounts} = pageContext

  return (
    <Layout pageTitle="Att tags">
      <ul>
        {tags.map(tag => (
          <li key={tag} style={{margin: '10px', float: 'left'}}>
            <Button color="primary" href={`/tag/${slugify(tag)}`}>
              {tag} <Badge color="light">{tagPostCounts[tag]}</Badge>
            </Button>
          </li>
        ))}
      </ul>
    </Layout>
  )
};

export default tagsPage