export { PointStatus, Point, Edge } from './graphic';

const privatePropertySet = Symbol('privatePropertySet');

export class NonDirectionGraphic {
  constructor(points, edges) {
    let buffer = [];
    points.forEach((elem, index) => {
      elem.id = index;
      buffer[index] = [];
    });
    edges.forEach(elem => {
      let arrFrom = buffer[elem.from.id];
      arrFrom[elem.to.id] = elem.weight;

      let arr1
    });

    this[privatePropertySet] = {
      points,
      nextPoints: buffer
    };
  }

  get points() {
    return this[privatePropertySet].points;
  }

  get nextPoints() {
    return this[privatePropertySet].nextPoints;
  }

  output() {
    this.points.forEach((elem) => {
      let arr = [];
      let nps = this.nextPoints[elem.id];
      for (let i = 0; i < nps.length; ++i) {
        let np = nps[i];
        if (np === undefined) {
          continue;
        }
        arr.push(this.points[i].toString());
      }
      console.log(`${elem.toString()}: [${arr.join()}]`);
    });
  }
}
