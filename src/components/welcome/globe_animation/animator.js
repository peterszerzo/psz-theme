import HarmonicOscillator from './harmonic_oscillator.js';
import polygons from './coordinates.json';
import TransWorker from 'worker?inline!./transform_worker.js';

function create(canvas) {

  const context = canvas.getContext('2d');
  const worker = new TransWorker();

  let interval = null;
  let eye = new HarmonicOscillator({
    position: [0, 0],
    velocity: [2, 4],
    amplitude: [10, 10],
    maxVelocity: [2, 4],
    mass: 0.005
  });
  let mousePosition = [0, 0];

  function requestTransformedCoordinates() {
    worker.postMessage({
      coordinates: polygons,
      lightCentroid: eye.position,
      dimensions: {
        width: canvas.width,
        height: canvas.height
      },
      mouse: mousePosition
    });
  }

  function draw(transformedPolygons) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    transformedPolygons.forEach(({transformedCoordinates, isHovered, opacity}) => {
      context.beginPath();
      const displayOpacity = isHovered ? 1 : opacity;
      const rgb = isHovered ? [ 65, 52, 120 ] : [ 255, 255, 255 ];
      // isMouseOverShape = isMouseOverShape || isHovered;
      context.moveTo(transformedCoordinates[0][0], transformedCoordinates[0][1]);
      context.lineTo(transformedCoordinates[1][0], transformedCoordinates[1][1]);
      context.lineTo(transformedCoordinates[2][0], transformedCoordinates[2][1]);
      context.closePath();
      context.fillStyle = `rgba(${rgb.join(',')},${displayOpacity})`;
      context.fill();
    });
    // if (isMouseOverShape) {
    //   this.props.triggerMessage();
    // }
    // if (isMouseOverShape !== this.state.isMouseOverShape) {
    //   this.setState({
    //     isMouseOverShape: isMouseOverShape
    //   });
    // }
  }

  return {
    start() {
      worker.onmessage(({data}) => {
        draw(data);
      });
      interval = setInterval(() => {
        eye = eye.getUpdatedClone(0.02);
        this.requestTransformedCoordinates();
      }, 15);
    },
    destroy() {

    }
  };
}
