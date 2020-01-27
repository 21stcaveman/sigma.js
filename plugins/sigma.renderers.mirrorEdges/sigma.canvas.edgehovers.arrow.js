;(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edgehovers');

  /**
   * This hover renderer will display the edge with a different color or size.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edgehovers.arrow =
    function(edge, source, target, context, settings) {
    var color = edge.color,
        prefix = settings('prefix') || '',
        edgeColor = settings('edgeColor'),
        defaultNodeColor = settings('defaultNodeColor'),
        defaultEdgeColor = settings('defaultEdgeColor'),
	mirror = !!edge['mirror'],
        size = edge[prefix + 'size'] || 1,
        tSize = target[prefix + 'size'],
        sSize = source[prefix + 'size'],
        sX = source[prefix + 'x'],
        sY = source[prefix + 'y'],
        tX = target[prefix + 'x'],
        tY = target[prefix + 'y'];

    size = (edge.hover) ? settings('edgeHoverSizeRatio') * size : size;

    var aSize = size * 4.5,
        d = Math.sqrt(Math.pow(tX - sX, 2) + Math.pow(tY - sY, 2)),
	pSize = (mirror) ? sSize : (d - aSize - tSize),
	aX = sX + (tX - sX) * pSize / d,
	aY = sY + (tY - sY) * pSize / d,
	vX = (tX - sX) * aSize / d,
        vY = (tY - sY) * aSize / d;

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = defaultEdgeColor;
          break;
      }

    if (settings('edgeHoverColor') === 'edge') {
      color = edge.hover_color || color;
    } else {
      color = edge.hover_color || settings('defaultEdgeHoverColor') || color;
    }

	context.strokeStyle = color;
	context.fillStyle = color;
	context.lineWidth = size;
	context.beginPath();
	context.moveTo(sX, sY);
	context.lineTo(tX, tY);
	context.stroke();
	context.beginPath();
	if (mirror) {
		context.moveTo(aX, aY);
		context.lineTo(aX + vX - vY * 0.6, aY + vY + vX * 0.6);
		context.lineTo(aX + vX + vY * 0.6, aY + vY - vX * 0.6);
		context.lineTo(aX, aY);
	} else {
		context.moveTo(aX + vX, aY + vY);
		context.lineTo(aX + vY * 0.6, aY - vX * 0.6);
		context.lineTo(aX - vY * 0.6, aY + vX * 0.6);
		context.lineTo(aX + vX, aY + vY);
	}
	context.fill();
  };
})();
