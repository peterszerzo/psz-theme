import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

import HarmonicOscillator from './harmonic_oscillator.js';
import polygons from './coordinates.json';
import TransWorker from 'worker?inline!./transform_worker.js';

import {INTERVAL} from './constants.js';

export default class Animation extends Component {

  constructor(props) {
    super(props);
    this.drawOnCanvas = this.drawOnCanvas.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setMousePosition = this.setMousePosition.bind(this);
    this.state = {
      transformedPolygons: [],
      mousePosition: [0, 0],
      isMouseOverShape: false,
      lastWorkerComputeTime: INTERVAL
    };
    this.eye = new HarmonicOscillator({
      position: [0, 0],
      velocity: [2, 4],
      amplitude: [10, 10],
      maxVelocity: [2, 4],
      mass: 0.005
    });
  }

  render() {
    const style = this.state.isMouseOverShape ? {cursor: 'pointer'} : {};
    return (
      <canvas
        onClick={this.handleClick}
        style={style}
        width={this.props.width}
        height={this.props.height}
        ref='canvas'
      />
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.transformedPolygons !== nextState.transformedPolygons);
  }

  componentDidUpdate() {
    window.requestAnimationFrame(this.drawOnCanvas);
  }

  drawOnCanvas() {
    let isMouseOverShape = false;
    const canvas = this.canvas;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.state.transformedPolygons.forEach(({transformedCoordinates, isHovered, opacity}) => {
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
    this.worker = new TransWorker();
    this.worker.onmessage = ({data}) => {
      this.lastWorkerResponse = new Date().getTime();
      this.setState({
        transformedPolygons: data
      });
    };
    window.addEventListener('mousemove', this.setMousePosition);
    this.interval = setInterval(() => {
      this.eye = this.eye.getUpdatedClone(0.02);
      this.requestTransformedCoordinates();
    }, 15);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.setMousePosition);
    if (this.interval) {
      clearInterval(this.interval);
    }
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
