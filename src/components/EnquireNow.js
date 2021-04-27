import React from 'react'

import './EnquireNow.css'

export default ({text, link, moveadjust=false}) => {
  let className = "enquire-now";
  if (moveadjust) className += ' moveadjust';
  return (
    <div className="enquire-now-container">
      <a href={link} className={className}>{text}</a>
    </div>)
}
