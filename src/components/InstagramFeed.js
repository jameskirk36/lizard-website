import React, { Component } from 'react'
import Image from '../components/Image'

import './InstagramFeed.css'

// A quick way to get your access token
// https://instagram.pixelunion.net/

export default class InstagramFeed extends Component {
  static defaultProps = {
    accessToken: `${process.env.GATSBY_INSTAGRAM_API_TOKEN}`,
    count: 20
  }

  state = {
    mounted: false,
    posts: []
  }

  clearStorage() {
    const lastclear = localStorage.getItem('lastclear'),
      time_now = new Date().getTime()
    // .getTime() returns milliseconds so 1000 * 60 * 60 * 24 = 1 days
    if (time_now - lastclear > 1000 * 60 * 60 * 1) {
      localStorage.clear()
      localStorage.setItem('lastclear', time_now)
    }
  }

  componentDidMount() {
    this.clearStorage()
    if (!this.state.mounted) {
      this.fetchInstagram()
      this.setState({
        mounted: true
      })
    }
  }

  fetchInstagram = () => {
    let instaFeed = localStorage.getItem('instaFeed')
      ? localStorage.getItem('instaFeed')
      : false

    if (!instaFeed) {
      let url = `https://graph.instagram.com/me/media?fields=media_url&access_token=${this.props.accessToken}`;
      typeof window !== 'undefined' &&
        fetch(url)
          .then(res => res.json())
          .then(({data}) => {
            instaFeed = [...data];
            localStorage.setItem('instaFeed', JSON.stringify(instaFeed))
            this.setState({
              posts: instaFeed
            })
          })
          .catch(err => console.error(err))
    }
    this.setState({
      posts: JSON.parse(instaFeed)
    })
  }

  renderLoadingItems = () => (
    <div className="InstagramFeed">
      {[...Array(this.props.count)].map((x, index) => (
        <div
          className="InstagramFeed--EmptyPost"
          data-display="Loading"
          key={`EmptyPost-${index}`}
        />
      ))}
    </div>
  )

  render() {
    if (!this.state.posts.length) {
      return this.renderLoadingItems()
    }
    return (
      <div className="InstagramFeed">
        {this.state.posts.slice(0, this.props.count).map(post => (
          <Post
            src={post.media_url}
          />
        ))}
      </div>
    )
  }
}

const Post = ({ src }) => (
  <a
    className="InstagramFeed--EmptyPost InstagramFeed--EmptyPost-loaded"
    href={src}
    rel="noopener noreferrer"
    target="_blank"
    aria-label="Instagram Post Link"
  >
    <Image background src={src} lazy alt="instagram image" />
  </a>
)
