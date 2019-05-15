var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var mapworld;
        (function (mapworld) {
            var models;
            (function (models) {
                models.LOGIN_EVENT = "loginEvent";
                var MapProxy = /** @class */ (function (_super) {
                    __extends(MapProxy, _super);
                    function MapProxy() {
                        var _this = _super.call(this) || this;
                        MapProxy._instance = _this;
                        _this.init();
                        return _this;
                    }
                    MapProxy.getInstance = function () {
                        if (!this._instance) {
                            this._instance = new MapProxy();
                        }
                        return this._instance;
                    };
                    MapProxy.prototype.init = function () {
                        LoginModel.getInstance();
                        this.addNetworkListener();
                        Laya.loader.load("common/data/temp/map.cworldmapconfig.bin", Handler.create(this, this.onloadedWorldMapConfigBaseVoComplete), null, Loader.BUFFER);
                        Laya.loader.load("common/data/temp/map.cmapconfig.bin", Handler.create(this, this.onloadedMapConfigBaseVoComplete), null, Loader.BUFFER);
                    };
                    MapProxy.prototype.onloadedMapConfigBaseVoComplete = function () {
                        console.log("cmapconfig 表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/map.cmapconfig.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.MapModel.getInstance().MapConfigData, game.data.template.MapConfigBaseVo, "id");
                        // console.log("cmapconfig.configData:",this.MapConfigData);
                    };
                    MapProxy.prototype.onloadedWorldMapConfigBaseVoComplete = function () {
                        console.log("cworldmapconfig 表格加载完毕 completed");
                        var arrayBuffer = Laya.loader.getRes("common/data/temp/map.cworldmapconfig.bin");
                        var data = new Byte(arrayBuffer);
                        var size = game.data.ProjTemplate.readDataHead(data);
                        ByteArrayUtils.FillList(data, size, models.MapModel.getInstance().WorldMapConfigData, game.data.template.WorldMapConfigBaseVo, "id");
                        // console.log("cworldmapconfig.configData:",this.WorldMapConfigData);
                    };
                    // 添加监听
                    MapProxy.prototype.addNetworkListener = function () {
                        Network._instance.addHanlder(ProtocolsEnum.SRoleList, this, this.onRoleList);
                    };
                    // 移除监听
                    MapProxy.prototype.removeNetworkListener = function () {
                        Network._instance.removeHanlder(ProtocolsEnum.SRoleList, this, this.onRoleList);
                    };
                    // 角色列表返回
                    MapProxy.prototype.onRoleList = function (optcode, msg) {
                        console.log("onRoleList", optcode, msg);
                        console.log("onRoleList", msg.prevLoginRoleid);
                        console.log("onRoleList", msg.prevRoleInBattle);
                        console.log("onRoleList", msg.roles);
                        console.log("onRoleList", msg.gacdon);
                    };
                    return MapProxy;
                }(hanlder.ProxyBase));
                models.MapProxy = MapProxy;
            })(models = mapworld.models || (mapworld.models = {}));
        })(mapworld = modules.mapworld || (modules.mapworld = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=MapProxy.js.map