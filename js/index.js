import { map } from './Math.js'

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const control = {
  zoomX: 1.8,
  zoomY: 1.8,
  maxiteration: 150,
  bound: 20,
  zoomXVal: document.querySelector('[data-zoom-x-value]'),
  zoomXOut: document.querySelector('[data-zoom-x-out]'),
  zoomYVal: document.querySelector('[data-zoom-y-value]'),
  zoomYOut: document.querySelector('[data-zoom-y-out]'),
  maxiterationVal: document.querySelector('[data-maxiteration-value]'),
  maxiterationOut: document.querySelector('[data-maxiteration-out]'),
  boundVal: document.querySelector('[data-bound-value]'),
  boundOut: document.querySelector('[data-bound-out]'),
  container: document.querySelector('.control'),

  change(ev) {
    let value = +ev.target.value
    let name = Object.keys(ev.target.dataset)[0].replace('Value', '')

    this[name] = value
    this[`${name}Out`].textContent = value.toFixed(1)
  },

  reset() {
    this.zoomX = 1.8
    this.zoomY = 1.8
    this.maxiteration = 150
    this.zoomXOut.textContent = this.zoomX.toFixed(1)
    this.zoomYOut.textContent = this.zoomY.toFixed(1)
    this.maxiterationOut.textContent = this.maxiteration.toFixed(1)
    this.boundOut.textContent = this.bound.toFixed(1)

    this.zoomXVal.value = this.zoomX
    this.zoomYVal.value = this.zoomY
    this.maxiterationVal.value = this.maxiteration
  }
}

const width = canvas.width
const height = canvas.height

let mouseX = 150, mouseY = 0
let mouseIn = false

setup()
draw()

canvas.addEventListener('mouseenter', () => {
  mouseIn = true
})
canvas.addEventListener('mouseleave', () => {
  mouseIn = false
})
canvas.addEventListener('mousemove', ev => {
  mouseX = ev.offsetX
  mouseY = ev.offsetY
})


function setup() {
  control.container.addEventListener('input', ev => control.change(ev))
  control.reset()
}

function draw() {
  ctx.clearRect(0, 0, width, height)
  ctx.putImageData(mandelbrot(), 0, 0)

  if (mouseIn) {
    ctx.beginPath()
    ctx.fillStyle = '#32cd3250'
    ctx.ellipse(mouseX, mouseY, 5, 5,0, 0, Math.PI * 2)
    ctx.fill()
  }

  requestAnimationFrame(draw)
}

function mandelbrot() {
  let imgData = ctx.getImageData(0, 0, width, height)
  let pixels = imgData.data

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const pix = (x + y * width) * 4
      
      let n = 0

      let a = map(x, 0, width, -control.zoomX, control.zoomX)
      let b = map(y, 0, height, -control.zoomY, control.zoomY)

      let startA = a
      let startB = b

      while (n < control.maxiteration) {

        let aa = a * a - b * b
        let bb = 2 * a * b

        a = aa + startA
        b = bb + startB

        if (Math.abs(aa + bb) > control.bound) break

        n++
      }

      let bright = map(n, 0, control.maxiteration, 0, 255)
      if (n === control.maxiteration) {
        bright = 0
      }

      pixels[ pix + 0 ] = bright; // R value
      pixels[ pix + 1 ] = bright * map(mouseX, 0, width, 0.01, 1); // G value
      pixels[ pix + 2 ] = bright * map(mouseY, 0, height, 0.01, 1); // B value
      pixels[ pix + 3 ] = 255; // A value
    }
  }

  return imgData
}