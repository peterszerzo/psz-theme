import HarmonicOscillator from './harmonic_oscillator.js';
import polygons from './coordinates.json';
import TransWorker from 'worker?inline!./transform_worker.js';

export default function create(canvas, props) {

  const context = canvas.getContext('2d');
  const worker = new TransWorker();

  let isRunning = false;

  let state = {
    isRunning: false,
    eye: new HarmonicOscillator({
      position: [0, 0],
      velocity: [2, 4],
      amplitude: [10, 10],
      maxVelocity: [2, 4],
      mass: 0.005
    }),
    mousePosition: [0, 0]
  };

  function setInternalState(stateChanges) {
    state = Object.assign({}, state, stateChanges);
  }

  function requestTransformedCoordinates() {
    worker.postMessage({
      coordinates: polygons,
      lightCentroid: state.eye.position,
      dimensions: {
        width: canvas.width,
        height: canvas.height
      },
      mouse: state.mousePosition
    });
  }

  function draw(transformedPolygons) {
    let isMouseOverShape = false;
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
    // if (isMouseOverShape) {
    //   this.props.triggerMessage();
    // }
    props.setHovered(isMouseOverShape);
  }

  return {
    start() {
      isRunning = true;
      worker.onmessage = ({data}) => {
        window.requestAnimationFrame(() => {
          draw(data);
          setInternalState({
            eye: state.eye.getUpdatedClone(0.02)
          });
          if (isRunning) {
            requestTransformedCoordinates();
          }
        });
      };
      requestTransformedCoordinates();
    },
    sendMessage(stateChanges) {
      setInternalState(stateChanges);
    },
    stop() {
      worker.terminate();
      isRunning = false;
    }
  };
}
