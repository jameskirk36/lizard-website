import React from 'react'
import PropTypes from 'prop-types'

import './PageSectionHeader.css'

const PageSectionHeader = ({
  title,
  className = ''
}) => {
  return (
    <div className={`PageSectionHeader relative ${className}`}>
      <div className="container relative">
        <h1 className="PageSectionHeader--Title">{title}</h1>
      </div>
    </div>
  )
}

PageSectionHeader.propTypes = {
  title: PropTypes.string
}

export default PageSectionHeader
