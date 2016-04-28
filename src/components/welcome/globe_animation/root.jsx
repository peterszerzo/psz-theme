import React from 'react';
import {findDOMNode} from 'react-dom';

import HarmonicOscillator from './harmonic_oscillator.js';
import * as geoUtil from './geometry_utilities.js';

import polygons from './coordinates.json';

const GRAPHICS_SIZE = 90;

export default class Animation extends React.Component {

  constructor(props) {
    super(props);
    this.drawOnCanvas = this.drawOnCanvas.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setMousePosition = this.setMousePosition.bind(this);
    this.state = {
      eye: new HarmonicOscillator({
        position: [0, 0],
        velocity: [2, 4],
        amplitude: [10, 10],
        maxVelocity: [2, 4],
        mass: 0.005
      }),
      mousePosition: [0, 0],
      isMouseOverShape: false
    };
  }

  render() {
    const style = this.state.isMouseOverShape ? {cursor: 'pointer'} : {};
    return (
      <canvas
        onClick={ this.handleClick }
        style={ style }
        width={ this.props.width }
        height={ this.props.height }
        ref='canvas'
      />
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.eye !== nextState.eye);
  }

  componentDidUpdate() {
    window.requestAnimationFrame(this.drawOnCanvas);
  }

  drawOnCanvas() {
    let isMouseOverShape = false;
    const canvas = findDOMNode(this.refs.canvas);
    if (!canvas) {
      return;
    }
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    polygons.forEach((polygon) => {
      context.beginPath();
      const transformedPoints = this.transformPoints(polygon);
      const containsMouse = geoUtil.contains(transformedPoints, this.state.mousePosition);
      const opacity = containsMouse ? 1 : this.getOpacity(polygon);
      const rgb = containsMouse ? [ 65, 52, 120 ] : [ 255, 255, 255 ];
      isMouseOverShape = isMouseOverShape || containsMouse;
      context.moveTo(transformedPoints[0][0], transformedPoints[0][1]);
      context.lineTo(transformedPoints[1][0], transformedPoints[1][1]);
      context.lineTo(transformedPoints[2][0], transformedPoints[2][1]);
      context.closePath();
      context.fillStyle = `rgba(${rgb.join(',')},${opacity})`;
      context.fill();
    });
    if (isMouseOverShape) {
      this.props.triggerMessage();
    }
    this.setState({
      isMouseOverShape: isMouseOverShape
    });
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.setMousePosition);
    this.interval = setInterval(() => {
      let newEye = this.state.eye.getUpdatedClone(0.02);
      this.setState({
        eye: newEye
      });
    }, 15);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.setMousePosition);
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  transformPoints(points) {
    return points.map(point => this.transformPoint(point));
  }

  transformPoint(point) {
    const {width, height} = this.props;
    const {eye} = this.state;
    const scale = Math.max(width, height * 1.5) / 180 * 2;
    const x0 = width / 2;
    const y0 = height / 2;
    return [
      (point[0] + eye.position[0]) * scale + x0,
      (point[1] + eye.position[1]) * scale + y0
    ];
  }

  getOpacity(polygonCoordinates) {
    const {eye} = this.state;
    const centroid = polygonCoordinates.slice(0, 3).reduce((previousValue, coord) => {
      return [
        previousValue[0] + coord[0] / 3,
        previousValue[1] + coord[1] / 3
      ];
    }, [0, 0]);
    const dx = centroid[0] + eye.position[0];
    const dy = centroid[1] + eye.position[1];
    let opacity = (dx ** 2 + dy ** 2) ** 0.5 / GRAPHICS_SIZE;
    const maxOpacity = 0.3;
    if (opacity > maxOpacity) {
      opacity = maxOpacity;
    }
    return ((maxOpacity - opacity) / maxOpacity) ** 3;
  }

  setMousePosition(e) {
    this.setState({
      mousePosition: [
        e.clientX, e.clientY
      ]
    });
  }

  handleClick() {
    if (this.state.isMouseOverShape) {
      this.props.navigateToRandomPost();
    }
  }

}
