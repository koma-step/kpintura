(function() {
    this.Home = function() {

    };

    Home.prototype.init = function() {
        vControl.initView();
        gControl.init();
        hControl.init();
    };
}());

var home = new Home();
var vControl = new ViewController();
var hControl = new HomeController();
var gControl = new GalerieController();
var mControl = new MediaController();
$(document).ready(function() {
    home.init();
});