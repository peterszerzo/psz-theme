import React from 'react'

export default class Hero extends React.Component {

  constructor(props) {
    super(props)
    this.handleImageLoad = this.handleImageLoad.bind(this)
    this.state = {
      isImageLoaded: true
    }
  }

  render() {
    const {title, text} = this.props
    return (
      <div className='hero'>
        <div className='hero__background hero__background--blurred' style={ this.getBackgroundStyle() } />
        <div className='hero__overlay' style={ this.getOverlayStyle() }/>
        <div className='hero__title-bar'>
          <div className='hero__title-bar__content'>
            <h1 className='title'>{ title }</h1>
            <h2 className='headline'>{}</h2>
          </div>
        </div>
        <div className='hero__text'>{ text }</div>
      </div>
    )
  }

  renderTestImage() {
    const {image} = this.props
    return (
      <img
        style={{
          opacity: 0.1,
          width: 10,
          height: 10,
          position: 'fixed'
        }}
        src={ image }
        onLoad={ this.handleImageLoad }
      />
    )
  }

  getBackgroundStyle() {
    if (!this.state.isImageLoaded) {
      return {}
    }
    return {
      'backgroundImage': `url(${this.props.image})`
    }
  }

  getOverlayStyle() {
    const opacity = this.state.isImageLoaded ? '0.3' : '0.9'
    return {
      'opacity': opacity
    }
  }

  handleImageLoad() {
    this.setState({
      isImageLoaded: true
    })
  }

}
