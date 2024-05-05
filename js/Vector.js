export default class Vector {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  set(x,y) {
    this.x = x
    this.y = y
  }

  add(x, y) {
    if (x instanceof Vector) {
      this.x += x.x || 0;
      this.y += x.y || 0;
      return this
    }
    if (y === undefined) {
      this.x += x
      this.y += x
      return this
    }
    this.x += x
    this.y += y
    return this
  }

  sub(x, y) {
    if (x instanceof Vector) {
      this.x -= x.x || 0;
      this.y -= x.y || 0;
      return this
    }
    if (y === undefined) {
      this.x -= x
      this.y -= x
      return this
    }
    this.x -= x
    this.y -= y
    return this
  }

  mult(x, y) {
    if (x instanceof Vector) {
      this.x *= x.x || 0;
      this.y *= x.y || 0;
      return this
    }
    if (y === undefined) {
      this.x *= x
      this.y *= x
      return this
    }
    this.x *= x
    this.y *= y
    return this
  }

  div(x, y) {
    if (x instanceof Vector) {
      if (x.x === 0 || x.y === 0) console.warn('Division by zero problen')
      this.x /= x.x || 0;
      this.y /= x.y || 0;
      return this
    }
    if (y === undefined) {
      if (x === 0) console.warn('Division by zero problen')
      this.x /= x
      this.y /= x
      return this
    }
    if (x === 0 || y === 0) console.warn('Division by zero problen')
    this.x /= x
    this.y /= y
    return this
  }

  dot(x, y) {
    if (x instanceof Vector) {
      return this.dot(x.x, x.y);
    }
    return this.x * (x || 0) + this.y * (y || 0)
  }

  cross(v) {
    const x = this.y * 1 - 1 * v.y;
    const y = 1 * v.x - this.x * 1;
    return new Vector(x, y);
  }

  setMag(n) {
    return this.normalize().mult(n);
  }

  mag() {
    return Math.sqrt(this.magSq())
  }

  magSq() {
    const x = this.x
    const y = this.y
    return x * x + y * y
  }

  normalize() {
    const len = this.mag()
    if (len !== 0) this.mult(1 / len)
    return this
  }

  limit(max) {
    const mSq = this.magSq()
    if (mSq > max * max) {
      this.div(Math.sqrt(mSq))
      this.mult(max)
    }
    return this
  }

  setHeading(a) {
    let m = this.mag()
    this.x = m * Math.cos(a)
    this.y = m * Math.sin(a)
    return this
  }

  rotate(a) {
    let newHeading = this.heading() + a
    const mag = this.mag()
    this.x = Math.cos(newHeading) * mag
    this.y = Math.sin(newHeading) * mag
    return this
  }

  heading() {
    const h = Math.atan2(this.y, this.x)
    return h
  }

  copy() {
    return new Vector(this.x, this.y)
  }

  angleBetween(v) {
    const magSqMult = this.magSq() * v.magSq();
    if (magSqMult === 0) return NaN
    const u = this.cross(v);

    let angle = Math.atan2(u.mag(), this.dot(v))
    return angle;
  }

  toString(label = '') {
    return `Vector {${label}} x,y [${this.x}, ${this.y}]`
  }


  static sub(v1, v2) {
    let newV = v1.copy()
    return newV.sub(v2)
  }

  static toDegree(a) {
    return (a * (180 / Math.PI))
  }

  static random2D() {
    return this.fromAngle(Math.random() * (Math.PI * 2))
  }

  static fromAngle(angle, length) {
    if (typeof length === 'undefined') length = 1
    return new Vector(length * Math.cos(angle), length * Math.sin(angle))
  }

  static heading(x, y) {
    const h = Math.atan2(y, x)
    return h
  }

  static dot(v1, v2) {
    return v1.copy().dot(v2);
  }
}