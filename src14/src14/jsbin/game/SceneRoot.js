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
    var SceneRoot = /** @class */ (function (_super) {
        __extends(SceneRoot, _super);
        function SceneRoot(app) {
            var _this = _super.call(this) || this;
            //是否处于调试状态
            _this._isDebug = false;
            //地图id
            _this.mapid = 0;
            //资源已下载
            _this._resLoaded = false;
            //地图深度层数据
            _this._depthLayers = [];
            _this.hangup = 0; //1为挂机
            //组队移动
            /**队伍 成员信息*/
            _this.teamwalks = [];
            /**队伍移动坐标*/
            _this.teammoves = [];
            /**队伍成员id*/
            _this.teamroleid = [];
            /**避免重复任务谈话或者打断使用的进度*/
            _this.istask = 0;
            /**停止时候是否与NPC交流*/
            _this.isnpc = 0;
            /** 计数 */
            _this.countTimes = 0;
            //当前选中特效
            _this._curSelectOid = 0;
            _this._curSelectOidRedEffect = null; //不友好
            _this._curSelectOidGreenEffect = null; //友好
            _this._clickCellX = 0;
            _this._clickCellY = 0;
            //上一次等级
            _this._oldMainUnitLevel = 0;
            _this._mouseLock = false;
            _this._checkTelepoteTimeOut = 0;
            _this._sound_mainUnit_running = false;
            _this._oldSelectUnitFriendly = false;
            _this._flushSelectEffectCD = 0;
            _this._app = app;
            _this.camera = new Camera();
            _this.camera.follow(null);
            _this._thumLoader = new AssetsLoader();
            // 远景
            _this._farLayerSprite = new Sprite();
            //底层对象
            _this._bottomMapPartLayer = new game.scene.MapPartLayer(_this._app);
            _this._bottomMapPartLayer.mouseEnabled = true; //开启鼠标事件
            _this.mouseEnabled = true;
            // 近景
            _this._nearLayerSprite = new Sprite();
            //水层
            _this._waterLayers = new Array();
            _this._waterLayerSprite = new Sprite();
            _this._waterLayerSprite.mouseEnabled = false;
            //路障层
            _this._obsLayer = new MapObsLayer(_this._app);
            _this._obsLayer.mouseEnabled = false;
            //底层特效
            _this._bottomEffectLayer = new EffectLayer();
            _this._bottomEffectLayer.mouseEnabled = false;
            //底层骨骼动画特效
            _this._bottomSKEffectLayer = new EffectSKLayer();
            _this._bottomSKEffectLayer.mouseEnabled = false;
            _this._bottomSKEffectLayer.maxCount = 10;
            //顶层特效
            _this._topEffectLayer = new EffectLayer();
            _this._topEffectLayer.mouseEnabled = false;
            //顶层骨骼动画特效
            _this._topSKEffectLayer = new EffectSKLayer();
            _this._topSKEffectLayer.mouseEnabled = false;
            _this._topSKEffectLayer.maxCount = 20;
            //名字层
            _this._topNameLayer = new Sprite();
            _this._topNameLayer.mouseEnabled = false;
            //闲聊层
            _this._xianLiaoLayer = new Sprite();
            _this._xianLiaoLayer.mouseEnabled = false;
            //头顶标识层
            _this._headMaskLayer = new Sprite();
            _this._headMaskLayer.mouseEnabled = false;
            //avatar渲染器
            _this._avatarLayer = new AvatarDrawtor(_this, _this._bottomMapPartLayer.graphics, _this._topNameLayer.graphics, _this._headMaskLayer.graphics, _this._xianLiaoLayer.graphics);
            //添加到场景
            _this.addChild(_this._farLayerSprite);
            _this.addChild(_this._bottomMapPartLayer);
            _this.addChild(_this._waterLayerSprite);
            _this.addChild(_this._obsLayer);
            _this.addChild(_this._bottomEffectLayer);
            _this.addChild(_this._bottomSKEffectLayer);
            _this.addChild(_this._avatarLayer);
            _this.addChild(_this._topEffectLayer);
            _this.addChild(_this._topSKEffectLayer);
            _this.addChild(_this._topNameLayer);
            _this.addChild(_this._xianLiaoLayer);
            _this.addChild(_this._headMaskLayer);
            _this.addChild(_this._nearLayerSprite);
            _this.allwalk = [];
            //战斗信息渲染器
            _this._fightxtDrawtor = new FightxtDrawtor(_this._topNameLayer.graphics);
            //场景绘制素材素材
            var res = new AssetsLoader();
            res.load([game.Path.atlas_scene + "common.atlas", game.Path.atlas_scene + "mask.atlas", game.Path.atlas_scene + "sole.atlas"], Handler.create(_this, _this.onResComplete));
            /////////////// 事件监听 ///////////////////
            var objMgr = _this._app.sceneObjectMgr;
            objMgr.on(SceneObjectMgr.DELETE_OBJECT, _this, _this.onDeleteObject);
            objMgr.on(SceneObjectMgr.MAP_TELEPORT, _this, _this.onMapTelePort);
            return _this;
        }
        Object.defineProperty(SceneRoot.prototype, "avatarLayer", {
            get: function () {
                return this._avatarLayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneRoot.prototype, "safeArea", {
            set: function (v) {
                this._safeArea = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneRoot.prototype, "UnSafeArea", {
            set: function (v) {
                this._unSafeArea = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneRoot.prototype, "isDebug", {
            set: function (v) {
                this._isDebug = v;
                this._obsLayer.graphics.clear();
                this._obsLayer.visible = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneRoot.prototype, "app", {
            get: function () {
                return this._app;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneRoot.prototype, "mouseLock", {
            set: function (v) {
                this._mouseLock = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneRoot.prototype, "sceneFontSize", {
            //场景字码
            get: function () {
                // if(Laya.Browser.onPC)
                // 	return 16;
                return 16;
            },
            enumerable: true,
            configurable: true
        });
        SceneRoot.prototype.onload = function (walkani) {
            Laya.Animation.createFrames(this.anUrls("", 6), "walk");
            walkani.play(0, false, "walk");
            walkani.interval = 112;
        };
        SceneRoot.prototype.anUrls = function (aniName, length) {
            var urls = [];
            for (var index = 1; index <= length; index++) {
                urls.push("common/ui/dianji/" + aniName + index + ".png");
            }
            return urls;
        };
        //地图传送
        SceneRoot.prototype.onMapTelePort = function (newMapid) {
            logd("地图加载id:" + this.mapid + " -> " + newMapid);
            //清理对象
            if (this.mapid != 0) { //地图ID为0就不销毁
                this.clear();
            }
            this.mapid = newMapid;
            if (this.mapid <= 0) {
                return; //无效地图id
            }
            var objMgr = this._app.sceneObjectMgr;
            // 播放背景音乐
            this.playBackgroundMusic();
            var scene3d = this._avatarLayer.scene3d;
            scene3d.reset();
            var temp = Template.getMapTempById(this.mapid);
            // if(temp.is3d){
            // 	scene3d.cameraMode = PanScene.MODE_3D;
            // 	scene3d.camera2d = null;
            // 	pan3d.scene.SceneRes.getMapUrlFun = getMapUrl;
            // 	// TODO 正确得地图id 以及回调处理
            // 	scene3d.loadScene(this.mapid+"", ()=>{}, ()=>{}, ()=>{
            // 		scene3d.camDistance = 250;
            // 		scene3d.focus3D.rotationX = -45;
            // 		objMgr.sceneStoryMgr.onCompleteScene3D();
            // 	});
            // 	return;
            // }
            // else{
            scene3d.cameraMode = PanScene.MODE_2D;
            scene3d.camera2d = this.camera;
            scene3d.camDistance = 250;
            scene3d.focus3D.rotationX = -45;
            objMgr.sceneStoryMgr.onCompleteScene3D();
            // }
            //缩略图
            var imgId = objMgr.mapAssetInfo.imgId > 0 ? objMgr.mapAssetInfo.imgId : this.mapid;
            this._thumURL = game.Path.scene_maps + imgId.toFixed(0) + "/" + imgId.toFixed(0) + "_small.jpg";
            this._thumLoader.load([this._thumURL], Handler.create(this, this.onThumComplete));
            // //天气系统
            // //新手村特殊处理 飘花
            // if (this.mapid == MapInfo.MAP_XINSHOUCUN) {
            // 	this._weatherLayer = new game.scene.WeatherFlower(this._app);
            // }
            // else {
            // 	switch (objMgr.mapAssetInfo.weatherType) {
            // 		case 1://雨
            // 			this._weatherLayer = new game.scene.WeatherRain(this._app);
            // 			// this._weatherLayer = new game.scene.WeatherClouds();
            // 			// this._lightLayer = new game.scene.LightCandle(this._app);
            // 			// this._weatherLayer = new game.scene.WeatherSandstorms();
            // 			// this._weatherLayer = new game.scene.WeatherSnow();
            // 			// this._weatherLayer = new game.scene.WeatherBeetle();
            // 			break;
            // 		case 2://雪
            // 			this._weatherLayer = new game.scene.WeatherSnow(this._app);
            // 			break;
            // 		case 3://沙暴
            // 			this._weatherLayer = new game.scene.WeatherSandstorms(this._app);
            // 			break;
            // 		case 4://萤火虫
            // 			this._weatherLayer = new game.scene.WeatherBeetle(this._app);
            // 			break;
            // 		case 5://蜡烛
            // 			// this._lightLayer = new game.scene.LightCandle();
            // 			this._weatherLayer = new game.scene.WeatherClouds(this._app);
            // 			break;
            // 		case 6://云
            // 			this._weatherLayer = new game.scene.WeatherClouds(this._app);
            // 			break;
            // 		default:
            // 			break;
            // 	}
            // }
        };
        /**播放背景音乐 */
        SceneRoot.prototype.playBackgroundMusic = function () {
            var flag = game.modules.setBasics.models.SetBasicsModel.getInstance().isCloseMusic;
            if (flag) {
                return;
            }
            var objMgr = this._app.sceneObjectMgr;
            if (!objMgr.mapAssetInfo)
                return;
            //背景音效
            this._backgroundMusic = objMgr.mapAssetInfo.sound;
            if (this._backgroundMusic && this._backgroundMusic.length)
                this._app.playMusic("sounds/scene/" + this._backgroundMusic, 0);
        };
        /** 播放场景音乐 */
        SceneRoot.prototype.playSceneMusic = function () {
            var objMgr = this._app.sceneObjectMgr;
            if (!objMgr.mapAssetInfo)
                return;
            //场景音乐
            this._backgroundMusic = objMgr.mapAssetInfo.sound;
            if (this._backgroundMusic && this._backgroundMusic.length)
                Laya.SoundManager.playMusic("sounds/scene/" + this._backgroundMusic, 0);
        };
        /** 关闭场景音乐 */
        SceneRoot.prototype.stopSceneMusic = function () {
            var objMgr = this._app.sceneObjectMgr;
            if (!objMgr.mapAssetInfo)
                return;
            //场景音乐
            this._backgroundMusic = objMgr.mapAssetInfo.sound;
            if (this._backgroundMusic && this._backgroundMusic.length)
                Laya.SoundManager.stopMusic();
        };
        /** 播放场景音效 */
        SceneRoot.prototype.playSceneSound = function () {
            //写死一个音效路径用于测试
            // let soundUrl = "sounds/skill/feilongzaitian.ogg";
            // Laya.SoundManager.destroySound(soundUrl);
            // Laya.SoundManager.playSound(soundUrl, 1);
        };
        //缩略图完成事件
        SceneRoot.prototype.onThumComplete = function () {
            //获得缩略图
            this._thum = Laya.loader.getRes(this._thumURL);
            //初始化
            var objMgr = this._app.sceneObjectMgr;
            var mapAsset = objMgr.mapAssetInfo;
            //摄像机尺寸
            this.camera.setMapSize(mapAsset.pxWidth, mapAsset.pxHeight);
            //底层地图层初始化
            var imgId = mapAsset.imgId > 0 ? mapAsset.imgId : this.mapid;
            var mapFolder = game.Path.scene_maps + imgId.toString() + "/";
            this._bottomMapPartLayer.initMapPartLayer(0, 0, mapAsset.pxWidth, mapAsset.pxHeight, mapFolder + imgId.toString() + "_{0}_{1}.jpg", this._thum);
            // 深度层初始化
            var len = mapAsset.farLayers.length;
            // 扩充大小并清理多余
            this._depthLayers.length = len;
            for (var i = 0; i < len; i++) {
                var farData = mapAsset.farLayers[i];
                var pic = mapFolder + farData.name + "/{0}_{1}.jpg";
                var layer = this._depthLayers[i];
                if (!layer) {
                    layer = new MapPartLayer(this._app);
                    this._depthLayers[i] = layer;
                }
                // 景深层不需要缩略图
                // layer.initMapPartLayer(farData.x, farData.y, farData.width, farData.height, pic, null);
                var _parent = farData.depth > 0 ? this._farLayerSprite : this._nearLayerSprite;
                _parent.addChild(layer);
            }
            //障碍层初始化
            this._obsLayer.initObsLayer(objMgr.mapAssetInfo.pxWidth, objMgr.mapAssetInfo.pxHeight);
            //传送音效
            this._app.playSound("sounds/s_teleport.mp3");
            if (this.app.sceneObjectMgr.mapInfo.inBattle) {
                this._app.stopSound("sounds/s_run.mp3");
            }
        };
        /**显隐战斗黑底*/
        SceneRoot.prototype.showBack = function (isShow) {
            if (isShow) {
                if (!this._imgBlack) {
                    this._imgBlack = new LImage("common/ui/tongyong/touming.png");
                    this._imgBlack.size(this.camera.width, this.camera.height);
                    this._imgBlack.alpha = 0.7;
                    this._avatarLayer.addChildAt(this._imgBlack, 0);
                }
                else
                    this._imgBlack.visible = true;
                //this.resizeBack();
            }
            else {
                if (this._imgBlack)
                    this._imgBlack.visible = false;
            }
        };
        //调整战斗黑底缩放
        SceneRoot.prototype.resizeBack = function () {
            if (!this._imgBlack || !this._imgBlack.visible)
                return;
            this._imgBlack.size(this.camera.width, this.camera.height);
            // let scale:number = this._app.clientScale/this._app.sceneCurScale;
            // this._imgBlack.scale(scale, scale);
            // this._imgBlack.pos((this.camera.width-this._imgBlack.width*scale)/2, (this.camera.height-this._imgBlack.height*scale)/2);
        };
        //更新透明度
        SceneRoot.prototype.updateAlpha = function (target, alpha) {
            if (!target)
                return;
            var avatar = this._avatarLayer.FindAvatar(target);
            if (!avatar)
                return;
            target.isBuffAlpha = true;
            avatar.char3d.alpha = alpha;
        };
        SceneRoot.prototype.checkTelepoteShow = function (diff) {
            if (this.mapid <= 0)
                return;
            this._checkTelepoteTimeOut -= diff;
            if (this._checkTelepoteTimeOut > 0)
                return;
            this._checkTelepoteTimeOut = 1000;
            var teleDatas = game.data.MapTeleportIndex.inst.getTeleportsByMapid(this.mapid);
            if (teleDatas) {
                var len = teleDatas.length;
                var v = new Vector2(0, 0);
                if (!this._teleportEffects)
                    this._teleportEffects = new Array(len);
                for (var i = 0; i < len; i++) {
                    var tele = teleDatas[i];
                    if (!tele)
                        continue;
                    v.x = tele.srcPortX;
                    v.y = tele.srcPortY;
                    if (this.camera.lookIn(v)) {
                        if (this._teleportEffects[i])
                            continue;
                        var effect = ObjectPools.malloc(EffectAvatar);
                        effect.setData("0000new_jm1010");
                        effect.anchorPostion = new Vector2(tele.srcPortX, tele.srcPortY);
                        effect.toward = Direct.UP;
                        effect.setLoop(true);
                        effect.atBottom = true;
                        this.addEffect(effect);
                        this._teleportEffects[i] = effect;
                    }
                    else {
                        if (this._teleportEffects[i]) {
                            this.removeEffect(this._teleportEffects[i]);
                            this._teleportEffects[i] = null;
                        }
                    }
                }
            }
        };
        //更新传送点显示
        SceneRoot.prototype.updateTelepoteShow = function () {
            this.clearTeleportEffects();
            if (this.mapid > 0) {
                var teleDatas = game.data.MapTeleportIndex.inst.getTeleportsByMapid(this.mapid);
                if (teleDatas) {
                    var len = teleDatas.length;
                    if (!this._teleportEffects) {
                        this._teleportEffects = new Array();
                    }
                    for (var i = 0; i < len; i++) {
                        var tele = teleDatas[i];
                        if (!tele)
                            continue;
                        var effect = ObjectPools.malloc(EffectAvatar);
                        effect.setData("0000new_jm1010");
                        effect.anchorPostion = new Vector2(tele.srcPortX, tele.srcPortY);
                        effect.toward = Direct.UP;
                        effect.setLoop(true);
                        effect.atBottom = true;
                        this.addEffect(effect);
                        this._teleportEffects.push(effect);
                        // logd("传送点",tele.srcPortX,tele.srcPortY);
                    }
                }
            }
        };
        SceneRoot.prototype.clearTeleportEffects = function () {
            // logd("clearTeleportEffects");
            if (this._teleportEffects) {
                var len = this._teleportEffects.length;
                for (var i = 0; i < len; i++) {
                    var effect = this._teleportEffects[i];
                    if (!effect)
                        continue;
                    this.removeEffect(effect);
                    this._teleportEffects[i] = null;
                }
                this._teleportEffects = null;
            }
        };
        // 等待传送
        SceneRoot.prototype.waitTeleteport = function (clear) {
            this._app.sceneRoot.camera.follow(null);
            if (clear) {
                // this.clear();
                // 立即清理下素材 
                AvatarItem.update(-1);
                RefAsset.update(-1);
            }
            logd("SceneRoot.waitTeleteport");
        };
        //对象移除
        SceneRoot.prototype.onDeleteObject = function (obj) {
            var avatarObj;
            if (obj instanceof Unit) {
                avatarObj = obj;
                avatarObj && this._avatarLayer.outLook(avatarObj, false);
            }
        };
        //对象释放技能
        SceneRoot.prototype.onSpellCast = function (caster, spellId, isTrajectory, target) {
            if (isTrajectory === void 0) { isTrajectory = false; }
            if (target === void 0) { target = null; }
            if (!caster || !spellId)
                return;
            var avatar = this._avatarLayer.FindAvatar(caster);
            if (!avatar)
                return;
            var temp = Template.getSkillsTempById(spellId);
            if (!temp || !temp.icon || !temp.skin)
                return;
            if (!isTrajectory) {
                avatar.playSkill(temp.icon, temp.skin, target);
            }
            else {
                if (!target)
                    return;
                var avatar1 = this._avatarLayer.FindAvatar(target);
                if (!avatar1)
                    return;
                avatar.playTrajectory(avatar1.char3d, temp.icon, temp.skin);
            }
        };
        //显示图集特效
        SceneRoot.prototype.showFrameEffect = function (target, name, info, x, y, z) {
            if (info === void 0) { info = []; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            //console.log("--------------avatar播特效111");
            if (!target)
                return;
            var avatar = this._avatarLayer.FindAvatar(target);
            //console.log("--------------avatar播特效222");
            if (!avatar)
                return;
            //console.log("--------------avatar播特效 333", avatar.char3d.charName);
            avatar.showFrameEffect(name, info, x, y, z);
        };
        //显示特效
        SceneRoot.prototype.showEffect = function (target, name, x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (!target)
                return;
            var avatar = this._avatarLayer.FindAvatar(target);
            if (!avatar)
                return;
            avatar.showEffect(name, x, y, z);
        };
        // 清理图集特效
        SceneRoot.prototype.clearFrameEffect = function (target, name) {
            if (!target)
                return;
            var avatar = this._avatarLayer.FindAvatar(target);
            if (!avatar)
                return;
            avatar.clearFrameEffect(name);
        };
        // 清理玩家的所有特效用于死亡，清理战场等
        SceneRoot.prototype.clearAllFeameEffect = function (target) {
            if (!target)
                return;
            var avatar = this._avatarLayer.FindAvatar(target);
            if (!avatar)
                return;
            avatar.clearAllFrameEffect();
        };
        //清理特效
        SceneRoot.prototype.clearEffect = function (target, name) {
            if (!target)
                return;
            var avatar = this._avatarLayer.FindAvatar(target);
            if (!avatar)
                return;
            avatar.clearEffect(name);
        };
        // 创建战斗飘字信息
        SceneRoot.prototype.createdFightxt = function (target, type, data, isbottom, index) {
            if (isbottom === void 0) { isbottom = false; }
            if (index === void 0) { index = 1; }
            if (!target)
                return;
            var avatar = this._avatarLayer.FindAvatar(target);
            if (!avatar)
                return;
            var isSelf = this._app.sceneObjectMgr.mainUnit == target || (target instanceof FakeUnit && target.isSelfRole);
            var tx = (avatar.pos.x - this.camera.logicLeft) * SceneRes.CELL_WIDTH * this.scaleX;
            var ty = (avatar.pos.y - this.camera.logicTop) * SceneRes.CELL_HEIGHT * this.scaleY;
            data.x = tx;
            data.y = ty;
            avatar.onDrawFightxt(this, type, data, isbottom);
        };
        // 创建战斗喊字(任意文字+底图)
        SceneRoot.prototype.createFightPicTxt = function (target, txt, picUrl) {
            if (picUrl === void 0) { picUrl = "ui/arpgui/skillname_bottom.png"; }
            if (!target)
                return;
            var avatar = this._avatarLayer.FindAvatar(target);
            if (!avatar)
                return;
            var isSelf = this._app.sceneObjectMgr.mainUnit == target || (target instanceof FakeUnit && target.isSelfRole);
            var tx = (avatar.pos.x - this.camera.logicLeft) * SceneRes.CELL_WIDTH * this.scaleX;
            var ty = (avatar.pos.y - this.camera.logicTop) * SceneRes.CELL_HEIGHT * this.scaleY;
            var scene3d = this.avatarLayer.scene3d;
            var vo = scene3d.layaForntPanel.drawDynamicTextDemo(txt, picUrl);
            vo.pos.x = tx - 65;
            vo.pos.y = ty - 190;
            vo.alpha = 1;
        };
        // 击飞
        SceneRoot.prototype.beatBackFly = function (target, index) {
            if (!target)
                return;
            var avatar = this._avatarLayer.FindAvatar(target);
            if (!avatar)
                return;
            avatar.beatBackFly(index);
        };
        // 受击移动
        SceneRoot.prototype.onBeatMove = function (target, index) {
            if (!target)
                return;
            var avatar = this._avatarLayer.FindAvatar(target);
            if (!avatar)
                return;
            avatar.beatBack(index);
        };
        SceneRoot.prototype.testMainCharEvet = function (target) {
            if (!target)
                return;
            var avatar = this._avatarLayer.FindAvatar(target);
            if (!avatar)
                return;
            // var info: any = {}
            // info.loop = true//是否循环;
            // info.isbuff =  true;
            // info.isShow = true;
            //avatar.showFrameEffect("40103", info);
            //avatar.battleAction(AvatarData.STATE_BEATEN);
            //avatar.showFrameEffect("30120", info);
            // //			 target.buffAlpha = 188 / 255;
            // 				//this.updateAlpha(target,0);
            // 			let scene3d: PanScene = this.avatarLayer.scene3d;
            // 			 let tx = (avatar.pos.x - this.camera.logicLeft) * SceneRes.CELL_WIDTH * this.scaleX;
            // 			 let ty = (avatar.pos.y - this.camera.logicTop) * SceneRes.CELL_HEIGHT * this.scaleY;
            // 			// 数字 
            // 		    var e: topfront.BaseFrontVo = scene3d.layaForntPanel.drawLabel(1, { color: "red", num: 489 }, false);
            //             e.x =tx-e.width/2;
            //             e.y = ty - 160;
            //             e.alpha = 1;
            //             e.timeLen = 1000 //1秒后会自己动清理  //默认为10秒会清理
            //             e.fun = (taget: topfront.BaseFrontVo, t: number) => { //每个对象的帧回调， 有对象和T时间值
            //                 //t=>[0->1]
            //                 taget.y--
            // 				//taget.x+=0.2
            //                // taget.alpha =1-t;
            //                // taget.scale = 1 + t;
            //             }
            // 底图 + 字
            // var b: topfront.BaseFrontVo = scene3d.layaForntPanel.drawLabel(2, "wenzibeijing", true);
            // b.x = tx-b.width/2;
            // b.y = ty;
            // var data:any = {};
            // data.color="red";
            // data.num = 246;
            // var e: topfront.BaseFrontVo = scene3d.layaForntPanel.drawLabel(1, data, false);
            // e.x =  b.x + 30;
            // e.y = b.y;
            // e.alpha = 1;
            // e.timeLen = 2000 //1秒后会自己动清理  //默认为10秒会清理
            // e.fun = (taget: topfront.BaseFrontVo, t: number) => { //每个对象的帧回调， 有对象和T时间值
            //     //t=>[0->1]
            //     taget.y--
            //     taget.x--
            //       taget.alpha =1-t;
            // }
            // b.timeLen = 2000 //1秒后会自己动清理  //默认为10秒会清理
            // b.fun = (taget: topfront.BaseFrontVo, t: number) => { //每个对象的帧回调， 有对象和T时间值
            //     //t=>[0->1]
            //     taget.y--
            //     taget.x--
            //     taget.alpha =1-t;
            // }
            // //文字
            // var b: topfront.BaseFrontVo = scene3d.layaForntPanel.drawLabel(2, "lianji", true);
            // b.x = tx-b.width/2;
            // b.y = ty;
            // b.timeLen = 2000
            // b.scale = 0.6
            // b.fun = (taget: topfront.BaseFrontVo, t: number) => { //每个对象的帧回调， 有对象和T时间值
            //     //t=>[0->1]
            //     taget.y--
            //     taget.alpha =1-t;
            // }
        };
        // 执行模拟移动
        SceneRoot.prototype.doImitateMove = function (target, x, y, type, totalTime, delay) {
            if (delay === void 0) { delay = 0; }
            if (!target)
                return;
            target.SetPos(x, y);
            var avatar = this._avatarLayer.FindAvatar(target);
            if (!avatar)
                return;
            avatar.doImitateMove(x, y, type, totalTime, delay);
        };
        /**
         * 战斗场景动作
         * @param atnStus 动作枚举
         * @param completeState 动作完成状态:0 循环,1 最后一幀,2 默认动作
         */
        SceneRoot.prototype.battleAction = function (target, atnStus, func, completeState) {
            if (completeState === void 0) { completeState = 2; }
            //console.log("-----------------battleAction 111");
            if (!target)
                return;
            //console.log("-----------------battleAction 222");
            var avatar = this._avatarLayer.FindAvatar(target);
            if (!avatar)
                return;
            //console.log("-----------------battleAction end", target.name, atnStus, completeState);
            avatar.battleAction(atnStus, completeState, function () {
                //console.log("-------------- callback battleaction", target.name, atnStus, completeState);
                if (func)
                    func();
            });
        };
        //素材
        SceneRoot.prototype.onResComplete = function () {
            this._resLoaded = true;
            this._avatarLayer.onResComplete();
            this._fightxtDrawtor.onResComplete();
        };
        //设置窗口大小
        SceneRoot.prototype.resize = function (clientWidth, clientHeight) {
            this.camera.setSize(clientWidth, clientHeight);
            //底图层需要设置下宽高 才能接受鼠标事件
            if (this._bottomMapPartLayer) {
                this._bottomMapPartLayer.width = clientWidth;
                this._bottomMapPartLayer.height = clientHeight;
            }
            this.resizeBack();
            if (this._avatarLayer) {
            }
        };
        //点击场景
        SceneRoot.prototype.onSceneTouch = function (e) {
            console.log("场景被点击了:", e.target, e.currentTarget);
            if (e.target != this._bottomMapPartLayer || !this._thum || !this.onTouch)
                return false;
            if (this.istask == 2) {
                this.istask = 0;
                game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.INTERRUPT);
            }
            this.isnpc = 0; //确定人物停下的时候是否与NPC交谈
            this._app.sceneObjectMgr.mainUnit.xunluo = 0;
            this._app.sceneObjectMgr.mainUnit.stopwalk = 1;
            this._app.sceneObjectMgr.mainUnit.autowalk = 0;
            game.modules.mainhud.models.HudModel.getInstance().taskxl = 0;
            AutoHangUpModels.getInstance().autotask = 0; //离开自动任务状态
            AutoHangUpModels.getInstance().notaketimer = 0; //重新计时
            AutoHangUpModels.getInstance().istaskwalk = 0; //自动任务的类型 0为主线
            // this._app.sceneObjectMgr.mainUnit.SetMoveStatus(1)
            if (this.hangup != 0) {
                LocalStorage.setJSON(LoginModel.getInstance().roleDetail.roleid + "_HandUp", false);
                this.hangup = 0; //是否挂机 1为处于挂机状态， 0 为离开挂机状态
            }
            game.modules.mainhud.models.HudModel.getInstance().autobatt.stop();
            var mx = e.stageX;
            var my = e.stageY;
            var px = this.camera.bufferLeft + mx / this.scaleX;
            var py = this.camera.bufferTop + my / this.scaleY;
            var cellx = px / SceneRes.CELL_WIDTH;
            var celly = py / SceneRes.CELL_HEIGHT;
            var hit3DPos = new Pan3d.Vector3D();
            hit3DPos.y = 0;
            hit3DPos.x = (mx) / (PanEngine.htmlScale * 4) * this.scaleX;
            hit3DPos.z = (-my) / (PanEngine.htmlScale * 4) * this.scaleY / (Math.sin(45 * Math.PI / 180));
            var hitedAvatar = this._avatarLayer.hitTest(mx / this.scaleX, my / this.scaleY, hit3DPos);
            var hitObject = null;
            this._clickCellX = 0;
            this._clickCellY = 0;
            if (hitedAvatar instanceof AvatarUnit) {
                hitObject = hitedAvatar.unit;
            }
            else {
                this._clickCellX = cellx;
                this._clickCellY = celly;
            }
            logd("点击", cellx, celly, this._app.sceneObjectMgr.mainUnit.pos.x, this._app.sceneObjectMgr.mainUnit.pos.y);
            console.log(this._app.sceneObjectMgr.mainUnit);
            this.testMainCharEvet(this._app.sceneObjectMgr.mainUnit);
            //搜寻当前地图NPC，若目标点在NPC范围之内则移动到NPC附近的某一个点进行NPC对话	
            var playrole;
            var team;
            var pos = new Vector2();
            if (!this.app.sceneObjectMgr.mapInfo.inBattle) {
                var npcpos = new Vector2();
                npcpos.x = cellx;
                npcpos.y = celly;
                var npcid = void 0;
                var npckey = void 0;
                var curnpcpos = new Vector2();
                for (var key in game.scene.models.SceneModel.getInstance().npclist.keys) { //优先判断点击的位置是否是NPC，若是直接对话无须进行下一步的操作
                    var npc = game.scene.models.SceneModel.getInstance().npclist.get(game.scene.models.SceneModel.getInstance().npclist.keys[key]);
                    if (npc.pos.dist(npcpos) < 2 || (Math.abs(npc.pos.x - npcpos.x) <= 2 && npc.pos.y >= npcpos.y && Math.abs(npc.pos.y - npcpos.y) <= 9 && npc.pos.dist(npcpos) <= 14)) {
                        console.log("点击npc");
                        this.isnpc = 1;
                        npcid = npc.id;
                        npckey = npc.npckey;
                        cellx = npc.pos.x;
                        celly = npc.pos.y;
                        curnpcpos = npc.pos;
                        break;
                    }
                }
                var isrole = 0;
                var role = void 0;
                game.scene.models.SceneProxy.getInstance().event(game.scene.models.ROLE_SELECT, ["", 0]);
                for (var key in game.scene.models.SceneModel.getInstance().rolelist.keys) { //判断是否有角色
                    role = game.scene.models.SceneModel.getInstance().rolelist.get(game.scene.models.SceneModel.getInstance().rolelist.keys[key]);
                    if ((role.pos.dist(npcpos) < 2 || (Math.abs(role.pos.x - npcpos.x) <= 2 && role.pos.y >= npcpos.y && Math.abs(role.pos.y - npcpos.y) <= 9 && role.pos.dist(npcpos) <= 14)) && role.rolebasicOctets.roleid != game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid) {
                        game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.ROLE, [role.rolebasicOctets.shape, role.rolebasicOctets.roleid]);
                        isrole = 1;
                        break;
                    }
                }
                if (isrole == 1 && this.isnpc == 1) { //若同时有NPC与角色 则以NPC为先
                    isrole = 0;
                }
                //角色特效
                if (isrole == 0) {
                    game.modules.mainhud.models.HudProxy.getInstance().event(game.modules.mainhud.models.ROLE, [-1]);
                }
                else {
                    game.scene.models.SceneProxy.getInstance().event(game.scene.models.ROLE_SELECT, [role.rolebasicOctets.roleid, 1]);
                }
                console.log("位置", this._app.sceneObjectMgr.mainUnit.pos.x, this._app.sceneObjectMgr.mainUnit.pos.y);
                pos.x = cellx;
                pos.y = celly;
                if (this.isnpc == 0 && isrole == 0) {
                    var currentani = new Laya.Animation();
                    this.onload(currentani); //加载效果
                    this._bottomMapPartLayer.addChild(currentani);
                    this.allwalk.push(currentani); //场景点击特效
                    currentani.x = e.target.mouseX - 46;
                    currentani.y = e.target.mouseY - 28.5;
                    game.scene.models.SceneProxy.getInstance().off(game.scene.models.MOVE_STOP, this, this.movestop);
                }
                game.scene.models.SceneProxy.getInstance().event(game.scene.models.NPC_SELECT, ["", 0]);
                //NPC特效
                if (this.isnpc == 1) {
                    game.scene.models.SceneProxy.getInstance().event(game.scene.models.NPC_SELECT, [npckey, 1]);
                    if (this._app.sceneObjectMgr.mainUnit.pos.dist(pos) <= 10) {
                        //若当前的坐标与目的NPC坐标相差范围之内，直接发送对话协议	
                        this._app.sceneObjectMgr.mainUnit.SetMoveStatus(0);
                        RequesterProtocols._instance.c2s_visit_npc(npckey);
                        game.scene.models.SceneProxy.getInstance().once(game.scene.models.NPC_DIALOG, this, this.initnpc);
                        game.scene.models.SceneProxy.getInstance().off(game.scene.models.MOVE_STOP, this, this.movestop);
                    }
                    else {
                        game.scene.models.SceneProxy.getInstance().once(game.scene.models.MOVE_STOP, this, this.movestop, [npcid, npckey]);
                    }
                    return;
                }
                //判断是否有队伍		
                playrole = game.scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
                team = playrole.rolebasicOctets.datas.get(2);
                if (team) {
                    if ((team.teamindexstate >> 4) != 1 && (team.teamindexstate - ((team.teamindexstate >> 4) << 4)) == 1) {
                        this._app.sceneObjectMgr.mainUnit.SetMoveStatus(0);
                        return false;
                    }
                }
                console.log("位置", pos.x, pos.y);
            }
            this.onTouch(cellx, celly, hitObject);
            this._app.sceneObjectMgr.mainUnit.goto(Math.floor(cellx), Math.floor(celly));
            var kuileiarr = [zhiye.xuanming, zhiye.tianlei];
            /** 判断是都是傀儡的职业跟着移动 */
            var _school = LoginModel.getInstance().roleDetail.school;
            if (kuileiarr.indexOf(_school) != -1 && this._app.sceneObjectMgr.kuileiUnit)
                this._app.sceneObjectMgr.kuileiUnit.goto(Math.floor(cellx) - 1, Math.floor(celly) - 1);
            if (team) { //有队伍，则队员跟着一起走
                this.teamwalks = [];
                this.teammoves = [];
                for (var k in game.scene.models.SceneModel.getInstance().rolelist.keys) {
                    var menber = game.scene.models.SceneModel.getInstance().rolelist.get(game.scene.models.SceneModel.getInstance().rolelist.keys[k]);
                    var menberteam = menber.rolebasicOctets.datas.get(2);
                    if (menberteam) { //有队伍，检测是不是同一个队伍的，是则一起走
                        if (menberteam.teamid == team.teamid && menber.rolebasicOctets.roleid != playrole.rolebasicOctets.roleid && (team.teamindexstate - ((team.teamindexstate >> 4) << 4)) == 1 && (menberteam.teamindexstate & 1) == 1) {
                            this.teamwalks.push(menber.rolebasicOctets.rolename);
                            this.teammoves.push(pos);
                            this.teamroleid.push(menber.rolebasicOctets.roleid);
                            // game.scene.models.SceneProxy.getInstance().event(game.scene.models.TEAM_MOVE,[menber.rolebasicOctets.rolename,pos]);
                        }
                    }
                }
            }
            // RequesterProtocols._instance.c2s_role_move(this._app.sceneObjectMgr.mainUnit.pos,pos,game.modules.mainhud.models.HudModel.getInstance().movesceneid);
            this.isnpc = 3; //非场景也非NPC			
            Laya.timer.once(100, this, this.teamwalk, [this.teamwalks[0], this.teammoves[0], 0, this.teamroleid[0]], false);
            logd("-----------onSceneTouch:", e.stageX, e.stageY, this.camera.bufferLeft, this.camera.bufferTop, cellx, celly, this.scaleX, this.scaleY);
            return true;
        };
        //点击场景
        SceneRoot.prototype.onSceneLongTouch = function (e) {
            var mx = e.stageX;
            var my = e.stageY;
            var hit3DPos = new Pan3d.Vector3D();
            hit3DPos.y = 0;
            hit3DPos.x = (mx) / (PanEngine.htmlScale * 4) * this.scaleX;
            hit3DPos.z = (-my) / (PanEngine.htmlScale * 4) * this.scaleY / (Math.sin(45 * Math.PI / 180));
            var hitedAvatar = this._avatarLayer.hitTest(mx / this.scaleX, my / this.scaleY, hit3DPos);
            var hitObject = null;
            if (hitedAvatar instanceof AvatarUnit) {
                hitObject = hitedAvatar.unit;
            }
            this.onLongTouch(hitObject);
        };
        /**队伍其他角色延迟移动 自己是队长时*/
        SceneRoot.prototype.teamwalk = function (rolename, pos, count, roleid) {
            if (count >= this.teamwalks.length) {
                this.teamwalks = [];
                this.teammoves = [];
                this.teamroleid = [];
                return;
            }
            game.scene.models.SceneProxy.getInstance().event(game.scene.models.TEAM_MOVE, [this.teamwalks[count], this.teammoves[count], this.teamroleid[count]]);
            count++;
            Laya.timer.once(300, this, this.teamwalk, [this.teamwalks[count], this.teammoves[count], count, this.teamroleid[count]], false);
        };
        /**NPC对话处理，是否同一个NPC上存在两个自动完成的任务，是否存在剧情或者门派任务*/
        SceneRoot.prototype.initnpc = function (npckey, services, scenarioquests) {
            var npc = game.scene.models.SceneModel.getInstance().npclist.get(npckey);
            var npcinfo = game.modules.mainhud.models.HudModel.getInstance().cNPCConfigData[npc.id];
            //若存在的服务与主线有两个是自动的则跳到NPC对话进行处理
            var autotask = 0; //为0则服务当中不存在自动完成的任务
            var servicesid = 0;
            for (var index = 0; index < services.length; index++) {
                var servicesinfo = game.modules.mainhud.models.HudModel.getInstance().cnpcServerConfigData[services[index]];
                if (servicesinfo.nautocommit == 1 || (services[index] >= 3000 && services[index] <= 3005)) { //自动完成
                    autotask += 1;
                    servicesid = index;
                }
            }
            // if(scenarioquests.length!=0 && scenarioquests[0]<190000 && scenarioquests[0]>180000 && autotask==0){//剧情,且只有一个自动完成
            if (scenarioquests.length != 0 && services.length == 0 && autotask == 0) { //剧情,且只有一个自动完成
                var maininfo = Taskmodels.getInstance().missionCMainMissionInfoData[scenarioquests[0]];
                if (maininfo.MissionType == 40 || maininfo.MissionType == 12) {
                    this.npcui = new game.modules.commonUI.NpcDialogMediator(this._app);
                    this.npcui.init(npckey, services, scenarioquests, null, null, null, maininfo.BattlePreString);
                }
                else {
                    this.dialog = new game.modules.commonUI.JuQingMediator(this._app);
                    this.dialog.init(scenarioquests[0], npckey);
                }
            }
            else if (autotask == 1 && services[servicesid] == 3014) { //只有一个自动的话
                this.npcui = new game.modules.commonUI.NpcDialogMediator(this._app);
                this.npcui.init(npckey, services, scenarioquests, "submititem", null, servicesid + scenarioquests.length);
            }
            else if (services[servicesid] == 100035 && autotask == 1) {
                var taskinfo = game.modules.task.models.TaskModel.getInstance().renwuid.get(npc.id);
                var task = game.modules.task.models.TaskModel.getInstance().cRepeatTaskData[taskinfo.questtype];
                var talkinfo = game.modules.task.models.TaskModel.getInstance().cRepeatTaskChatData[task.nnpcchatid];
                this.npcui = new game.modules.commonUI.NpcDialogMediator(this._app);
                this.npcui.init(npckey, services, scenarioquests, talkinfo.strmsg, null, servicesid + scenarioquests.length);
            }
            else if (npcinfo.npctype == 29) { //宝箱
                this.baoxiang = new game.modules.commonUI.XinYunZhuanPanMediator(this._app);
                this.baoxiang.show();
            }
            else { //要判断这个NPC上有没有可以自动完成的任务
                var taskinfo = game.modules.task.models.TaskModel.getInstance().renwuid.get(npc.id);
                if (taskinfo) {
                    var task = game.modules.task.models.TaskModel.getInstance().cRepeatTaskData[taskinfo.questtype];
                    if (task.etasktype == 1) { //送信聊天
                        //循环任务对话配置表
                        var curnum = void 0;
                        for (var index = 0; index < services.length; index++) {
                            if (services[index] == 100035 || services[index] == 100183) { //自动完成
                                curnum = index;
                                break;
                            }
                        }
                        var talkinfo = game.modules.task.models.TaskModel.getInstance().cRepeatTaskChatData[task.nnpcchatid];
                        this.npcui = new game.modules.commonUI.NpcDialogMediator(this._app);
                        this.npcui.init(npckey, services, scenarioquests, talkinfo.strmsg, null, curnum + scenarioquests.length);
                    }
                    else if (task.etasktype == 5) { //寻找宠物	任务结束后对话类型8
                        var curnum = void 0;
                        game.modules.task.models.TaskModel.getInstance().chattype = 8;
                        this.npcui = new game.modules.commonUI.NpcDialogMediator(this._app);
                        this.npcui.init(npckey, services, scenarioquests, "petshop", taskinfo.dstitemid, 0 + scenarioquests.length);
                    }
                    else if (task.etasktype == 4) { //寻找药品
                        this.npcui = new game.modules.commonUI.NpcDialogMediator(this._app);
                        this.npcui.init(npckey, services, scenarioquests, "yaopin", taskinfo.dstitemid, 0 + scenarioquests.length);
                    }
                    else if (task.etasktype == 7 || task.etasktype == 9) { //切磋
                        this.npcui = new game.modules.commonUI.NpcDialogMediator(this._app);
                        this.npcui.init(npckey, services, scenarioquests);
                    }
                }
                else {
                    this.npcui = new game.modules.commonUI.NpcDialogMediator(this._app);
                    this.npcui.init(npckey, services, scenarioquests);
                }
            }
        };
        /**人物移动停止*/
        SceneRoot.prototype.movestop = function (npcid, npckey) {
            RequesterProtocols._instance.c2s_visit_npc(npckey);
            game.scene.models.SceneProxy.getInstance().once(game.scene.models.NPC_DIALOG, this, this.initnpc);
            console.log("-------------------move 2");
            RequesterProtocols._instance.c2s_role_move(this._app.sceneObjectMgr.mainUnit.target, this._app.sceneObjectMgr.mainUnit.target, game.modules.mainhud.models.HudModel.getInstance().movesceneid);
        };
        //移动场景
        SceneRoot.prototype.onSceneMove = function (e) {
            // if(!this._app.sceneObjectMgr.sceneStoryMgr){
            // 	return false;
            // }
            // if(!this._app.sceneObjectMgr.sceneStoryMgr.isSceneMove) return false;
            // if(!this._downPos) return false;
            // let mx:number = (this._downPos.x - e.stageX)/this.scaleX;
            // let my:number = (this._downPos.y - e.stageY)/this.scaleY;
            // this.camera.moveto(this._bufferLeft+this.camera.centerPointX+mx, this._bufferTop+this.camera.centerPointY+my, 0);
            return true;
        };
        SceneRoot.prototype.update = function (diff) {
            //如无法满足，则退出循环 TODO可优化一下
            var objMgr = this._app.sceneObjectMgr;
            if (!this._resLoaded
                || !this._avatarLayer.avatarInited
                || !objMgr.followUnit) {
                return;
            }
            if (!this._avatarLayer.scene3d.is2D) {
                //3D场景只绘制3D形象和3D特效
                this._avatarLayer.update(diff);
                this._avatarLayer.onDraw(diff);
                //战斗飘字另想办法
                return;
            }
            if (!this._thum)
                return;
            //摄像机心跳
            var cam = this.camera;
            cam.update();
            // 景深层心跳
            for (var i = 0; i < this._depthLayers.length; i++) {
                var farData = objMgr.mapAssetInfo.farLayers[i];
                var fleft = farData.x + (farData.x + farData.width / 2 - objMgr.mainUnit.pos.x * SceneRes.CELL_WIDTH) * (farData.xMoveRate - 1);
                var fright = farData.y + (farData.y + farData.height / 2 - objMgr.mainUnit.pos.y * SceneRes.CELL_HEIGHT) * (farData.yMoveRate - 1);
                var depthLayer = this._depthLayers[i];
                depthLayer.setLayerLocation(fleft, fright);
                depthLayer.setViewPortByCamera(cam);
                depthLayer.update();
            }
            //地图层心跳
            this._bottomMapPartLayer.setViewPortByCamera(cam);
            this._bottomMapPartLayer.update();
            //障碍层
            if (this._isDebug) {
                this._obsLayer.setViewPortByCamera(cam);
                this._obsLayer.update();
            }
            //底层特效
            this._bottomEffectLayer.onDraw(cam);
            this._bottomSKEffectLayer.onDraw(cam);
            //水层绘制
            this.updateWater();
            //avatar渲染器心跳，主要为了剔除
            this._avatarLayer.update(diff);
            //绘制形象
            this._avatarLayer.onDraw(diff);
            //顶层特效
            this._topEffectLayer.onDraw(cam);
            this._topSKEffectLayer.onDraw(cam);
            //战斗信息
            this._fightxtDrawtor.onDraw(diff, cam);
            //选中对象的特效显示
            this.updateSelectAvatar();
            //地面点击特效
            this.updateFloorClickEffect();
            //处理升级特效
            this.updateUpgradeEffect();
            //天气系统
            this._weatherLayer && this._weatherLayer.onDraw(this, this._topNameLayer.graphics);
            //灯光
            this._lightLayer && this._lightLayer.onDraw(cam, this._topNameLayer.graphics);
            //打雷
            this.drawThunder();
            //音效
            this.updateSound();
            //安全区
            this.updateSafeArea();
            //非安全区
            this.updateUnSafeArea();
            //传送点
            this.checkTelepoteShow(diff);
        };
        SceneRoot.prototype.updateSound = function () {
            // if(this.app.sceneObjectMgr.mapInfo.inBattle) return;
            // let objMgr: SceneObjectMgr = this._app.sceneObjectMgr;
            // if (objMgr.mainUnit) {
            // 	let enableRunSound: boolean = objMgr.mainUnit.isMoving && !objMgr.mainUnit.isRiding;
            // 	if (this._sound_mainUnit_running != enableRunSound) {
            // 		this._sound_mainUnit_running = enableRunSound;
            // 		this._sound_mainUnit_running ? this._app.playSound("sounds/s_run.mp3", 0) : this._app.stopSound("sounds/s_run.mp3");
            // 	}
            // }
        };
        //绘制水层
        SceneRoot.prototype.updateWater = function () {
            var mapAssetInfo = this._app.sceneObjectMgr.mapAssetInfo;
            var waters = mapAssetInfo.waters;
            var len = waters ? waters.length : 0;
            //底层地图层初始化
            var imgId = mapAssetInfo.imgId > 0 ? mapAssetInfo.imgId : this.mapid;
            for (var i = 0; i < len; i++) {
                var water = waters[i];
                var add = 100;
                if (this.camera.lookInBuffer(water.x - add, water.y - add, water.width + add * 2, water.height + add * 2)) {
                    // 视野内
                    var waterSprite = this._waterLayers[i];
                    if (!waterSprite) {
                        var waterUrl = game.Path.scene_maps + imgId.toString() + "/" + water.name + ".png";
                        var waterSampleUrl = game.Path.scene_maps + "water_sample.png";
                        waterSprite = new game.shader.WaterSprite(water, waterUrl, waterSampleUrl);
                        this._waterLayers[i] = waterSprite;
                        this._waterLayerSprite.addChild(waterSprite);
                    }
                    waterSprite.x = water.x - this.camera.bufferLeft;
                    waterSprite.y = water.y - this.camera.bufferTop;
                }
                else {
                    //非视野内
                    var waterSprite = this._waterLayers[i];
                    if (waterSprite) {
                        this._waterLayers[i] = null;
                        waterSprite.clear(false);
                        waterSprite.removeSelf();
                    }
                }
            }
            for (var i = len + 1; i < this._waterLayers.length; i++) {
                var waterSprite = this._waterLayers[i];
                if (waterSprite) {
                    this._waterLayers[i] = null;
                    waterSprite.clear(false);
                    waterSprite.removeSelf();
                }
            }
            this._waterLayers.length = len;
        };
        SceneRoot.prototype.updateSelectAvatar = function () {
            var cur_time = Laya.timer.currTimer;
            var objMgr = this._app.sceneObjectMgr;
            //查找对象
            var u = objMgr.selectUnit;
            if (this._curSelectOid == objMgr.selectOid) {
                //如果选中的是玩家  需要定时校验下友好度
                if ((this._flushSelectEffectCD > 0 && this._flushSelectEffectCD < cur_time) || !u || !u.isPlayer)
                    return;
                var nowFriendly = this._app.aCotrller.isFriendly(u);
                if (nowFriendly == this._oldSelectUnitFriendly) {
                    this._flushSelectEffectCD = cur_time + 3000;
                    return;
                }
            }
            //同步oid
            this._curSelectOid = objMgr.selectOid;
            this._flushSelectEffectCD = cur_time + 3000;
            //不能选中玩家自己
            if (!u) {
                //移除特效
                if (this._curSelectOidRedEffect) {
                    this.removeEffect(this._curSelectOidRedEffect);
                    this._curSelectOidRedEffect = null;
                }
                if (this._curSelectOidGreenEffect) {
                    this.removeEffect(this._curSelectOidGreenEffect);
                    this._curSelectOidGreenEffect = null;
                }
            }
            else {
                //直接显示选中特效
                // this._oldSelectUnitFriendly = this._app.aCotrller.isFriendly(u);
                // if (this._oldSelectUnitFriendly) {//友好
                // 	if (this._curSelectOidRedEffect) {
                // 		this.removeEffect(this._curSelectOidRedEffect);
                // 		this._curSelectOidRedEffect = null;
                // 	}
                // 	if (!this._curSelectOidGreenEffect) {
                // 		this._curSelectOidGreenEffect = ObjectPools.malloc(EffectAvatar) as EffectAvatar;
                // 		this._curSelectOidGreenEffect.setData("0000select_npc");
                // 		this._curSelectOidGreenEffect.toward = Direct.BOTTOM;
                // 		this._curSelectOidGreenEffect.atBottom = true;
                // 		this._curSelectOidGreenEffect.setLoop(true);
                // 		this.addEffect(this._curSelectOidGreenEffect);
                // 	}
                // 	this._curSelectOidGreenEffect.anchorObject = u;
                // 	this._curSelectOidGreenEffect.scale = u.userData instanceof AvatarBase ? u.userData.scale : 1;
                // }
                // else {//非友好
                // 	if (this._curSelectOidGreenEffect) {
                // 		this.removeEffect(this._curSelectOidGreenEffect);
                // 		this._curSelectOidGreenEffect = null;
                // 	}
                // 	if (!this._curSelectOidRedEffect) {
                // 		this._curSelectOidRedEffect = ObjectPools.malloc(EffectAvatar) as EffectAvatar;
                // 		this._curSelectOidRedEffect.setData("0000select_monster");
                // 		this._curSelectOidRedEffect.toward = Direct.BOTTOM;
                // 		this._curSelectOidRedEffect.atBottom = true;
                // 		this._curSelectOidRedEffect.setLoop(true);
                // 		this.addEffect(this._curSelectOidRedEffect);
                // 	}
                // 	this._curSelectOidRedEffect.anchorObject = u;
                // 	this._curSelectOidRedEffect.scale = u.userData instanceof AvatarBase ? u.userData.scale : 1;
                // }
                // this._clickCellX = 0;
                // this._clickCellY = 0;
            }
        };
        //处理地面点击特效
        SceneRoot.prototype.updateFloorClickEffect = function () {
            var mainUnit = this._app.sceneObjectMgr.mainUnit;
            if (!mainUnit)
                return;
            var isNeedRemove = true;
            var contrller = this._app.aCotrller;
            if (mainUnit.isMoving && contrller.canShowRoadEffect && mainUnit.pos &&
                MathU.getDistance(mainUnit.pos.x, mainUnit.pos.y, mainUnit.targetPosX, mainUnit.targetPosY) > 0.5
                && !this.app.sceneObjectMgr.mapInfo.inBattle) {
                this._clickCellX = mainUnit.targetPosX;
                this._clickCellY = mainUnit.targetPosY;
                if (!this._clickFloorEffect) {
                    this._clickFloorEffect = ObjectPools.malloc(EffectAvatar);
                    this._clickFloorEffect.setData("0000click_floor");
                    this._clickFloorEffect.toward = Direct.BOTTOM;
                    this._clickFloorEffect.atBottom = true;
                    this._clickFloorEffect.anchorPostion = new Vector2(this._clickCellX, this._clickCellY);
                    this._clickFloorEffect.setLoop(true);
                    this.addEffect(this._clickFloorEffect);
                }
                else if (this._clickFloorEffect.anchorPostion && this._clickFloorEffect.anchorPostion.x != this._clickCellX && this._clickFloorEffect.anchorPostion.y != this._clickCellY) {
                    this._clickFloorEffect.anchorPostion.x = this._clickCellX;
                    this._clickFloorEffect.anchorPostion.y = this._clickCellY;
                }
                isNeedRemove = false;
            }
            if (isNeedRemove && this._clickFloorEffect) {
                this.removeEffect(this._clickFloorEffect);
                this._clickFloorEffect = null;
                this._clickCellX = 0;
                this._clickCellY = 0;
            }
        };
        //处理升级特效
        SceneRoot.prototype.updateUpgradeEffect = function () {
            var mainUnit = this._app.sceneObjectMgr.mainUnit;
            if (!mainUnit)
                return;
            var newLevel = mainUnit.level;
            if (this._oldMainUnitLevel <= 0) {
                this._oldMainUnitLevel = newLevel;
                return;
            }
            if (newLevel <= this._oldMainUnitLevel)
                return;
            this._oldMainUnitLevel = newLevel;
            var effect = ObjectPools.malloc(EffectAvatar);
            effect.setData("0000upgrade");
            effect.toward = Direct.BOTTOM;
            effect.anchorObject = mainUnit;
            if (mainUnit.mountid >= 1)
                effect.offSet = [0, 0, 0, 0, 0, -60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.addEffect(effect);
            //播放升级音效
            this._app.playSound("sounds/s_upgrade.mp3");
        };
        /**
         * 马上打雷
         *
         */
        SceneRoot.prototype.thunder = function () {
            this._nextThunderTime = Laya.timer.currTimer;
            // logd("[Scene] 打雷", this._nextThunderTime);
        };
        SceneRoot.prototype.drawThunder = function () {
            ///// 打雷 //////
            var duration = Laya.timer.currTimer - this._nextThunderTime;
            if (duration > 0 && duration <= 300) {
                //屏幕闪烁
                var breadth = Math.cos(duration / 70);
                breadth = Math.abs(breadth);
                if (breadth > 0.4)
                    breadth = 0.4;
                this._topNameLayer.graphics.drawRect(0, 0, this.camera.width, this.camera.height, "#FFFFFF");
                this._topNameLayer.blendMode = "lighter";
                this._topNameLayer.alpha = breadth;
            }
            else {
                if (this._topNameLayer.blendMode == "lighter") {
                    this._topNameLayer.blendMode = "";
                    this._topNameLayer.alpha = 1;
                    //开始打雷
                    this._app.playSound("sounds/s_thunder.mp3");
                }
            }
        };
        // 场景切换
        SceneRoot.prototype.transitions = function (hanlder) {
            var _this = this;
            if (!this._transitionsSprite) {
                this._transitionsSprite = new Sprite();
                this.addChild(this._transitionsSprite);
            }
            this._transitionsObj = {};
            this._transitionsObj.alpha = 0.5;
            this._transitionsObj.radius = 1;
            this._transitionsObj.colorR = 255;
            this._transitionsObj.colorG = 255;
            this._transitionsObj.colorB = 255;
            var func = function () {
                _this._transitionsSprite.alpha = _this._transitionsObj.alpha;
                _this._transitionsSprite.graphics.clear();
                var color = "#"
                    + MathU.toHex(Math.floor(_this._transitionsObj.colorR))
                    + MathU.toHex(Math.floor(_this._transitionsObj.colorG))
                    + MathU.toHex(Math.floor(_this._transitionsObj.colorB));
                _this._transitionsSprite.graphics.drawRect(0, 0, _this.camera.width, _this.camera.height, color);
            };
            this._transitionsSprite.frameLoop(1, this, func);
            Laya.Tween.to(this._transitionsObj, { alpha: .95 }, 500, Laya.Ease.bounceOut, Handler.create(this, function () {
                Laya.Tween.to(_this._transitionsObj, { colorR: 0, colorG: 0, colorB: 0 }, 1000, null, Handler.create(_this, function () {
                    _this._transitionsSprite.clearTimer(_this, func);
                    _this._transitionsSprite.destroy(true);
                    _this._transitionsSprite = null;
                    _this._transitionsObj = null;
                    hanlder && hanlder.run();
                }));
            }));
        };
        /**
         * 添加特效
         */
        SceneRoot.prototype.addEffect = function (e) {
            var layer;
            if (e instanceof EffectSkeleton) {
                layer = e.atBottom ? this._bottomSKEffectLayer : this._topSKEffectLayer;
            }
            else {
                layer = e.atBottom ? this._bottomEffectLayer : this._topEffectLayer;
            }
            !layer.isFull && layer.addEffect(e);
        };
        /**
         * 移除特效
         */
        SceneRoot.prototype.removeEffect = function (e) {
            var layer;
            if (e instanceof EffectSkeleton) {
                layer = e.atBottom ? this._bottomSKEffectLayer : this._topSKEffectLayer;
            }
            else {
                layer = e.atBottom ? this._bottomEffectLayer : this._topEffectLayer;
            }
            layer.removeEffect(e);
        };
        /**
         * 绘制测试圆
         * @param radius 半径
         */
        SceneRoot.prototype.drawDebugCircle = function (radius) {
            this._obsLayer.drawCircle(this._app.sceneObjectMgr.mainUnit.pos.x, this._app.sceneObjectMgr.mainUnit.pos.y, radius, this.camera);
        };
        // 更新安全区域
        SceneRoot.prototype.updateSafeArea = function () {
            // this.safeArea = new game.data.Circle(68, 81, 10);
            if (!this._safeArea) {
                if (this._safeAreaSprite) {
                    this._safeAreaSprite.destroy(true);
                    this._safeAreaSprite = null;
                }
                return;
            }
            if (!this._safeAreaSprite) {
                this._safeAreaSprite = new Sprite();
                this._safeAreaSprite.pivotX = .5,
                    this._safeAreaSprite.pivotY = .5,
                    this._safeAreaSprite.width = 1;
                this._safeAreaSprite.height = 1;
                this._safeAreaSprite.scaleY = SceneRes.CELL_HEIGHT / SceneRes.CELL_WIDTH;
                var index = this.getChildIndex(this._obsLayer);
                this.addChildAt(this._safeAreaSprite, index);
            }
            this._safeAreaSprite.graphics.clear();
            var x = this.camera.getScenePxByCellX(this._safeArea.x);
            var y = this.camera.getScenePxByCellY(this._safeArea.y);
            var radius = this._safeArea.radius * SceneRes.CELL_WIDTH;
            this._safeAreaSprite.x = x;
            this._safeAreaSprite.y = y;
            var alpha = this._safeAreaSprite.alpha;
            if (this._safeAreaSprite.name) {
                alpha -= 0.01;
                if (alpha < .2) {
                    this._safeAreaSprite.name = null;
                }
            }
            else {
                alpha += 0.01;
                if (alpha > .6) {
                    this._safeAreaSprite.name = "safeArea";
                }
            }
            this._safeAreaSprite.alpha = alpha;
            this._safeAreaSprite.graphics.drawCircle(0, 0, radius, null, "#FF0000", 3);
        };
        // 更新安全区域
        SceneRoot.prototype.updateUnSafeArea = function () {
            // this.safeArea = new game.data.Circle(68, 81, 10);
            if (!this._unSafeArea) {
                if (this._unSafeAreaSprite) {
                    this._unSafeAreaSprite.destroy(true);
                    this._unSafeAreaSprite = null;
                }
                return;
            }
            if (!this._unSafeAreaSprite) {
                this._unSafeAreaSprite = new Sprite();
                this._unSafeAreaSprite.pivotX = .5,
                    this._unSafeAreaSprite.pivotY = .5,
                    this._unSafeAreaSprite.width = 1;
                this._unSafeAreaSprite.height = 1;
                this._unSafeAreaSprite.scaleY = SceneRes.CELL_HEIGHT / SceneRes.CELL_WIDTH;
                var index = this.getChildIndex(this._obsLayer);
                this.addChildAt(this._unSafeAreaSprite, index);
            }
            this._unSafeAreaSprite.graphics.clear();
            var x = this.camera.getScenePxByCellX(this._unSafeArea.x);
            var y = this.camera.getScenePxByCellY(this._unSafeArea.y);
            var radius = this._unSafeArea.radius * SceneRes.CELL_WIDTH;
            this._unSafeAreaSprite.x = x;
            this._unSafeAreaSprite.y = y;
            var alpha = this._unSafeAreaSprite.alpha;
            if (this._unSafeAreaSprite.name) {
                alpha -= 0.01;
                if (alpha < .2) {
                    this._unSafeAreaSprite.name = null;
                }
            }
            else {
                alpha += 0.01;
                if (alpha > .6) {
                    this._unSafeAreaSprite.name = "unSafeArea";
                }
            }
            this._unSafeAreaSprite.alpha = alpha;
            this._unSafeAreaSprite.graphics.drawCircle(0, 0, radius, "#FF0000", "#FF0000", 3);
        };
        // 鼠标按下事件
        SceneRoot.prototype.onMouseDown = function (e) {
            this._downPos = new Point(e.stageX, e.stageY);
            this._bufferLeft = this.camera.bufferLeft;
            this._bufferTop = this.camera.bufferTop;
            Laya.timer.clear(this, this.countTime);
            this.countTimes = 0;
            Laya.timer.loop(1000, this, this.countTime, [e]);
            return this.onSceneTouch(e);
        };
        // 鼠标移动事件
        SceneRoot.prototype.onMouseMove = function (e) {
            return this.onSceneMove(e);
        };
        // 鼠标弹起事件
        SceneRoot.prototype.onMouseUp = function (e) {
            this._downPos = null;
            this._bufferLeft = this._bufferTop = 0;
            Laya.timer.clear(this, this.countTime);
            this.countTimes = 0;
            return false;
        };
        // 鼠标移开
        SceneRoot.prototype.onMouseOut = function (e) {
            this._downPos = null;
            this._bufferLeft = this._bufferTop = 0;
            return false;
        };
        SceneRoot.prototype.countTime = function (e) {
            this.countTimes++;
            if (this.countTimes >= 1) {
                Laya.timer.clear(this, this.countTime);
                this.countTimes = 0;
                this.onSceneLongTouch(e);
            }
        };
        SceneRoot.prototype.clear = function () {
            //贴图对象清理
            this._thum = null;
            // 清理资源
            this._thumLoader.clear(true);
            // 清理深度层
            for (var _i = 0, _a = this._depthLayers; _i < _a.length; _i++) {
                var layer = _a[_i];
                layer && layer.destroy(true);
            }
            this._depthLayers.length = 0;
            //清理地图层			
            this._bottomMapPartLayer.clear();
            //水层清理
            for (var _b = 0, _c = this._waterLayers; _b < _c.length; _b++) {
                var layer = _c[_b];
                layer && layer.destroy(true);
            }
            this._waterLayers.length = 0;
            if (this._imgBlack) {
                this._imgBlack.removeSelf();
                this._imgBlack = null;
            }
            //清理avatar
            this._avatarLayer.clear();
            //天气系统
            if (this._weatherLayer) {
                this._weatherLayer.clear();
                this._weatherLayer = null;
            }
            if (this._lightLayer) {
                this._lightLayer.clear();
                this._lightLayer = null;
            }
            //清理背景音效
            if (this._backgroundMusic && this._backgroundMusic.length) {
                this._app.stopMusic();
                this._backgroundMusic = null;
            }
            //清理安全区
            this._safeArea = null;
            if (this._safeAreaSprite) {
                this._safeAreaSprite.destroy(true);
                this._safeAreaSprite = null;
            }
            //清楚传送点
            this.clearTeleportEffects();
        };
        return SceneRoot;
    }(Laya.Sprite));
    game.SceneRoot = SceneRoot;
})(game || (game = {}));
//# sourceMappingURL=SceneRoot.js.map