export interface Point {
  x: number
  y: number
}

export function twoOfPointsDistance(p1: Point, p2: Point) {
  const a = p2.x - p1.x
  const b = p2.y - p1.y
  return Math.hypot(a, b)
}

/**
 * @description 计算阶乘
 */
export function factorial(n: number): number {
  if (n < 0)
    return 0
  return n <= 1 ? 1 : n * factorial(n - 1)
}

export function createBezier(n: number) {
  const pointNumber = n + 1
  return (t: number, ...points: Point[]): Point => {
    if (t < 0 || t > 1) {
      throw new Error('t must be between 0 and 1')
    }

    if (Array.isArray(points[0])) {
      points = points[0]
    }

    if (points.length !== pointNumber) {
      throw new Error(`The number of points must be ${pointNumber}`)
    }

    const triangles = pascalTriangle(pointNumber)
    const P0 = points[0]
    const PN = points[n]
    const oneMinusT = 1 - t
    const calValue = (axis: keyof Point) => {
      let result = (oneMinusT ** n) * P0[axis] + t ** n * PN[axis]
      for (let i = 1; i < n; i += 1) {
        const axisValue = points[i][axis]
        const times = triangles[n][i]
        result += times * (oneMinusT ** (n - i)) * (t ** i) * axisValue
      }
      return result
    }

    return {
      x: calValue('x'),
      y: calValue('y'),
    }
  }
}

export function pascalTriangle(n: number) {
  const record = [[1], [1, 1]]

  for (let i = 2; i <= n; i++) {
    const row = [1]
    for (let j = 1; j < i; j++) {
      row[j] = record[i - 1][j - 1] + record[i - 1][j]
    }
    row.push(1)
    record[i] = row
  }

  return record
}
