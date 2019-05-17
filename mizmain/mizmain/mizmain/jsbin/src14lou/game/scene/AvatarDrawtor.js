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
        var AvatarDrawtor = /** @class */ (function (_super) {
            __extends(AvatarDrawtor, _super);
            function AvatarDrawtor(pScene, bottomG, nameG, maskG, gossipG) {
                var _this = _super.call(this) || this;
                _this.avatarInited = false;
                _this._updateRunTime = 0;
                // 进入视野队列
                _this._inLookQueue = [];
                _this.layerIndex = 0;
                //场景赋值
                _this._scene = pScene;
                _this._bottomG = bottomG;
                _this._nameG = nameG;
                _this._maskG = maskG;
                _this._gossipG = gossipG;
                //avatar集合
                _this._avatars = new Array();
                //avatar数据加载
                var url = game.Path.scene_avatar + "avatar.data";
                var refAsset = RefAsset.Get(url);
                refAsset.retain();
                if (!refAsset.parseComplete) {
                    refAsset.once(LEvent.COMPLETE, _this, function () {
                        var data = Laya.loader.getRes(url);
                        refAsset.release(true);
                        _this.onAvatarDataComplete(data);
                    });
                }
                else {
                    var data_1 = Laya.loader.getRes(url);
                    refAsset.release(true);
                    _this.onAvatarDataComplete(data_1);
                }
                _this._panSceneSprite = new PanSceneSprite();
                var scene3d = _this._panSceneSprite.scene;
                _this.addChild(_this._panSceneSprite);
                return _this;
            }
            Object.defineProperty(AvatarDrawtor.prototype, "scene3d", {
                get: function () {
                    return this._panSceneSprite ? this._panSceneSprite.scene : null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarDrawtor.prototype, "avatars", {
                get: function () {
                    return this._avatars;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AvatarDrawtor.prototype, "panSceneSprite", {
                get: function () {
                    return this._panSceneSprite;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 鼠标碰撞检测
             */
            AvatarDrawtor.prototype.hitTest = function (xMouse, yMouse, hit3DPos) {
                for (var i = 0; i < this._avatars.length; i++) {
                    var hitAvatar = this._avatars[i];
                    if (hitAvatar.hitTest(xMouse, yMouse, this._scene, hit3DPos)) {
                        return hitAvatar;
                    }
                }
                return null;
            };
            AvatarDrawtor.prototype.onResComplete = function () {
                scene.AvatarBase.initRes();
            };
            //avata数据加载完成
            AvatarDrawtor.prototype.onAvatarDataComplete = function (data) {
                scene.SpriteItem.path = game.Path.scene_avatar;
                //转换成ByteArray
                data = new ByteArray(data);
                data.uncompress();
                data.endian = Endian.BIG_ENDIAN;
                //初始化AvatarData对象
                scene.AvatarData.init(data);
                this.avatarInited = true;
            };
            /**
             * 查找avatar
             */
            AvatarDrawtor.prototype.FindAvatar = function (pUnit) {
                return pUnit.userData;
            };
            /**
             * 心跳
             */
            AvatarDrawtor.prototype.update = function (diff) {
                var _this = this;
                this._updateRunTime += diff;
                if (this._updateRunTime < 100)
                    return;
                this._updateRunTime = 0;
                var objMgr = this._scene.app.sceneObjectMgr;
                objMgr.ForEachObject(function (obj) {
                    var look = false;
                    if (obj instanceof Unit) {
                        _this.checkLook(obj);
                    }
                });
                this.updateInLookQueue();
            };
            AvatarDrawtor.prototype.checkLook = function (obj) {
                var sceneStoryMgr = this._scene.app.sceneObjectMgr.sceneStoryMgr;
                var look = !obj.hiding;
                if (look) {
                    if (sceneStoryMgr && sceneStoryMgr.haveSelfLookRule) {
                        look = sceneStoryMgr.lookIn(obj);
                    }
                    else {
                        look = this._scene.camera.lookIn(obj.pos);
                    }
                }
                //判断位置
                if (look) {
                    //视线范围内，没有关联数据，则添加
                    this.inLook(obj);
                }
                else {
                    //视线范围外，有关联数据，则移除
                    this.outLook(obj, false);
                }
            };
            /**
             * 对象在视野内
             */
            AvatarDrawtor.prototype.inLook = function (obj) {
                var followUnit = this._scene.app.sceneObjectMgr.followUnit;
                if (followUnit == obj) {
                    // 主玩家直接初始化
                    this.__inLook(obj, this._scene.camera.isFollow);
                }
                else {
                    // 其他形象进入队列
                    var idx = this._inLookQueue.indexOf(obj);
                    if (idx == -1) {
                        this._inLookQueue.push(obj);
                    }
                }
            };
            AvatarDrawtor.prototype.updateInLookQueue = function () {
                var inLookBatchCount = 1;
                var count = 0;
                while (count < inLookBatchCount && this._inLookQueue.length) {
                    var obj = this._inLookQueue.shift();
                    this.__inLook(obj);
                }
            };
            AvatarDrawtor.prototype.__inLook = function (obj, isFollow) {
                if (isFollow === void 0) { isFollow = false; }
                var avatar = obj.userData;
                if (!avatar) {
                    if (obj instanceof Unit) {
                        avatar = new scene.AvatarUnit(this._panSceneSprite.scene, obj);
                        if (obj instanceof FakeUnit) {
                            avatar.isNeedDrawView = obj.isNeedDrawView;
                        }
                    }
                }
                if (avatar) {
                    this.join(avatar);
                    if (isFollow) {
                        this._scene.camera.follow(avatar.pos);
                    }
                    else {
                        avatar.hitTestEnabled = true;
                    }
                }
            };
            /**
             * 对象不在视野内
             */
            AvatarDrawtor.prototype.outLook = function (obj, checkNow) {
                var idx = this._inLookQueue.indexOf(obj);
                if (idx != -1) {
                    this._inLookQueue.splice(idx, 1);
                }
                var avatar = obj.userData;
                if (avatar) {
                    this.leave(avatar, checkNow);
                    this._scene.camera.unFollow(avatar.pos);
                }
            };
            /**
             * 形象加入
             */
            AvatarDrawtor.prototype.join = function (avatar) {
                // logd("game.scene.AvatarDrawtor.join[", avatar.name, ",", avatar.guid, "]");
                if (this._avatars.indexOf(avatar) == -1) {
                    this._avatars.push(avatar);
                }
            };
            /**
             * 形象离开
             */
            AvatarDrawtor.prototype.leave = function (avatar, checkNow) {
                // logd("game.scene.AvatarDrawtor.leave[", avatar.name, ",", avatar.guid, "]");
                avatar.clear(checkNow);
                //Avatar从列表中删除
                var idx = this._avatars.indexOf(avatar);
                if (idx >= 0) {
                    this._avatars.splice(idx, 1);
                }
            };
            AvatarDrawtor.prototype.nextGraphics = function (filters) {
                if (filters === void 0) { filters = null; }
                var sp;
                if (this.numChildren > this.layerIndex) {
                    sp = this.getChildAt(this.layerIndex);
                    sp.graphics.clear();
                }
                else {
                    sp = new Sprite();
                    sp.mouseEnabled = false;
                    this.addChild(sp);
                }
                this.layerIndex++;
                sp.filters = filters;
                return sp.graphics;
            };
            AvatarDrawtor.prototype.onDraw = function (diff) {
                var aG = this.graphics;
                var bG = this._bottomG;
                var nG = this._nameG;
                var mG = this._maskG;
                var gG = this._gossipG;
                //清理画布
                aG.clear();
                nG.clear();
                mG.clear();
                gG.clear();
                //深度排序,绘制
                this.layerIndex = 0;
                this._avatars.sort(this.worldObjectDeepCmp);
                for (var i = 0; i < this._avatars.length; i++) {
                    //运算位置
                    var avatar = this._avatars[i];
                    if (!avatar.visible)
                        continue;
                    // 绘制之前
                    avatar.onDrawBefore(diff, this._scene);
                    // 绘制
                    // avatar.onDraw(diff, aG, this._scene);
                    if (this.scene3d.is2D) {
                        // 绘制底下部分
                        avatar.onDrawBottom(bG, this._scene);
                        // // 绘制头顶
                        var offsetY = avatar.headHeight + 20; // TODO 这里是否是让策划填好一点
                        // //绘制怒气
                        // offsetY = avatar.onDrawAnger(nG, this._scene, offsetY);
                        // // 绘制名字部分
                        // offsetY = avatar.onDrawName(nG, this._scene, offsetY);
                        // //绘制闲聊
                        // offsetY = avatar.onDrawGossip(gG,this._scene,offsetY);
                        // //绘制头顶标识
                        // avatar.onDrawMask(mG, this._scene, offsetY);
                    }
                    //绘制怒气
                    avatar.onDrawAnger(nG, this._scene, 0);
                    // 绘制名字部分
                    avatar.onDrawName(nG, this._scene, 0);
                }
                //清理残留Sprite
                // this.removeChildren(this.layerIndex);
            };
            /*深度比较排序*/
            AvatarDrawtor.prototype.worldObjectDeepCmp = function (a, b) {
                if (b.sortScore != a.sortScore) {
                    return b.sortScore - a.sortScore;
                }
                return b.oid - a.oid;
            };
            //清理
            AvatarDrawtor.prototype.clear = function () {
                for (var i = 0; i < this._avatars.length; i++) {
                    this._avatars[i].clear(true);
                }
                this._avatars.length = 0;
                this._inLookQueue.length = 0;
            };
            return AvatarDrawtor;
        }(Laya.Sprite));
        scene.AvatarDrawtor = AvatarDrawtor;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=AvatarDrawtor.js.map