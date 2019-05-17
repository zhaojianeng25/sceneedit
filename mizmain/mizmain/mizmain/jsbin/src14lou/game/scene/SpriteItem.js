/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var SpriteItem = /** @class */ (function () {
            function SpriteItem(itemName) {
                /*正在下载...*/
                this._loading = false;
                /*当前已全部下载*/
                this._loaded = false;
                /*是否错误*/
                this._isError = false;
                /*索引文件已下载*/
                this._idxLoaded = false;
                /*装备图来源*/
                this._sheetLoaders = new Array();
                /*是否预加载*/
                this._isPreload = false;
                this._itemName = itemName;
                this._fullPath = SpriteItem._path + this._itemName;
            }
            Object.defineProperty(SpriteItem, "path", {
                set: function (v) {
                    this._path = v;
                },
                enumerable: true,
                configurable: true
            });
            // 加载idxzip文件 	
            SpriteItem.loadIdxZip = function (caller) {
                var _this = this;
                //回调不允许为空
                if (caller == null)
                    loge("AvatarItem.loadIdxZip callBack is null.");
                //解压出来的在，则忽略下面
                if (SpriteItem.G_IDXaddressFiles) {
                    caller.onComplete();
                    return;
                }
                //如果该回调存在，则忽略，不需要重复监听
                if (SpriteItem.G_callers.indexOf(caller) >= 0)
                    return;
                //插入到队列
                SpriteItem.G_callers.push(caller);
                var url = SpriteItem._path + "idxzip.bin";
                var refAsset = RefAsset.Get(url);
                refAsset.retain();
                if (!refAsset.parseComplete) {
                    refAsset.once(LEvent.COMPLETE, this, function () {
                        var data = Laya.loader.getRes(url);
                        refAsset.release(true);
                        _this.onG_SOURCE_Complete(data);
                    });
                }
                else {
                    var data_1 = Laya.loader.getRes(url);
                    refAsset.release(true);
                    this.onG_SOURCE_Complete(data_1);
                }
            };
            //索引文件下载完成
            SpriteItem.onG_SOURCE_Complete = function (data) {
                //转换成ByteArray
                SpriteItem.G_BUFFER = new ByteArray(data);
                SpriteItem.G_BUFFER.uncompress();
                //读取
                var filesCount = SpriteItem.G_BUFFER.readUnsignedInt();
                SpriteItem.G_IDXaddressFiles = new laya.utils.Dictionary();
                //内存地址偏移
                for (var i = 0; i < filesCount; i++) {
                    var fileName = SpriteItem.G_BUFFER.readUTF();
                    var fileSize = SpriteItem.G_BUFFER.readUnsignedShort();
                    SpriteItem.G_IDXaddressFiles.set(fileName, SpriteItem.G_BUFFER.position);
                    SpriteItem.G_BUFFER.position += fileSize;
                }
                //开始处理回调
                for (var j = 0; j < SpriteItem.G_callers.length; j++) {
                    var si = SpriteItem.G_callers[j];
                    si.onComplete();
                }
                SpriteItem.G_callers.length = 0;
            };
            Object.defineProperty(SpriteItem.prototype, "isError", {
                /**
                 * 加载是否出错
                 * @return
                 *
                 */
                get: function () {
                    //return SpriteItem.G_isError || this._isError;
                    return this._isError;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SpriteItem.prototype, "isLoaded", {
                /**
                 * 是否已下载
                 * @return
                 *
                 */
                get: function () {
                    return this._loaded;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SpriteItem.prototype, "itemName", {
                /**
                 * 装备名称
                 * @return
                 *
                 */
                get: function () {
                    return this._itemName;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 预加载
             *
             */
            SpriteItem.prototype.preLoad = function () {
                var i;
                //如果有指定预加载包
                if (this._resPacketIdxs) {
                    for (i = 0; i < this._resPacketIdxs.length; i++) {
                        var resIdx = this._resPacketIdxs[i];
                        if (resIdx >= 0 && resIdx < scene.AvatarData.MAX_RES_PACKET)
                            this.startLoadPacket(resIdx);
                    }
                }
                else { //没有 则加载所有
                    for (i = 0; i < scene.AvatarData.MAX_RES_PACKET; i++) {
                        this.startLoadPacket(i);
                    }
                }
            };
            /**
             * 开始加载包
             * @param resIdx
             *
             */
            SpriteItem.prototype.startLoadPacket = function (resIdx) {
                //如果时间已经到达，则直接下载
                var spanTime = SpriteItem.NEXT_PRELOAD_TIME - Laya.timer.currTimer;
                SpriteItem.NEXT_PRELOAD_TIME = Laya.timer.currTimer + SpriteItem.INTERVAL_TIME;
                if (spanTime < 0 || spanTime > SpriteItem.MAX_INTERVAL_TIME) {
                    this.loadPacket(resIdx);
                }
                else {
                    setTimeout(this.loadPacket, spanTime, resIdx);
                    SpriteItem.NEXT_PRELOAD_TIME += spanTime;
                }
            };
            /**
             * 加载资源包
             * @param resIdx
             * @return
             *
             */
            SpriteItem.prototype.loadPacket = function (sheetid) {
                //得到png加载器,如果没有则创建并加载
                var aploader = this._sheetLoaders.length > sheetid ? this._sheetLoaders[sheetid] : null;
                var url = this._fullPath + "_" + sheetid.toString() + ".png";
                if (!aploader) {
                    aploader = new scene.AvatarPacketLoader(url);
                    this._sheetLoaders[sheetid] = aploader;
                    aploader.index = sheetid;
                }
                return aploader;
            };
            /**
             * 开始下载
             * @param isPreload			是否预加载
             * @param resPacketIdxs		指定预加载包索引列表
             *
             */
            SpriteItem.prototype.download = function (isPreload, resPacketIdxs) {
                if (resPacketIdxs === void 0) { resPacketIdxs = null; }
                this._isPreload = isPreload;
                this._resPacketIdxs = resPacketIdxs;
                //已经处于下载完成状态，无需下载
                if (this._loaded || this._loading)
                    return;
                this._loading = true;
                //loadzip
                SpriteItem.loadIdxZip(this);
            };
            SpriteItem.prototype.onComplete = function () {
                var addressValue = SpriteItem.G_IDXaddressFiles.get(this.itemName);
                if (!addressValue) {
                    this._isError = true;
                    return;
                }
                try {
                    //开始解析idx文件
                    SpriteItem.G_BUFFER.position = addressValue;
                    this.readIdxFile(SpriteItem.G_BUFFER);
                }
                catch (e) {
                    this._isError = true;
                    logd("AvatarItem.onComplete.readIdxFile is Error :" + e.message + "[" + this._itemName + "]");
                    return;
                }
                // //转换成ByteArray
                // var data:ByteArray = new ByteArray(Laya.loader.getRes(this._idxURL));
                // // data.endian = Endian.BIG_ENDIAN;
                // if(data.length==0){
                // 	this._isError = true;
                // 	return;
                // }
                // try{
                // 	this.readIdxFile(data);
                // }catch(e){
                // 	logd("[game.scene.SpriteItem.readIdxFile] error.",e);
                // }
                //广播事件
                this._loaded = true;
                //启动预加载
                if (this._isPreload)
                    this.preLoad();
            };
            SpriteItem.prototype.readIdxFile = function (stream) {
                throw new Error("Unrealized function:readIdFile ");
            };
            SpriteItem.prototype.clear = function (checkNow) {
                for (var i = 0; i < this._sheetLoaders.length; i++) {
                    if (this._sheetLoaders[i]) {
                        this._sheetLoaders[i].close(checkNow);
                        this._sheetLoaders[i] = null;
                    }
                }
                this._sheetLoaders.length = 0;
            };
            /*错误累计次数*/
            SpriteItem.G_errorCount = 0;
            /*是否出错*/
            SpriteItem.G_isError = false;
            /*错误重试次数*/
            SpriteItem.ERRORTRY_COUNT = 3;
            /*所有请求的回调*/
            SpriteItem.G_callers = new Array();
            /**
             * 间隔时间
             */
            SpriteItem.INTERVAL_TIME = 2000;
            /**
             * 不得超过的最大间隔
             */
            SpriteItem.MAX_INTERVAL_TIME = 2000;
            return SpriteItem;
        }());
        scene.SpriteItem = SpriteItem;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=SpriteItem.js.map