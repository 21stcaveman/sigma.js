;(function() {
  'use strict';

  sigma.utils.pkg('sigma.svg.nodes');

  // TODO: udate documentation for subrendererers + maybe externalize important
  // things

  /**
   * The default node renderer. It renders the node as a simple disc.
   *
   * @param  {object}                   node     The node object.
   * @param  {DOMElement}               context  The SVG context.
   * @param  {configurable}             settings The settings function.
   */
  sigma.svg.nodes.def = {
    create: function(node, settings) {
      var prefix = settings('prefix') || '',
          circle = document.createElementNS(settings('xmlns'), 'circle');

      // Defining the node's circle
      circle.setAttributeNS(null, 'data-node-id', node.id);
      circle.setAttributeNS(null, 'class', settings('classPrefix') + '-node');
      circle.setAttributeNS(
        null, 'fill', node.color || settings('defaultNodeColor'));

      // Returning the DOM Element
      return circle;
    },
    update: function(node, circle, settings) {
      var prefix = settings('prefix') || '';

      // Applying changes
      // TODO: optimize - check if necessary
      circle.setAttributeNS(null, 'cx', node[prefix + 'x']);
      circle.setAttributeNS(null, 'cy', node[prefix + 'y']);
      circle.setAttributeNS(null, 'r', node[prefix + 'size']);
      circle.setAttributeNS(
        null, 'fill', node.color || settings('defaultNodeColor'));

      // Showing
      circle.style.display = '';

      return this;
    },
    hide: function(circle) {
      circle.style.display = 'none';
      return this;
    }
  };
})();
