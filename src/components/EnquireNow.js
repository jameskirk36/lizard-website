import React from 'react'

import './EnquireNow.css'

export default ({text, link}) => (
  <div className="enquire-now-container">
    <a href={link} className="enquire-now">{text}</a>
  </div>
)
