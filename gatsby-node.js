const path = require('path')
const { slugify } = require('./src/util/utility');

const _ = require('lodash')

const authors = require('./src/util/authors')

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: 'slug',
      value: slugFromTitle,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const tamplates = {
    singlePost: path.resolve('src/templates/single-post.js'),
    tagsPage: path.resolve('src/templates/tags-page.js'),
    tagPost: path.resolve('src/templates/tag-post.js')
  }

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors)

    const posts = res.data.allMarkdownRemark.edges

    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: tamplates.singlePost,
        context: {
          // Passing slug for template to use to fetch the post
          slug: node.fields.slug,
          imageUrl: authors.find(x => x.name === node.frontmatter.author).imageUrl
        }
      })
    })

    // Get all tags
    let tags = []
    _.each(posts, edge => {
      if (_.get(edge, 'node.frontmatter.tags')) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })

    let tagPostCounts = {} // { tutorial: 2, design: 1}
    tags.forEach(tag => {
      // Or 0 cause it might not exist yet
      tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1
    })

    // Remove duplicates
    tags = _.uniq(tags)

    // Tags page (all tags)
    createPage({
      path: '/tags',
      component: tamplates.tagsPage,
      context: {
        tags,
        tagPostCounts,
      },
    })

    // Tag post
    tags.forEach(tag => {
      createPage({
        path: `/tag/${slugify(tag)}`,
        component: tamplates.tagPost,
        context: {
          tag,
        }
      })
    })

  })
};


// You can delete this file if you're not using it
