import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'

import PageSectionHeader from '../components/PageSectionHeader'
import PostSection from '../components/PostSection'
import Layout from '../components/Layout'
import styles from './NutritionIndex.css'

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
  nutritionPosts = [],
  recipePosts = []
}) => (
  <Location>
    {() => {

      return (
        <main className="Blog">
          <PageSectionHeader
            title="Nutrition"
          />

          {!!nutritionPosts.length && (
            <section className="section">
              <div className="container">
                <PostSection posts={nutritionPosts} />
              </div>
            </section>
          )}
          {nutritionPosts.length == 0 && (
            <div className="container">
              <p className="empty">Nothing here at the moment.  Check back again soon.</p>
            </div>
          )}

          <PageSectionHeader
            title="Recipes"
          />
          {!!recipePosts.length && (
            <section className="section">
              
              <div className="container">
                <PostSection posts={recipePosts} />
              </div>
            </section>
          )}

          {recipePosts.length == 0 && (
            <div className="container">
              <p className="empty">Nothing here at the moment.  Check back again soon.</p>
            </div>
          )}

        </main>
      )
    }}
  </Location>
)

// Export Default NutritionIndex for front-end
const NutritionIndex = ({ data: { page, nutritionPosts, recipePosts } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title="Nutrition"
  >
    <NutritionIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      nutritionPosts={nutritionPosts.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      recipePosts={recipePosts.edges.map(post => ({
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
        excerpt
        template
      }
    }

    nutritionPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "nutrition-posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            featuredImage
            excerpt
          }
        }
      }
    }

    recipePosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "recipe-posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            featuredImage
            excerpt
          }
        }
      }
    }
  }
`
