import React, { Fragment } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'

import Content from '../components/Content'
import Layout from '../components/Layout'
import './SinglePost.css'

export const NutritionPostTemplate = ({
  title,
  date,
  body
}) => (
  <main>
    <article
      className="SinglePost section light"
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className="container skinny">
        <Link className="SinglePost--BackButton" to="/nutrition/">
          <ChevronLeft /> BACK
        </Link>
        <div className="SinglePost--Content relative">
          <div className="SinglePost--Meta">
            {date && (
              <time
                className="SinglePost--Meta--Date"
                itemProp="dateCreated pubdate datePublished"
                date={date}
              >
                {date}
              </time>
            )}
          </div>

          {title && (
            <h1 className="SinglePost--Title" itemProp="title">
              {title}
            </h1>
          )}

          <div className="SinglePost--InnerContent">
            <Content source={body} />
          </div>
        </div>
      </div>
    </article>
  </main>
)

// Export Default NutritionPost for front-end
const NutritionPost = ({ data: { post } }) => {
  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.title || false}
    >
      <NutritionPostTemplate
        {...post}
        {...post.frontmatter}
        body={post.html}
      />
    </Layout>
  )
}

export default NutritionPost

export const pageQuery = graphql`
  ## Query for NutritionPost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query NutritionPost($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      frontmatter {
        title
        template
        subtitle
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`
