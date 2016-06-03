export default class HarmonicOscillator {

  constructor(args) {
    this.position = [...args.position];
    this.velocity = [...args.velocity];
    this.amplitude = [...args.amplitude];
    this.maxVelocity = [...args.maxVelocity];
    this.mass = args.mass;
    this.springConstant = [
      (this.maxVelocity[0] / this.amplitude[0]) ** 2 * this.mass,
      (this.maxVelocity[1] / this.amplitude[1]) ** 2 * this.mass
    ];
  }

  getUpdatedClone(timeStep) {
    this.update(timeStep);
    return this.clone();
  }

  clone() {
    return new HarmonicOscillator({
      position: this.position,
      velocity: this.velocity,
      amplitude: this.amplitude,
      maxVelocity: this.maxVelocity,
      mass: this.mass
    });
  }

  update(timeStep) {
    this._updateVelocity(timeStep);
    this._updatePosition(timeStep);
  }

  _updateVelocity(timeStep) {
    this.velocity[0] -= this.position[0] * this.springConstant[0] / this.mass * timeStep;
    this.velocity[1] -= this.position[1] * this.springConstant[1] / this.mass * timeStep;
  }

  _updatePosition(timeStep) {
    this.position[0] += this.velocity[0] * timeStep;
    this.position[1] += this.velocity[1] * timeStep;
  }

}
