(function() {
    this.DocumentController = function() {
        this.animate = false;
    };

    DocumentController.prototype.setAnimate = function(animate) {
        this.animate = animate;
    };

    DocumentController.prototype.onAnimate = function() {
        this.animate = true;
    };

    DocumentController.prototype.stopAnim = function() {
        this.animate = false;
    };

    DocumentController.prototype.isAnimate = function() {
        return this.animate;
    };
}());

var docControl = new DocumentController();