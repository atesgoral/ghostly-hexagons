function Hexagons(canvas, config) {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  var ctx = canvas.getContext('2d');

  var points = [];

  function paint() {
    ctx.fillStyle = config.background;
    ctx.globalAlpha = 1 - config.trail;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    ctx.fillStyle = config.dot.color;

    points.forEach(function (point) {
      ctx.fillRect(canvas.width / 2 + point.x, canvas.height / 2 + point.y, config.dot.size, config.dot.size);

      point.x += Math.cos(point.a) * 1;
      point.y += Math.sin(point.a) * 1;

      if (!--point.d) {
        point.a += Math.PI / config.path.split * (Math.random() < 0.5 ? -1 : 1);
        point.d = 1 << (Math.round((config.path.maxLength - config.path.minLength) * Math.random()) + config.path.minLength);
      }
    });
  }

  var tickTimeout = null;

  function tick() {
    paint();
    tickTimeout = window.setTimeout(tick, 1000 / 50);
  }

  function start() {
    ctx.fillStyle = config.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < config.dot.count; i++) {
      points.push({
        x: 0,
        y: 0,
        a: 2 * Math.PI / config.path.split * Math.floor(Math.random() * config.path.split),
        d: 1 << config.path.maxLength
      })
    }

    tick();
  }

  this.restart = function () {
    window.clearTimeout(tickTimeout);

    points = [];

    start();
  };

  start();
}
