/**
* name
*/
var game;
(function (game) {
    var utils;
    (function (utils) {
        var Vesion = /** @class */ (function () {
            function Vesion() {
            }
            Object.defineProperty(Vesion, "eventDispatcher", {
                get: function () {
                    if (!this._eventDispatcher)
                        this._eventDispatcher = new EventDispatcher();
                    return this._eventDispatcher;
                },
                enumerable: true,
                configurable: true
            });
            Vesion.on = function (type, caller, listener, args) {
                return this.eventDispatcher.on(type, caller, listener, args);
            };
            Vesion.once = function (type, caller, listener, args) {
                return this.eventDispatcher.once(type, caller, listener, args);
            };
            Vesion.off = function (type, caller, listener, onceOnly) {
                return this.eventDispatcher.off(type, caller, listener, onceOnly);
            };
            Vesion.event = function (type, data) {
                return this.eventDispatcher.event(type, data);
            };
            /**
             * 添加文件搜索路径
             * @param path				路径
             * @param isFront			是否插在前面
             */
            Vesion.addSearchPath = function (path, langRes, isFront) {
                if (langRes === void 0) { langRes = null; }
                if (isFront === void 0) { isFront = false; }
                if (isFront) {
                    this._searchPaths.unshift(path);
                    this._searchPathLangRes.unshift(langRes);
                }
                else {
                    this._searchPaths.push(path);
                    this._searchPathLangRes.push(langRes);
                }
            };
            // 加载文件版本信息文件
            Vesion.loadVesionFile = function () {
                var _this = this;
                var url = gameConf.vesionFileUrl;
                if (url && url != "") {
                    //加载vesionFile
                    Laya.loader.load(url, Handler.create(this, function (data) {
                        var str = data ? utils.StringU.readZlibData(new ByteArray(data)) : null;
                        Laya.loader.clearRes(url, true);
                        _this.initVesionFiles(str);
                    }, null, true));
                }
                else {
                    Laya.loader.clearRes(url, true);
                    this.initVesionFiles(null);
                }
            };
            // 初始化文件版本控制	
            Vesion.initVesionFiles = function (value) {
                var _this = this;
                if (value) {
                    var lines = value.split("\n");
                    this._defaultVesion = lines[1];
                    for (var i = 0; i < lines.length; i++) {
                        if (!lines[i] || lines[i].length == 0)
                            continue;
                        var cols = lines[i].split(" ");
                        if (cols.length == 2) {
                            this._VESION_FILES[cols[0]] = cols[1];
                        }
                    }
                }
                // 重写一下url格式化函数
                this.baseFormatURL = Laya.URL.formatURL;
                // 加载语言包的formatURL
                Laya.URL.formatURL = function (url, base) {
                    url = _this.createVersion(url);
                    return _this.baseFormatURL(url);
                };
                this.event(this.LOAD_VESION_COMPLETE);
                this.loadLangRes();
            };
            // 获取url formatURL(url: string, base?: string): string;
            Vesion.formatURL = function (url, base) {
                if (!url || url.indexOf('?v=') != -1) {
                    return url;
                }
                if (!base) {
                    base = Laya.URL.basePath;
                }
                if (url.indexOf(base) == 0) {
                    url = url.replace(base, "");
                }
                var commonPath = "common/";
                var path = null;
                if (url.indexOf(commonPath) == 0) {
                    // 已经是版本路径了
                    path = "";
                }
                if (path == null) {
                    for (var i = 0; i < this._searchPaths.length; i++) {
                        if (url.indexOf(this._searchPaths[i]) == 0) {
                            // 已经是版本路径了
                            path = "";
                            break;
                        }
                        var fiels = this._searchPathFiels[this._searchPaths[i]];
                        if (fiels && fiels[url]) {
                            path = this._searchPaths[i];
                            break;
                        }
                    }
                }
                if (path == null) {
                    path = commonPath;
                }
                //生成版本号
                url = this.createVersion(path + url);
                // else{
                // 	logd("formatURL repeat", url, base);
                // }
                url = this.baseFormatURL(url);
                // logd("xxx", url)
                return url;
            };
            Vesion.createVersion = function (url) {
                //生成版本号
                var v = null;
                if (!this._VESION_FILES || !this._VESION_FILES[url]) {
                    // 没有版本信息使用默认版本号
                    v = this._defaultVesion;
                }
                else {
                    // 使用版本信息文件里描述的版本号
                    v = this._VESION_FILES[url];
                }
                // 使用版本信息的版本号
                return v ? url + "?v=" + v : url;
            };
            /**
             * 加载语言包信息
             * @param callBack
             */
            Vesion.loadLangRes = function (idx) {
                var _this = this;
                if (idx === void 0) { idx = 0; }
                if (idx >= this._searchPathLangRes.length) {
                    // 正常阶段的formatURL
                    Laya.URL.formatURL = function (url, base) {
                        return _this.formatURL(url, base);
                    };
                    this.event(this.LOAD_DATA_COMPLETE);
                    return;
                }
                var langRes = this._searchPathLangRes[idx];
                var searchPath = this._searchPaths[idx];
                idx++;
                if (!langRes || langRes == '') {
                    this.loadLangRes(idx);
                    return;
                }
                var url = searchPath + langRes;
                Laya.loader.load(url, Handler.create(this, function (data) {
                    Laya.loader.clearRes(url, true);
                    _this.initLang(data, url);
                    _this.loadLangRes(idx);
                }, null, true));
            };
            /**
             * 初始化语言资源包
             */
            Vesion.initLang = function (data, searchPath, covered) {
                if (covered === void 0) { covered = false; }
                if (!data) {
                    return;
                }
                data = new ByteArray(data);
                var fielsPath = this._searchPathFiels[searchPath];
                if (!fielsPath) {
                    fielsPath = {};
                    this._searchPathFiels[searchPath] = fielsPath;
                }
                var pathStrs = utils.StringU.readZlibData(data);
                // let t1 = new Date().getTime();
                var jsStrs = utils.StringU.readZlibData(data);
                // logd(111111, new Date().getTime() - t1);
            };
            // 版本文件加载完成
            Vesion.LOAD_VESION_COMPLETE = "LOAD_VESION_COMPLETE";
            // 数据加载完成
            Vesion.LOAD_DATA_COMPLETE = "LOAD_DATA_COMPLETE";
            /*文件搜索路径*/
            Vesion._searchPaths = [];
            Vesion._searchPathLangRes = [];
            Vesion._searchPathFiels = {};
            /*文件版本控制*/
            Vesion._VESION_FILES = {};
            return Vesion;
        }());
        utils.Vesion = Vesion;
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
//# sourceMappingURL=Vesion.js.map