/**
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var LoadModuleCmd = /** @class */ (function () {
            function LoadModuleCmd() {
                this.totalLoadCount = 2;
            }
            LoadModuleCmd.prototype.execute = function (moduleName, loadCmpFn) {
                if (loadCmpFn === void 0) { loadCmpFn = null; }
                this.moduleName = moduleName;
                this.loadCmpFn = loadCmpFn;
                var sp = modules.ModuleManager.instanceDic[moduleName];
                if (sp) { //如果模块已经加载过就直接显示
                    if (loadCmpFn != null) {
                        loadCmpFn(sp, moduleName);
                    }
                    console.log("已经初始化过该模块了");
                    return;
                }
                var res = "" + "res/atlas/" + moduleName + ".atlas";
                //var res:String = PassportModel.getInstance().resroot + "res/atlas/" + moduleName + ".json";
                Laya.loader.load([{ url: res, type: Loader.ATLAS }], Handler.create(null, function () {
                    var ModuleClass = modules.ModuleNames.getInstance().moduleClassDic[moduleName];
                    var _sp = new ModuleClass();
                    if (!_sp) {
                        console.log("模块未定义" + moduleName);
                        return;
                    }
                    modules.ModuleManager.instanceDic[moduleName] = _sp;
                    if (loadCmpFn != null) {
                        loadCmpFn(_sp, moduleName);
                    }
                    console.log("模块初始化:", moduleName, res);
                }));
            };
            return LoadModuleCmd;
        }());
        modules.LoadModuleCmd = LoadModuleCmd;
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=LoadModuleCmd.js.map