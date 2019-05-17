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
    var scene;
    (function (scene) {
        var AvatarItem = /** @class */ (function (_super) {
            __extends(AvatarItem, _super);
            function AvatarItem(itemName) {
                var _this = _super.call(this, itemName) || this;
                //////////////////////////////////////////////////////////////////////////////////////////
                // 引用计数
                _this._refCount = 0;
                // 超时时间
                _this._timeOut = 0;
                // 延长的超时时间
                _this._addTimeOut = 0;
                _this._subTextures = new Array(AvatarItem.FRAME_TEXTURE_LEN);
                /*
                第一组帧数据
                精灵表编号(uint8)
                精灵表x坐标(uint16)
                精灵表y坐标(uint16)
                帧图片宽度(uint16)
                针图片高度(uint16)
                帧图片注册点x(int16)
                帧图片注册点y(int16)
                */
                _this._frameData = new Array(AvatarItem.FRAME_DATA_LEN);
                /*是否存在动作的标志位*/
                _this._actionExtisFlag = new Array(scene.AvatarData.MAX_ACTION);
                /*
                名称：动作21 方向5
                位：  11111  111
                最大：31     7
                偏移：<<3    +
                与操：&0x1F  &0x07
                255长度
                */
                _this._frameLength = new Array(AvatarItem.FRAME_LENGTH_LEN);
                _this._atOnceRelease = false;
                return _this;
            }
            AvatarItem.Get = function (itemName, isPreload, priorityLevel, resPacketIdxs, create) {
                if (isPreload === void 0) { isPreload = false; }
                if (priorityLevel === void 0) { priorityLevel = 0; }
                if (resPacketIdxs === void 0) { resPacketIdxs = null; }
                if (create === void 0) { create = true; }
                var item = this._refMap[itemName];
                if (create && !item) {
                    // logd("AvatarRes.GetAvatarItem new AvatarItem(" + itemName + ")");
                    item = new AvatarItem(itemName);
                    item.addTimeOut = this.MAX_FREE_TIME;
                    this.Set(itemName, item);
                }
                item.download(isPreload, resPacketIdxs);
                return item;
            };
            AvatarItem.Set = function (key, asset) {
                this._refMap[key] = asset;
            };
            AvatarItem.update = function (diff) {
                var currTimer = Laya.timer.currTimer;
                if (diff != -1 && currTimer < this._nextTimer) {
                    return;
                }
                this._nextTimer = currTimer + 1000; // 检查频率1秒
                var map = this._refMap;
                for (var key in map) {
                    var obj = map[key];
                    // logd("RefAsset.update", "url", key, "refCount", obj._refCount, "timeOut", obj._timeOut);
                    if (obj.update(currTimer)) {
                        delete map[key];
                    }
                }
            };
            // 清理素材 	
            AvatarItem.clear = function () {
                // logd("AvatarRes.clear()");
                var map = this._refMap;
                for (var key in map) {
                    var obj = map[key];
                    obj._atOnceRelease = true;
                    obj.clear();
                    delete map[key];
                }
            };
            /**
             * 获得指定动作编号和方向编号的内存地址
             * @param action 动作
             * @param direct 方向
             * @param frameIndex 帧索引
             * @return
             *
             */
            AvatarItem.get_AD_Address = function (actionIdx, directIdx) {
                return (actionIdx << 10) + (directIdx << 7);
            };
            /**
             * 通过索引位置换算出动作索引
             * @param pos
             * @return
             *
             */
            AvatarItem.getActionIdx = function (fd_address) {
                return (fd_address >> 10) & 0x1F;
            };
            /**
             * 通过索引位置换算出方向索引
             * @param pos
             * @return
             */
            AvatarItem.getDirectIdx = function (fd_address) {
                return (fd_address >> 7) & 0x07;
            };
            /**
             * 通过索引位置换算出帧索引
             * @param pos
             * @return
             */
            AvatarItem.getFrameIdx = function (fd_address) {
                return (fd_address >> 3) & 0x0F;
            };
            /**
             * 获得帧数量的位置
             * @param action 动作
             * @param direct 方向
             * @return
             */
            AvatarItem.getFrameLengthPos = function (action, direct) {
                return (action << 3) + direct;
            };
            AvatarItem.getFrameDataAddress = function (action, direct, idx) {
                return (action << 10) + (direct << 7) + (idx << 3);
            };
            Object.defineProperty(AvatarItem.prototype, "addTimeOut", {
                set: function (v) {
                    this._addTimeOut = v;
                },
                enumerable: true,
                configurable: true
            });
            // 引用
            AvatarItem.prototype.retain = function () {
                this._refCount++;
                this._timeOut = 0;
            };
            // 释放引用
            AvatarItem.prototype.release = function (checkNow) {
                if (checkNow === void 0) { checkNow = false; }
                this._atOnceRelease = checkNow;
                if (this._refCount <= 0) {
                    loge("release error this._reCount <= 0");
                    return;
                }
                this._refCount--;
                if (checkNow) {
                    this.checkNow();
                }
                else {
                    if (this._refCount == 0) {
                        this._timeOut = Laya.timer.currTimer + this._addTimeOut;
                    }
                }
            };
            // 立即检查超时
            AvatarItem.prototype.checkNow = function () {
                if (this._refCount == 0) {
                    // 标记过期
                    this._timeOut = Laya.timer.currTimer - 1;
                }
            };
            /**
             * 获得帧数量
             * @param action
             * @param direct
             * @return
             */
            AvatarItem.prototype.getFrameLength = function (action, direct) {
                var pos = AvatarItem.getFrameLengthPos(action, direct);
                return this._frameLength[pos];
            };
            /**
             * 获得位图
             * @param pos 位置
             * @return
             */
            AvatarItem.prototype.getBitmapData = function (fd_address) {
                //判断位图是否存在
                var ad_address = fd_address >> 3;
                var subTexture = this._subTextures[ad_address];
                if (subTexture && this._sheetLoaders.length)
                    return subTexture;
                //通过动作得到所在的分租
                var sheetid = this.getSheetID(fd_address);
                //找不到没有素材包
                if (!sheetid) {
                    return null;
                }
                //得到png资源包
                var atfLoader = this.loadPacket(sheetid);
                //如果加载未成功，则返回null
                if (!atfLoader.isSuccessful)
                    return null;
                subTexture = Texture.createFromTexture(this._sheetLoaders[sheetid].texture, this.getFrameAtSheetX(fd_address), this.getFrameAtSheetY(fd_address), this.getFrameWidth(fd_address), this.getFrameHeight(fd_address));
                subTexture["__ROOT_ID"] = atfLoader.rootID;
                this._subTextures[ad_address] = subTexture;
                return subTexture;
            };
            /**
             * 获得精灵表id
             * @param pos
             * @return
             */
            AvatarItem.prototype.getSheetID = function (fd_address) {
                return this._frameData[fd_address];
            };
            /**
             * 获得位于精灵表的X
             * @param pos
             * @return
             */
            AvatarItem.prototype.getFrameAtSheetX = function (fd_address) {
                return this._frameData[fd_address + 1];
            };
            /**
             * 获得位于精灵表的Y
             * @param pos
             * @return
             */
            AvatarItem.prototype.getFrameAtSheetY = function (fd_address) {
                return this._frameData[fd_address + 2];
            };
            /**
             * 获得帧宽度
             * @param pos
             * @return
             */
            AvatarItem.prototype.getFrameWidth = function (fd_address) {
                return this._frameData[fd_address + 3];
            };
            /**
             * 获得帧高度
             * @param pos
             * @return
             */
            AvatarItem.prototype.getFrameHeight = function (fd_address) {
                return this._frameData[fd_address + 4];
            };
            /**
             * 获得帧动画播放注册点X
             * @param pos
             * @return
             */
            AvatarItem.prototype.getFrameRegX = function (fd_address) {
                return this._frameData[fd_address + 5];
            };
            /**
             * 获得帧动画播放注册点Y
             * @param pos
             * @return
             */
            AvatarItem.prototype.getFrameRegY = function (fd_address) {
                return this._frameData[fd_address + 6];
            };
            //读取索引文件
            //之前已经读取了一个ubyte的png数量
            AvatarItem.prototype.readIdxFile = function (stream) {
                //读取当前的动作数
                var actionCount = stream.readUnsignedByte();
                for (var a = 0; a < actionCount; a++) {
                    //动作编号
                    var actionIdx = stream.readUnsignedByte();
                    //获取方向数
                    var directCount = stream.readUnsignedByte();
                    //标识动作存在
                    this._actionExtisFlag[actionIdx] = directCount > 0;
                    for (var d = 0; d < directCount; d++) {
                        //方向编号
                        var directIdx = stream.readUnsignedByte();
                        //读取帧数
                        var frameCount = stream.readUnsignedByte();
                        //设置帧数量
                        this._frameLength[AvatarItem.getFrameLengthPos(actionIdx, directIdx)] = frameCount;
                        for (var i = 0; i < frameCount; i++) {
                            //帧具体地址
                            var fd_address = AvatarItem.getFrameDataAddress(actionIdx, directIdx, i);
                            //精灵表编号
                            this._frameData[fd_address] = stream.readUnsignedByte();
                            //精灵表y坐标(uint16)
                            this._frameData[fd_address + 1] = stream.readUnsignedShort();
                            //精灵表x坐标(uint16) 
                            this._frameData[fd_address + 2] = stream.readUnsignedShort();
                            //帧图片宽度(uint16)
                            this._frameData[fd_address + 3] = stream.readUnsignedShort();
                            //帧图片高度(uint16)
                            this._frameData[fd_address + 4] = stream.readUnsignedShort();
                            //帧图片注册点x(int16)
                            this._frameData[fd_address + 5] = stream.readShort();
                            //帧图片注册点y(int16)
                            this._frameData[fd_address + 6] = stream.readShort();
                        }
                    }
                }
            };
            /**
             *  动作不存在
             * @param action 动作编号枚举
             * @return
             */
            AvatarItem.prototype.isNonentityAction = function (action) {
                return !this._actionExtisFlag[action];
            };
            /**
             * 设置动作拷贝
             * @param srcAction 源动作
             * @param dstAction 目标动作
             */
            AvatarItem.prototype.setActionCopy = function (srcAction, dstAction) {
                //都不存在，拷个P
                if (!this._actionExtisFlag[dstAction] && !this._actionExtisFlag[srcAction]) {
                    return;
                }
                //以前拷贝过了
                if (this._actionExtisFlag[dstAction] == this._actionExtisFlag[srcAction]) {
                    return;
                }
                //标识动作存在
                this._actionExtisFlag[dstAction] = this._actionExtisFlag[srcAction];
                for (var directIdx = 0; directIdx < scene.AvatarData.MAX_DIRECT; directIdx++) {
                    //读取帧数
                    var sFrameCount = this.getFrameLength(srcAction, directIdx);
                    //设置帧数量
                    this._frameLength[AvatarItem.getFrameLengthPos(dstAction, directIdx)] = sFrameCount;
                    for (var i = 0; i < sFrameCount; i++) {
                        var s_fd_address = AvatarItem.getFrameDataAddress(srcAction, directIdx, i);
                        var d_fd_address = AvatarItem.getFrameDataAddress(dstAction, directIdx, i);
                        //帧信息复制
                        this._frameData[d_fd_address] = this._frameData[s_fd_address];
                        this._frameData[d_fd_address + 1] = this._frameData[s_fd_address + 1];
                        this._frameData[d_fd_address + 2] = this._frameData[s_fd_address + 2];
                        this._frameData[d_fd_address + 3] = this._frameData[s_fd_address + 3];
                        this._frameData[d_fd_address + 4] = this._frameData[s_fd_address + 4];
                        this._frameData[d_fd_address + 5] = this._frameData[s_fd_address + 5];
                        this._frameData[d_fd_address + 6] = this._frameData[s_fd_address + 6];
                    }
                }
            };
            AvatarItem.prototype.update = function (currTimer) {
                var timeOut = this._timeOut && (currTimer > this._timeOut);
                if (timeOut) {
                    this.clear();
                }
                return timeOut;
            };
            AvatarItem.prototype.clear = function () {
                for (var i = 0; i < this._subTextures.length; i++) {
                    this._subTextures[i] = null;
                }
                // logd("AvatarItem.clear", this._itemName);
                _super.prototype.clear.call(this, this._atOnceRelease);
            };
            AvatarItem.MAX_FREE_TIME = 2000; // 超时释放时间
            AvatarItem._refMap = {}; // 列表
            AvatarItem._nextTimer = 0;
            /*数据源，[动作][方向][帧列表]*/
            //private var _data:Array<Array<Array<AvatarFrame>>>;
            ////////////////////// 内容部分 ////////////////////////////
            /*
            最大：动作31    方向7     帧数15		帧信息7
            位：  11111     111         1111		111
            偏移：<<10    <<7        <<3			+
            与操：&0x1F   &0x07    &0x0F		0x07
            4095长度,32767长度,255长度
            */
            AvatarItem.FRAME_TEXTURE_LEN = 4095;
            AvatarItem.FRAME_DATA_LEN = 32767;
            AvatarItem.FRAMEDATA_ELEM_LEN = 7;
            AvatarItem.FRAME_LENGTH_LEN = 255;
            return AvatarItem;
        }(scene.SpriteItem));
        scene.AvatarItem = AvatarItem;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=AvatarItem.js.map