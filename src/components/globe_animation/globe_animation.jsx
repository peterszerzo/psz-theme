import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

import polygons from './coordinates.json';
import createAnimation from './animator.js';

export default class GlobeAnimation extends Component {

  constructor(props) {
    super(props);
    this.drawOnCanvas = this.drawOnCanvas.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setMousePosition = this.setMousePosition.bind(this);
    this.setHovered = this.setHovered.bind(this);
    this.state = {
      isMouseOverShape: false
    };
  }

  render() {
    const style = this.state.isMouseOverShape ? {cursor: 'pointer'} : {};
    return (
      <canvas
        className='globe-animation'
        onClick={this.handleClick}
        style={style}
        width={this.props.width}
        height={this.props.height}
        ref='canvas'
      />
    );
  }

  drawOnCanvas(transformedPolygons) {
    let isMouseOverShape = false;
    const canvas = this.canvas;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    transformedPolygons.forEach(({transformedCoordinates, isHovered, opacity}) => {
      context.beginPath();
      const displayOpacity = isHovered ? 1 : opacity;
      const rgb = isHovered ? [ 65, 52, 120 ] : [ 255, 255, 255 ];
      isMouseOverShape = isMouseOverShape || isHovered;
      context.moveTo(transformedCoordinates[0][0], transformedCoordinates[0][1]);
      context.lineTo(transformedCoordinates[1][0], transformedCoordinates[1][1]);
      context.lineTo(transformedCoordinates[2][0], transformedCoordinates[2][1]);
      context.closePath();
      context.fillStyle = `rgba(${rgb.join(',')},${displayOpacity})`;
      context.fill();
    });
    if (isMouseOverShape) {
      this.props.triggerMessage();
    }
    if (isMouseOverShape !== this.state.isMouseOverShape) {
      this.setState({
        isMouseOverShape: isMouseOverShape
      });
    }
  }

  requestTransformedCoordinates() {
    const canvas = this.canvas;
    if (this.worker) {
      this.worker.postMessage({
        coordinates: polygons,
        lightCentroid: this.eye.position,
        dimensions: {
          width: canvas.width,
          height: canvas.height
        },
        mouse: this.state.mousePosition
      });
    }
  }

  componentDidMount() {
    this.canvas = findDOMNode(this.refs.canvas);
    this.animation = createAnimation(this.canvas, {
      setHovered: this.setHovered
    });
    this.animation.start();
    window.addEventListener('mousemove', this.setMousePosition);
  }

  componentWillUnmount() {
    this.animation.stop();
    window.removeEventListener('mousemove', this.setMousePosition);
  }

  setMousePosition(e) {
    this.animation.sendMessage({
      mousePosition: [
        e.clientX, e.clientY
      ]
    });
  }

  setHovered(isHovered) {
    this.setState({
      isMouseOverShape: isHovered
    });
  }

  handleClick() {
    if (this.state.isMouseOverShape) {
      this.props.navigateToRandomPost();
    }
  }

}
