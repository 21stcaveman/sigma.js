(function() {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  sigma.utils.pkg('sigma.plugins');

  sigma.plugins.addControlPoints = function(s, options) {
    var o = options || {},
	p = s.camera.prefix;

    s.graph.edges().forEach(function (edge, index, edgeArray) {
	if ((edge.type == 'curved') || (edge.type == 'curvedArrow')) {

		var source = s.graph.nodes(edge.source), target = s.graph.nodes(edge.target),
	    	cp = sigma.utils.getQuadraticControlPoint(source.x, source.y, target.x, target.y);

		cp = {
			id: edge.id + 'cp',
			size: 0.5,
			label: 'Control point for ' + edge.id,
			x: cp.x,
			y: cp.y
		}

		s.graph.addNode(cp);
	}
    });

    s.refresh();
  }

  sigma.plugins.kill = function(s) { };
}).call(window);
