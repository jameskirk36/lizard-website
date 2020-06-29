import React from 'react'
import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import './cms-utils'

import { HomePageTemplate } from '../templates/HomePage'
import { ServicesPageTemplate } from '../templates/ServicesPage'
import { ContactPageTemplate } from '../templates/ContactPage'
import { DefaultPageTemplate } from '../templates/DefaultPage'
import { BlogIndexTemplate } from '../templates/BlogIndex'
import { SinglePostTemplate } from '../templates/SinglePost'
import { NutritionIndexTemplate } from '../templates/NutritionIndex'
import { NutritionPostTemplate } from '../templates/NutritionPost'
import { RecipePostTemplate } from '../templates/RecipePost'

CMS.registerMediaLibrary(uploadcare)

if (
  window.location.hostname === 'localhost' &&
  window.localStorage.getItem('netlifySiteURL')
) {
  CMS.registerPreviewStyle(
    window.localStorage.getItem('netlifySiteURL') + '/styles.css'
  )
} else {
  CMS.registerPreviewStyle('/styles.css')
}


CMS.registerPreviewTemplate('home-page', ({ entry }) => (
  <HomePageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('services-page', ({ entry }) => (
  <ServicesPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('contact-page', ({ entry }) => (
  <ContactPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('infoPages', ({ entry }) => (
  <DefaultPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('blog-page', ({ entry }) => (
  <BlogIndexTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('posts', ({ entry }) => (
  <SinglePostTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('nutrition-page', ({ entry }) => (
  <NutritionIndexTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('nutrition-posts', ({ entry }) => (
  <NutritionPostTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('recipe-posts', ({ entry }) => (
  <RecipePostTemplate {...entry.toJS().data} />
))