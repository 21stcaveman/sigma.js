(function() {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  sigma.utils.pkg('sigma.plugins');

  sigma.plugins.mapControlPoints = function(s, options) {
    var o = options || {},
	camera = s.cameras[0],
	renderer = s.renderers[0],
	context = s.renderers[0].contexts.nodes,
	bounds = sigma.utils.getBoundaries(s.graph, '', true),
        minX = bounds.minX,
        minY = bounds.minY,
        maxX = bounds.maxX,
        maxY = bounds.maxY,
	scale = Math.min(renderer.width / Math.max(maxX - minX, 1), renderer.height / Math.max(maxY - minY, 1));


    s.graph.edges().forEach(function (edge, index, edgeArray) {
	if ((edge.type == 'curved') || (edge.type == 'curvedArrow')) {
		var source = s.graph.nodes(edge.source), target = s.graph.nodes(edge.target),
	    	cpOriginal = sigma.utils.getQuadraticControlPoint(source.x, source.y, target.x, target.y),
		cos = Math.cos(camera.angle),
		sin = Math.sin(camera.angle),
		cp = { x: (cpOriginal.x - (maxX + minX) / 2) * scale, y: (cpOriginal.y - (maxY + minY) / 2) * scale }

		cp = {
		id: edge.id + 'cp',
		size: 0.5,
		label: 'Control point for ' + edge.id,
		xOriginal: cpOriginal.x,
		yOriginal: cpOriginal.y,
		x:
			(
			  (cp.x - camera.x) * cos +
			  (cp.y - camera.y) * sin
			) / camera.ratio + (renderer.width / 2),

		y:
			(
			  (cp.y - camera.y) * cos -
			  (cp.x - camera.x) * sin
			) / camera.ratio + (renderer.height / 2)
		};

		console.log(cp);

		context.fillStyle = 'red';
		context.beginPath();
		context.arc(cp.x, cp.y, 4, 0, Math.PI * 2, true);
		context.fill();
		context.save();
	}
    });
  }

  sigma.plugins.kill = function(s) { };
}).call(window);
