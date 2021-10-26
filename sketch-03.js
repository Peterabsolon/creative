const canvasSketch = require("canvas-sketch")
const random = require("canvas-sketch-util/random")

const settings = {
  dimensions: [1080, 1080],
  animate: true,
}

const sketch = ({ width, height }) => {
  const agents = []

  for (let i = 0; i < 40; i++) {
    const x = random.range(0, width)
    const y = random.range(0, height)
    agents.push(new Agent(x, y))
  }

  return ({ context: ctx, width, height }) => {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, width, height)

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i]

      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j]

        const dist = agent.pos.getDistance(other.pos)

        if (dist > 200) continue

        ctx.beginPath()
        ctx.moveTo(agent.pos.x, agent.pos.y)
        ctx.lineTo(other.pos.x, other.pos.y)
        ctx.stroke()
      }
    }

    agents.forEach((agent) => {
      agent.update()
      agent.draw(ctx)
      agent.bounce(width, height)
    })
  }
}

class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  getDistance(v) {
    const dx = this.x - v.x
    const dy = this.y - v.y
    return Math.sqrt(dx * dx + dy * dy)
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y)
    this.vel = new Vector(random.range(-3, 3), random.range(-3, 3))
    this.radius = random.range(6, 12)
  }

  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1
  }

  update() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  }

  draw(ctx) {
    ctx.save()
    ctx.translate(this.pos.x, this.pos.y)

    ctx.lineWidth = 4

    ctx.beginPath()
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()

    ctx.restore()
  }
}

canvasSketch(sketch, settings)
