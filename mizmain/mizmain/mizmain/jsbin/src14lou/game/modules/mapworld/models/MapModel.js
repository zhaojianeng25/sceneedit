/**
* 世界地图
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var mapworld;
        (function (mapworld) {
            var models;
            (function (models) {
                var MapModel = /** @class */ (function () {
                    function MapModel() {
                        /**世界地图*/
                        this.WorldMapConfigData = {};
                        /**地图配置*/
                        this.MapConfigData = {};
                        MapModel._instance = this;
                    }
                    MapModel.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new MapModel();
                        }
                        return this._instance;
                    };
                    return MapModel;
                }());
                models.MapModel = MapModel;
            })(models = mapworld.models || (mapworld.models = {}));
        })(mapworld = modules.mapworld || (modules.mapworld = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=MapModel.js.map