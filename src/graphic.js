
const privatePropertySet = Symbol('privatePropertySet');
const BFS = Symbol('BFS');
const DFS = Symbol('DFS');

export class Point {
  constructor(name) {
    this[privatePropertySet] = {
      name,
      inDegree: 0
    };
  }

  get id() {
    return this[privatePropertySet].id;
  }
  set id(value) {
    this[privatePropertySet].id = value;
  }

  get inDegree() {
    return this[privatePropertySet].inDegree;
  }
  set inDegree(value) {
    this[privatePropertySet].inDegree = value;
  }

  toString() {
    return this[privatePropertySet].name;
  }
}

export class Edge {
  constructor(pointFrom, pointTo, weight = 1) {
    pointTo.inDegree += 1;
    this[privatePropertySet] = {
      from: pointFrom,
      to: pointTo,
      weight
    };
  }

  get from() {
    return this[privatePropertySet].from;
  }

  get to() {
    return this[privatePropertySet].to;
  }

  get weight() {
    return this[privatePropertySet].weight;
  }

  toString() {
    return `${this[privatePropertySet].from.toString()} ----> ${this[privatePropertySet].to.toString()}`;
  }
}

export class DirectionGraphic {
  constructor(points, edges) {
    let buffer = [];
    points.forEach((elem, index) => {
      elem.id = index;
      buffer[index] = [];
    });
    edges.forEach(elem => {
      buffer[elem.from.id].push(elem.to);
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
    this.points.forEach((elem, index) => {
      console.log(`${elem.toString()}: [${this.nextPoints[index].map(elem => elem.toString()).join()}]`);
    });
  }

  sort() {
    let inDegreeZero = this.points.filter(elem => elem.inDegree === 0);
    if (inDegreeZero.length === 0) {
      return ['存在圈，无法拓扑排序'];
    }
    let orderdPoints = [];
    while (inDegreeZero.length > 0) {
      let p = inDegreeZero.shift();
      this.nextPoints[p.id].forEach(elem => {
        elem.inDegree -= 1;
        if (elem.inDegree === 0) {
          inDegreeZero.push(elem);
        }
      });
      orderdPoints.push(p);
    }
    if (orderdPoints.length < this.points.length) {
      orderdPoints.push('剩余节点存在圈，无法拓扑排序');
    }

    return orderdPoints;
  }

  /**
   * 求无权最短路径，起点为from节点
   * @param {Point} from
   */
  shortestPathWithoutWeight(from) {
    let paths = [];
    this.points.forEach((elem, index) => {
      paths[index] = Infinity;
    });

    let currentDistance = 0;
    let currentDistancePoints = [ from ];
    while (currentDistancePoints.length > 0) {
      let currentDistanceMoreOnePoints = [];
      currentDistancePoints.forEach(elem => {
        if (paths[elem.id] !== Infinity) {
          return;
        }
        paths[elem.id] = currentDistance;
        currentDistanceMoreOnePoints = currentDistanceMoreOnePoints.concat(this.nextPoints[elem.id]);
      });

      currentDistancePoints = currentDistanceMoreOnePoints;
      ++currentDistance;
    }

    return paths;
  }
}

export function run() {
  let points = [
    new Point('A'),
    new Point('B'),
    new Point('C'),
    new Point('D'),
    new Point('E'),
    new Point('F'),
    new Point('G')
  ];
  let edges = [
    new Edge(points[1], points[0]),
    new Edge(points[1], points[2]),
    new Edge(points[2], points[5]),
    new Edge(points[1], points[3]),
    new Edge(points[6], points[5]),
    new Edge(points[4], points[2]),
    new Edge(points[0], points[5]),
    new Edge(points[3], points[4]),
    new Edge(points[2], points[6])
  ];
  let dg = new DirectionGraphic(points, edges);
  dg.output();
  points.forEach(elem => {
    console.log(`${elem.toString()} inDegree: ${elem.inDegree}`);
  });

  let orderdPoints = dg.sort();
  console.log(orderdPoints.map(elem => elem.toString()).join());

  let from = points[1];
  console.log(`节点${from.toString()}到以下个节点的无权最短路径分别是：`);
  let paths = dg.shortestPathWithoutWeight(from);
  points.forEach((elem, index) => {
    console.log(`----到节点${elem.toString()}： ${paths[index]}`);
  });
}