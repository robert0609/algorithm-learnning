
const privatePropertySet = Symbol('privatePropertySet');
const BFS = Symbol('BFS');
const DFS = Symbol('DFS');
const dijkstra = Symbol('Dijkstra');

export const PointStatus = {
  unknown: 0,
  checking: 1,
  known: 2
};

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
    return `${this[privatePropertySet].from.toString()} --${this[privatePropertySet].weight.toString()}--> ${this[privatePropertySet].to.toString()}`;
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
      let arr = buffer[elem.from.id];
      arr[elem.to.id] = elem.weight;
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

  [BFS](from) {
    let result = [];

    let points = [];
    let status = [];

    points.push(from);
    status[from.id] = PointStatus.known;
    while (points.length > 0) {
      let p = points.shift();
      let nextPoints = this.nextPoints[p.id];
      nextPoints.forEach((elem, id) => {
        if (elem === undefined) {
          return;
        }
        if (status[id] === PointStatus.known) {
          return;
        }
        points.push(this.points[id]);
        status[id] = PointStatus.known;
      });
      result.push(p);
    }
    return result;
  }

  [DFS](from) {
    let result = [];

    let status = [];
    let totalPoints = this.points;
    let nextPointsCollection = this.nextPoints;

    recursion(from);

    return result;

    function recursion(point) {
      result.push(point);
      status[point.id] = PointStatus.checking;

      let nextPoints = nextPointsCollection[point.id];
      if (nextPoints.length > 0) {
        nextPoints.forEach((p, id) => {
          if (p === undefined) {
            return;
          }
          if (status[id] === PointStatus.checking || status[id] === PointStatus.known) {
            return;
          }
          recursion(totalPoints[id]);
        });
      }
      status[point.id] = PointStatus.known;
    }
  }

  sortByDFS() {
    let inDegreeZero = this.points.filter(elem => elem.inDegree === 0);
    if (inDegreeZero.length === 0) {
      return ['存在圈，无法拓扑排序'];
    }
    let status = [];
    let totalPoints = this.points;
    let nextPointsCollection = this.nextPoints;
    let orderdPoints = [];
    while (inDegreeZero.length > 0) {
      let from = inDegreeZero.shift();
      recursion(from);
    }

    return orderdPoints;

    function recursion(point) {
      let nextPoints = nextPointsCollection[point.id];
      if (nextPoints.length > 0) {
        nextPoints.forEach((p, id) => {
          if (p === undefined) {
            return;
          }
          if (status[id] === PointStatus.known) {
            return;
          }
          recursion(totalPoints[id]);
        });
      }
      status[point.id] = PointStatus.known;
      orderdPoints.unshift(point);
    }
  }

  sort() {
    let inDegreeZero = this.points.filter(elem => elem.inDegree === 0);
    if (inDegreeZero.length === 0) {
      return ['存在圈，无法拓扑排序'];
    }
    //缓存住indegree的初始值
    this.points.forEach(p => {
      p.__originIndegree = p.inDegree;
    });

    let orderdPoints = [];
    while (inDegreeZero.length > 0) {
      let p = inDegreeZero.shift();
      this.nextPoints[p.id].forEach((elem, id) => {
        if (elem === undefined) {
          return;
        }
        let np = this.points[id];
        np.inDegree -= 1;
        if (np.inDegree === 0) {
          inDegreeZero.push(np);
        }
      });
      orderdPoints.push(p);
    }
    if (orderdPoints.length < this.points.length) {
      orderdPoints.push('剩余节点存在圈，无法拓扑排序');
    }
    //恢复indegree的初始值
    this.points.forEach(p => {
      p.inDegree = p.__originIndegree;
    });

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
        this.nextPoints[elem.id].forEach((weight, id) => {
          if (weight === undefined) {
            return;
          }
          currentDistanceMoreOnePoints.push(this.points[id]);
        });
      });

      currentDistancePoints = currentDistanceMoreOnePoints;
      ++currentDistance;
    }

    return paths;
  }

  /**
   * 求赋权最短路径
   */
  [dijkstra](from) {
    let totalPoints = this.points;
    let nextPointsCollection = this.nextPoints;

    let status = [];
    let distances = [];
    this.points.forEach((elem) => {
      status[elem.id] = PointStatus.unknown;
      distances[elem.id] = Infinity;
    });
    status[from.id] = PointStatus.known;
    distances[from.id] = 0;
    let currentShortestTargetPoints = [];
    currentShortestTargetPoints.push(from);
    while (currentShortestTargetPoints.length > 0) {
      currentShortestTargetPoints = findNextShortestTargetPoints(currentShortestTargetPoints);
    }

    return distances;

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
          distances[id] = Math.min(distances[id], distances[p.id] + weight);
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

  let bfsPoints = dg[BFS](points[1]);
  console.log(`BFS搜索：${bfsPoints.map(elem => elem.toString()).join()}`);

  let dfsPoints = dg[DFS](points[1]);
  console.log(`DFS搜索：${dfsPoints.map(elem => elem.toString()).join()}`);

  let orderdPoints1 = dg.sortByDFS();
  console.log(`基于DFS搜索的拓扑排序：${orderdPoints1.map(elem => elem.toString()).join()}`);

  let orderdPoints = dg.sort();
  console.log(`拓扑排序：${orderdPoints.map(elem => elem.toString()).join()}`);

  let from = points[1];
  console.log(`节点${from.toString()}到以下个节点的无权最短路径分别是：`);
  let paths = dg.shortestPathWithoutWeight(from);
  points.forEach((elem, index) => {
    console.log(`----到节点${elem.toString()}： ${paths[index]}`);
  });

  console.log(`节点${from.toString()}到以下个节点的无权最短路径(dijkstra算法)分别是：`);
  let distances = dg[dijkstra](from);
  points.forEach((elem, index) => {
    console.log(`----到节点${elem.toString()}： ${distances[index]}`);
  });

  let points1 = [
    new Point('A'),
    new Point('B'),
    new Point('C'),
    new Point('D'),
    new Point('E'),
    new Point('F')
  ];
  let edges1 = [
    new Edge(points[0], points[1], 6),
    new Edge(points[0], points[2], 3),
    new Edge(points[2], points[1], 2),
    new Edge(points[1], points[3], 10),
    new Edge(points[2], points[3], 5),
    new Edge(points[3], points[4], 1),
    new Edge(points[4], points[5], 7),
    new Edge(points[3], points[5], 8)
  ];
  let dg1 = new DirectionGraphic(points1, edges1);
  dg1.output();

  let from1 = points[0];
  console.log(`节点${from1.toString()}到以下个节点的赋权最短路径(dijkstra算法)分别是：`);
  let distances1 = dg1[dijkstra](from1);
  points1.forEach((elem, index) => {
    console.log(`----到节点${elem.toString()}： ${distances1[index]}`);
  });
}
