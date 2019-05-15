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
* UI
*/
var game;
(function (game) {
    var UIRoot = /** @class */ (function (_super) {
        __extends(UIRoot, _super);
        function UIRoot(app) {
            var _this = _super.call(this, app) || this;
            /**游戏gm命令开启 */
            _this.gameGmOpen = false;
            //主玩家数据是否获得标志
            _this._isGetPlayerData = false;
            //是否暂停热键
            _this._isPauseKey = false;
            //前地图id
            _this._prevMapId = 0;
            //聊天 发出消息记录 最多存5条
            _this._chatRecordeInfo = [];
            //能否更新UI
            _this._isCanUpdateHUD = true;
            //随机名字缓存
            _this._randomName = "";
            //随机性别缓存
            _this._randomGender = 0;
            _this._mouseLock = false;
            _this._isShowItemTips = false;
            // 预加载素材
            _this._preLoadUrls = [
                'res/atlas/scene/common.atlas',
                // 'res/atlas/ui/effect.atlas',
                // 'scene/avatar/avatar.data',
                // 'scene/avatar/idxzip.bin',
                'res/atlas/ui/hud.atlas',
                'res/atlas/ui/tongyong.atlas',
            ];
            _this._hasBgCount = 0;
            _this.gameGmOpen = isDebug;
            PageDef.init();
            _this._preLoad = _this._app.preLoad;
            // 顶层ui
            _this._topUI = new TopUI(app);
            // 一般UI层
            _this._generalUI = new GeneralUI(app);
            // HUD层
            _this._HUD = new HUD(app);
            //提示层
            _this._topUnderUI = new TopunderUI(app);
            _this.addChild(_this._HUD);
            _this.addChild(_this._generalUI);
            _this.addChild(_this._topUnderUI);
            _this.addChild(_this._topUI);
            _this._getItemList = [];
            //打开加载界面
            _this._topUI.open(PageDef.LOADING, function (page) {
                _this.event(UIRoot.INIT);
                // 加载必要素材
                var assetsLoader = new AssetsLoader();
                assetsLoader.load([game.Path.atlas_ui + 'tongyong.atlas'], Handler.create(_this, _this.onNeedAssetLoaded));
            });
            return _this;
        }
        Object.defineProperty(UIRoot.prototype, "uiMode", {
            get: function () {
                return this._uiMode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIRoot.prototype, "randomGender", {
            get: function () {
                if (this._randomGender == 0) {
                    this._randomGender = Random.randInt(1, 2);
                }
                return this._randomGender;
            },
            set: function (value) {
                this._randomGender = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIRoot.prototype, "randomName", {
            get: function () {
                if (this._randomName == "") {
                    this._randomName = game.utils.NicknameU.getRandomNickname(this.randomGender);
                }
                return this._randomName;
            },
            set: function (value) {
                this._randomName = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIRoot.prototype, "isPauseKey", {
            get: function () {
                return this._isPauseKey;
            },
            set: function (value) {
                this._isPauseKey = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIRoot.prototype, "top", {
            get: function () {
                return this._topUI;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIRoot.prototype, "topUnder", {
            get: function () {
                return this._topUnderUI;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIRoot.prototype, "general", {
            get: function () {
                return this._generalUI;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIRoot.prototype, "HUD", {
            get: function () {
                return this._HUD;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIRoot.prototype, "mouseLock", {
            set: function (v) {
                this._mouseLock = v;
            },
            enumerable: true,
            configurable: true
        });
        UIRoot.prototype.onNeedAssetLoaded = function () {
            var aCotrller = this._app.aCotrller;
            aCotrller.on(ACotrller.TELEPORT_STATE_CHANGE, this, this.onUpdateTeleportState);
            //mainUnit变化监听
            this._app.sceneObjectMgr.on(SceneObjectMgr.MAINUNIT_UPDATE, this, this.onMainUnit);
            this.onMainUnit();
            this._app.sceneObjectMgr.on(SceneObjectMgr.MAP_TELEPORT, this, this.intoMap);
        };
        //当mainUnit获取到的时候 
        UIRoot.prototype.onMainUnit = function () {
            var mainUnit = this._app.sceneObjectMgr.mainUnit;
            if (!mainUnit)
                return;
            //死亡状态监听
            mainUnit.AddListen(UnitField.UNIT_INT_BYTE0, this, this.updatePlayerLiveState);
            this.updatePlayerLiveState();
        };
        //进入某张地图
        UIRoot.prototype.intoMap = function (newMapid) {
            if (!newMapid)
                return;
            this.checkUIMode(true);
            //记录
            this._prevMapId = newMapid;
        };
        //死亡状态
        UIRoot.prototype.updatePlayerLiveState = function () {
            var mainUnit = this._app.sceneObjectMgr.mainUnit;
            if (!mainUnit)
                return;
        };
        UIRoot.prototype.onUpdateTeleportState = function () {
            if (this._app.aCotrller.isTeleporting) {
                //this.showLoadProgress(EnumToString.randomTeleGameTip(), 0, 0.04);
                var _changJingChangeMediator = new game.modules.commonUI.ChangJingChangeMediator(this._app);
                _changJingChangeMediator.onShow(true);
            }
            else {
                this.closeLoadProgress();
            }
        };
        // 显示加载进度条
        UIRoot.prototype.showLoadProgress = function (str, value, add, max) {
            if (value === void 0) { value = -1; }
            if (add === void 0) { add = 0; }
            if (max === void 0) { max = -1; }
            var loading = this._topUI.getPage(PageDef.LOADING);
            if (!loading) {
                loading = this._topUI.open(PageDef.LOADING, function (page) {
                    page['setProgress'](str, value, add, max);
                });
            }
            else {
                loading['setProgress'](str, value, add, max);
            }
        };
        // 关闭加载进度条
        UIRoot.prototype.closeLoadProgress = function () {
            this._topUI.close(PageDef.LOADING);
        };
        //在PC端
        UIRoot.prototype.openHUD = function () {
            this._HUD.closeAll();
            this._HUD.open(PageDef.HUD_MAIN_PAGE);
        };
        // 主玩家数据下来了
        UIRoot.prototype.toLoadMainPlayerData = function () {
            this._isGetPlayerData = true;
            this._preLoad.on(LEvent.CHANGED, this, this.checkIntoScene);
            for (var _i = 0, _a = this._preLoadUrls; _i < _a.length; _i++) {
                var url = _a[_i];
                var asset = RefAsset.Get(url, false);
                if (!asset || !asset.parseComplete) {
                    this._preLoad.load(url, RefAsset.GENRAL);
                }
            }
            this.checkIntoScene();
            this._app.aCotrller.pluginsMgr.lastOptTime = Laya.timer.currTimer;
        };
        /*private onPlugin(): void {
            this.checkUIMode(true);

        }*/
        // 进入场景校验
        UIRoot.prototype.checkIntoScene = function () {
            var loadCount = this._preLoad.loadCount;
            var totalCount = this._preLoad.totalCount;
            if (loadCount == totalCount) {
                this._preLoad.off(LEvent.CHANGED, this, this.checkIntoScene);
                for (var _i = 0, _a = this._preLoadUrls; _i < _a.length; _i++) {
                    var url = _a[_i];
                    this._preLoad.clear(url);
                }
                // 这里等待传送栈关闭加载界面
                this.closeLoadProgress();
                //this._app.sceneObjectMgr.joinFakeMap(MapInfo.MAP_XINSHOUCUN,MapInfo.MAP_XINSHOUCUN_POSX,MapInfo.MAP_XINSHOUCUN_POSY);
            }
            else {
                this.showLoadProgress('正在加载....', loadCount / totalCount, 0.003, (loadCount + 1) / totalCount);
            }
        };
        UIRoot.prototype.resize = function (w, h) {
            this._clientWidth = w;
            this._clientHeight = h;
            // this.updateBackBg();
            this._topUI.resize(w, h);
            this._generalUI.resize(w, h);
            this._HUD.resize(w, h);
            this._topUnderUI.resize(w, h);
            // this._isVertical = h > w;
            // if (this._HUD && this._isGetPlayerData) {
            // 	this.checkUIMode();
            // }
        };
        //检查当前的UI模式
        UIRoot.prototype.checkUIMode = function (frush) {
            if (!this._isCanUpdateHUD)
                return;
            var oldMode = this._uiMode;
            if (this._isVertical) {
                this._uiMode = UIRoot.MODE_VERTICAL;
            }
            else {
                this._uiMode = UIRoot.MODE_HORIZONTAL;
            }
            //this._uiMode = UIRoot.MODE_HORIZONTAL;
            if (frush || this._uiMode != oldMode)
                this.onChangeUIMode();
        };
        //检查UI模式之后，构建UI
        UIRoot.prototype.onChangeUIMode = function () {
            //特殊地图 特殊处理
            var mapid = this._app.sceneObjectMgr.mapid;
            var mapinfo = this._app.sceneObjectMgr.mapInfo;
            //战斗场景
            if (mapinfo && mapinfo.inBattle) {
                this._HUD.closeAll();
                this._generalUI.closeAll();
                this._HUD.open(PageDef.HUD_MAIN_PAGE);
                this._HUD.open(PageDef.HUD_FIGHT_PAGE);
            }
            else {
                //没有特殊要求就直接打开HUD
                this.openHUD();
            }
        };
        UIRoot.prototype.onKeyDown = function (e) {
            if (this._isPauseKey)
                return;
            var api = gameApi;
            //以下都是需要进入游戏的快捷键
            if (!this._app.sceneObjectMgr.mainUnit)
                return;
            //PC端热键
            if (api && api.isIntranet && e.keyCode == 121) { //F10
            }
            else if (e.keyCode == UIRoot.KEYCODE_Z) //z键
             {
                var controler = this._app.aCotrller;
                console.log("人物停止1");
                controler.curBehaviorState == ACotrller.BEHAVIOR_STATE_HANGUP ? controler.pluginsStop(true) : controler.pluginsStart(true);
            }
            else if (e.keyCode == UIRoot.KEYCODE_ESC) //Esc键
             {
                this.onKeyESC();
            }
            else if (e.keyCode == UIRoot.KEYCODE_M) //M键
             {
            }
            else if (e.keyCode == UIRoot.KEYCODE_Q) //q键
             {
            }
            else if (e.keyCode == UIRoot.KEYCODE_TAB) //Tab键
             {
                //切换攻击目标。不能切换到NPC和门派成员身上
                var t_unit = this._app.aCotrller.selectNearUnit(this._app.sceneObjectMgr.selectOid);
                if (t_unit)
                    this._app.sceneObjectMgr.selectOid = t_unit.oid;
            }
            else if (e.keyCode == UIRoot.KEYCODE_SPAPCE) //Space键
             {
            }
            else if (e.keyCode == UIRoot.KEYCODE_A) //a键
             {
            }
            else if (e.keyCode == UIRoot.KEYCODE_V) {
            }
            else if (e.keyCode == Laya.Keyboard.F4) {
                this._app.uiRoot.visible = !this._app.uiRoot.visible;
            }
        };
        UIRoot.prototype.update = function (diff) {
            if (!diff || diff < 0)
                return;
            this.topUnder.checkQueue();
        };
        /*按下Enter键后*/
        UIRoot.prototype.onKeyEnter = function () {
            !this._topUI.enter() && this._generalUI.enter();
        };
        /*按下Esc键后*/
        UIRoot.prototype.onKeyESC = function () {
            !this._topUI.cancel() && this._generalUI.cancel();
        };
        UIRoot.prototype.addBgCount = function (key) {
            if (this.checkKey(key))
                this.hasBgCount++;
        };
        UIRoot.prototype.subBgCount = function (key) {
            if (this.checkKey(key))
                this.hasBgCount--;
        };
        UIRoot.prototype.checkKey = function (key) {
            switch (key) {
                default:
                    return false;
            }
        };
        Object.defineProperty(UIRoot.prototype, "hasBgCount", {
            get: function () {
                return this._hasBgCount;
            },
            set: function (v) {
                this._hasBgCount = v;
                this.updateBackBg();
            },
            enumerable: true,
            configurable: true
        });
        UIRoot.prototype.updateBackBg = function () {
            if (this._blackSprite)
                this._blackSprite.graphics.clear();
            //logd("当前页面数量：" + this._hasBgCount);
            if (this._hasBgCount > 0) {
                this.drawBlack();
            }
            else {
                this.clearBlack();
            }
        };
        /**
         * 绘制黑底
         */
        UIRoot.prototype.drawBlack = function () {
            if (!this._blackSprite) {
                this._blackSprite = new Sprite();
                this._blackSprite.alpha = 0.7;
                this._generalUI.addChildAt(this._blackSprite, 0);
                this._blackSprite.on(LEvent.CLICK, this, this.onBlackClick);
            }
            this._blackSprite.size(this._clientWidth, this._clientHeight);
            this._blackSprite.graphics.clear();
            this._blackSprite.graphics.drawRect(0, 0, this._clientWidth, this._clientHeight, "#000000");
        };
        /**
         * 黑底点击事件
         */
        UIRoot.prototype.onBlackClick = function () {
            this._generalUI && this._generalUI.cancel();
        };
        /**
         * 清理黑底
         */
        UIRoot.prototype.clearBlack = function () {
            if (this._blackSprite) {
                this._blackSprite.off(LEvent.CLICK, this, this.onBlackClick);
                this._blackSprite.destroy(true);
                this._blackSprite = null;
            }
            if (this._spriteLeft) {
                this._spriteLeft.graphics.clear();
                this._spriteLeft.destroy();
                this._spriteLeft = null;
            }
            if (this._spriteRight) {
                this._spriteRight.graphics.clear();
                this._spriteRight.destroy();
                this._spriteRight = null;
            }
        };
        //一级界面按钮点击后做些什么呢
        UIRoot.prototype.doSomethingByClickHudBtn = function (needPlayMusic) {
            if (needPlayMusic === void 0) { needPlayMusic = true; }
            if (needPlayMusic)
                this.playClickBtnSound();
        };
        //播放按钮音乐
        UIRoot.prototype.playClickBtnSound = function () {
            this._app.playSound("sounds/u_btn.mp3");
        };
        // 鼠标按下事件
        UIRoot.prototype.onMouseDown = function (e) {
            return false;
        };
        // 鼠标移动事件
        UIRoot.prototype.onMouseMove = function (e) {
            return false;
        };
        // 鼠标弹起事件
        UIRoot.prototype.onMouseUp = function (e) {
            return false;
        };
        // 鼠标移开
        UIRoot.prototype.onMouseOut = function (e) {
            return false;
        };
        //UI模式
        UIRoot.MODE_HORIZONTAL = 0; //横屏模式
        UIRoot.MODE_VERTICAL = 1; //竖屏模式
        //热键枚举
        UIRoot.KEYCODE_A = 65; //A键
        UIRoot.KEYCODE_Q = 81; //Q键
        UIRoot.KEYCODE_Z = 90; //Z键
        UIRoot.KEYCODE_V = 86; //V键
        UIRoot.KEYCODE_ESC = 27; //eac键
        UIRoot.KEYCODE_M = 77; //M键
        UIRoot.KEYCODE_SPAPCE = 32; //Space键
        UIRoot.KEYCODE_TAB = 9; //Tab键
        UIRoot.KEYCODE_ENTER = 13; //enter键
        UIRoot.KEYCODE_UP = 38; //↑
        UIRoot.KEYCODE_DOWN = 40; //↓
        UIRoot.KEYCODE_LEFT = 37; //←
        UIRoot.KEYCODE_RIGHT = 39; //→
        // 初始化事件
        UIRoot.INIT = 'init';
        /** 已经移除事件 */
        UIRoot.REMOVE = 'remove';
        return UIRoot;
    }(game.gui.base.Container));
    game.UIRoot = UIRoot;
})(game || (game = {}));
//# sourceMappingURL=UIRoot.js.map