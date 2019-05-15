/**
* name
*/
var game;
(function (game) {
    var modules;
    (function (modules) {
        var ModuleManager = /** @class */ (function () {
            function ModuleManager() {
            }
            /*public static init(LoadModuleCmd:any):void {
                this._LoadModuleCmd = LoadModuleCmd;
            }*/
            ModuleManager.loadAndDispatch = function (name, e, data, app) {
                if (data === void 0) { data = null; }
                //显示新模块
                this.clientDic.set(name, new modules.ModuleEvent(e, data));
                //new this._LoadModuleCmd().execute(name, this.onLoad);
                this.loadModuleExecute(name, app, this.onLoad);
            };
            ModuleManager.onLoad = function (m, n) {
                if (ModuleManager.clientDic.get(n)) {
                    //var fun:ModuleEvent = ModuleManager.clientDic[n];
                    var fun = ModuleManager.clientDic.get(n);
                    m.event(fun.type, fun.data);
                    ModuleManager.clientDic.remove(n);
                }
            };
            ModuleManager.dispatchWhenLoaded = function (name, e, data) {
                if (data === void 0) { data = null; }
                if (this.instanceDic[name] != null) {
                    if (!this.instanceDic[name].isShow) {
                        return;
                    }
                    this.instanceDic[name].event(e, data);
                }
            };
            /*public static regForLoader(mainCmd:int, subCmd:int, name:String):void {
                var eventType:String=(mainCmd*256+subCmd).toString();
                SocketService.getInstance().addRspdEvent(mainCmd, subCmd, onNetMsgEvent);
                mDic[eventType]=name;
            }*/
            ModuleManager.show = function (name, app) {
                ModuleManager.loadAndDispatch(name, modules.ModuleEvent.SHOW, null, app);
            };
            ModuleManager.jumpPage = function (name, page, app) {
                ModuleManager.loadAndDispatch(name, modules.ModuleEvent.JUMP, page, app);
            };
            ModuleManager.hide = function (name) {
                ModuleManager.dispatchWhenLoaded(name, modules.ModuleEvent.HIDE);
            };
            ModuleManager.swap = function (name, app) {
                ModuleManager.loadAndDispatch(name, modules.ModuleEvent.SWAP, null, app);
            };
            ModuleManager.loadModuleExecute = function (moduleName, app, loadCmpFn) {
                //this.moduleName = moduleName;
                //this.loadCmpFn = loadCmpFn;			
                if (loadCmpFn === void 0) { loadCmpFn = null; }
                var sp = ModuleManager.instanceDic[moduleName];
                if (sp) { //如果模块已经加载过，就直接显示
                    if (loadCmpFn != null) {
                        loadCmpFn(sp, moduleName);
                    }
                    console.log("已经初始化过该模块了");
                    return;
                }
                var res = "common/" + "res/atlas/ui/" + moduleName.toLocaleLowerCase() + ".atlas";
                //var res:String = PassportModel.getInstance().resroot + "res/atlas/" + moduleName + ".json";
                Laya.loader.load([{ url: res, type: Loader.ATLAS }], Handler.create(null, function () {
                    var ModuleClass = modules.ModuleNames.getInstance().moduleClassDic[moduleName];
                    var _sp = new ModuleClass(app);
                    if (!_sp) {
                        console.log("模块未定义" + moduleName);
                        return;
                    }
                    ModuleManager.instanceDic[moduleName] = _sp;
                    if (loadCmpFn != null) {
                        loadCmpFn(_sp, moduleName);
                    }
                    console.log("模块初始化:", moduleName, res);
                }));
            };
            ModuleManager.instanceDic = new Laya.Dictionary();
            ModuleManager.clientDic = new Laya.Dictionary(); //模块名字为key ，客户端事件为value，用于处理客户端发出的 请求（模块未加载时候）
            return ModuleManager;
        }());
        modules.ModuleManager = ModuleManager;
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=ModuleManager.js.map