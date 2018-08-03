import { PointStatus, Point, Edge } from './graphic';
import { BinaryFullTree } from './binaryFullTree';

const privatePropertySet = Symbol('privatePropertySet');
const prim = Symbol('prim');
const kruskal = Symbol('kruskal');

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

      let arrTo = buffer[elem.to.id];
      arrTo[elem.from.id] = elem.weight;
    });

    this[privatePropertySet] = {
      points,
      nextPoints: buffer,
      edges
    };
  }

  get points() {
    return this[privatePropertySet].points;
  }

  get nextPoints() {
    return this[privatePropertySet].nextPoints;
  }

  get edges() {
    return this[privatePropertySet].edges;
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

  [prim]() {
    let edgeHeap = new BinaryFullTree((a, b) => a.weight - b.weight);
    edgeHeap.push(this.edges);
    let minEdge = edgeHeap.popMin();
  }
  [kruskal]() {}

  getMinGenerateTree() {}
}

export function run() {
  let points = [
    new Point('A'),
    new Point('B'),
    new Point('C'),
    new Point('D'),
    new Point('E'),
    new Point('F')
  ];
  let edges = [
    new Edge(points[0], points[1], 6),
    new Edge(points[0], points[2], 3),
    new Edge(points[2], points[1], 2),
    new Edge(points[1], points[3], 10),
    new Edge(points[2], points[3], 5),
    new Edge(points[3], points[4], 1),
    new Edge(points[4], points[5], 7),
    new Edge(points[3], points[5], 8)
  ];
  let dg = new NonDirectionGraphic(points, edges);
  dg.output();


}
