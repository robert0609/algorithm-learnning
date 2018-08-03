import { PointStatus, Point, Edge } from './graphic';
import { BinaryFullTree } from './binaryFullTree';
import { UnionFindSet } from './unionFindSet';

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
    let totalPoints = this.points;
    let nextPointsCollection = this.nextPoints;

    let edgeHeap = new BinaryFullTree((a, b) => a.weight - b.weight);
    edgeHeap.push(...this.edges);
    let minEdge = edgeHeap.popMin();
    let from = minEdge.from;

    let status = [];
    let distances = [];
    let minTreeEdges = [];
    this.points.forEach((elem) => {
      status[elem.id] = PointStatus.unknown;
      distances[elem.id] = Infinity;
    });
    status[from.id] = PointStatus.known;
    let currentShortestTargetPoints = [from];
    while (currentShortestTargetPoints.length > 0) {
      currentShortestTargetPoints = findNextShortestTargetPoints(currentShortestTargetPoints);
    }

    return minTreeEdges;

    function findNextShortestTargetPoints(points) {
      while (points.length > 0) {
        let p = points.shift();
        nextPointsCollection[p.id].forEach((weight, id) => {
          if (weight === undefined) {
            return;
          }
          if (status[id] === PointStatus.known) {
            return;
          }
          if (weight < distances[id]) {
            distances[id] = weight;
            minTreeEdges[id] = new Edge(p, totalPoints[id], weight);
          }
        });
      }
      //找出除去已知的节点外目前最短路径的节点
      let shortestDistance = Infinity;
      distances.forEach((d, id) => {
        if (status[id] === PointStatus.known) {
          return;
        }
        if (d < shortestDistance) {
          shortestDistance = d;
        }
      });
      let result = [];
      distances.forEach((d, id) => {
        if (status[id] === PointStatus.known) {
          return;
        }
        if (d === shortestDistance) {
          result.push(totalPoints[id]);
          status[id] = PointStatus.known;
        }
      });

      return result;
    }
  }
  [kruskal]() {
    let edgeHeap = new BinaryFullTree((a, b) => a.weight - b.weight);
    edgeHeap.push(...this.edges);
    let unionFindSet = new UnionFindSet(this.points, p => p.id);

    let minTreeEdges = [];

    let minEdge = edgeHeap.popMin();
    while (minEdge) {
      if (unionFindSet.find(minEdge.from) !== unionFindSet.find(minEdge.to)) {
        minTreeEdges.push(minEdge);
        unionFindSet.union(minEdge.from, minEdge.to);
      }
      minEdge = edgeHeap.popMin();
    }

    return minTreeEdges;
  }

  /**
   * 找出最小生成树
   */
  getMinGenerateTree() {
    console.log('采用prim算法找出的最小生成树是：');
    let distances = this[prim]();
    distances.forEach((elem) => {
      console.log(`----${elem.toString()}`);
    });
    console.log('采用kruskal算法找出的最小生成树是：');
    distances = this[kruskal]();
    distances.forEach((elem) => {
      console.log(`----${elem.toString()}`);
    });
  }
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
  dg.getMinGenerateTree();
}
