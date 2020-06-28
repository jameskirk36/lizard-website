import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'

import PageHeader from '../components/PageHeader'
import PostSection from '../components/PostSection'
import Layout from '../components/Layout'

/**
 * Filter posts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {posts} object
 */
export const byDate = posts => {
  const now = Date.now()
  return posts.filter(post => Date.parse(post.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {posts} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (posts, title, contentType) => {
  const isCategory = contentType === 'postCategories'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? posts.filter(byCategory) : posts
}

// Export Template for use in CMS preview
export const NutritionIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  posts = []
}) => (
  <Location>
    {() => {

      return (
        <main className="Blog">
          <PageHeader
            title={title}
            subtitle={subtitle}
            backgroundImage={featuredImage}
          />

          {!!posts.length && (
            <section className="section">
              <div className="container">
                <PostSection posts={posts} />
              </div>
            </section>
          )}
        </main>
      )
    }}
  </Location>
)

// Export Default NutritionIndex for front-end
const NutritionIndex = ({ data: { page, posts } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <NutritionIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      posts={posts.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default NutritionIndex

export const pageQuery = graphql`
  ## Query for NutritionIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query NutritionIndex($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        excerpt
        template
        subtitle
        featuredImage
      }
    }

    posts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "nutrition-posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            featuredImage
          }
        }
      }
    }
  }
`
