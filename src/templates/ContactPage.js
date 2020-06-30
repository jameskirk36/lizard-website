import React from 'react'
import { MapPin } from 'react-feather'
import { graphql } from 'gatsby'

import EnquiryForm from '../components/EnquiryForm'
import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import OpenStreetMap from '../components/OpenStreetMap'
import Layout from '../components/Layout'

import './font-awesome-4.7.0.min.css'
import './ContactPage.css'

// Export Template for use in CMS preview
export const ContactPageTemplate = ({
  body,
  title,
  subtitle,
  featuredImage,
  address,
  phone,
  email,
  locations
}) => (
  <main className="Contact">
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
    <section className="section Contact--Section1">
      <div className="container Contact--Section1--Container">
        <div>
          <Content source={body} />
            
          <a href="https://www.facebook.com/lizkirkPT" class="fa fa-facebook"></a>
          <a href="https://www.instagram.com/lizkirk_pt/" class="fa fa-instagram"></a>
          <a href="https://www.linkedin.com/in/elizabeth-kirk-422b861a4" class="fa fa-linkedin"></a>
          <a href="https://www.youtube.com/channel/UC-f1fW6So4gq8L3y5cYDaHQ" class="fa fa-youtube-play"></a>
          <EnquiryForm/>
          <div className="Contact--Details">
            {address && (
              <a
                className="Contact--Details--Item"
                href={`https://www.google.com/maps/search/${encodeURI(
                  address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin /> {address}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>

    {typeof window !== 'undefined' &&
        <OpenStreetMap
          position={locations[0]}
          zoom={12}
          markerText={address}
        />
    }
  </main>
)

const ContactPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ContactPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ContactPage

export const pageQuery = graphql`
  query ContactPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage
        address
        phone
        email
        locations {
          mapLink
          lat
          lng
        }
      }
    }
  }
`
