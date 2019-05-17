/**
* name
*/
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
var game;
(function (game) {
    var modules;
    (function (modules) {
        var mapworld;
        (function (mapworld) {
            var MapWorldModule = /** @class */ (function (_super) {
                __extends(MapWorldModule, _super);
                function MapWorldModule(app) {
                    var _this = _super.call(this) || this;
                    _this.uiLayer = app.uiRoot.general;
                    _this._viewUI = new ui.common.MapWorldUI();
                    _this._clientWidth = app.clientWidth;
                    _this._clientHeight = app.clientHeight;
                    _this._app = app;
                    _this.mapjump = 0;
                    //世界地图按钮点击事件
                    _this._viewUI.mapHuoYunZong_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_HUOYUNZONG]);
                    _this._viewUI.mapJiShiZhen_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_JISHIZHEN]);
                    _this._viewUI.mapTianLeiYu_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_TIANLEIYU]);
                    _this._viewUI.mapYunXiaoDian_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_YUNXIAODIAN]);
                    _this._viewUI.mapWuLiangGong_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_WULIANGGONG]);
                    _this._viewUI.mapCangYuGong_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_CANGYUGONG]);
                    _this._viewUI.mapFeiXueYa_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_FEIXUEYA]);
                    _this._viewUI.mapDanYangGuan_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_DANYANGGUAN]);
                    _this._viewUI.mapYouMingDian_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_YOUMINGDIAN]);
                    _this._viewUI.mapBaiShaXiaoZhu_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_BAISHAXIAOZHU]);
                    _this._viewUI.mapXiangSiGu_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_XIANGSIGU]);
                    _this._viewUI.mapChunQiuLin_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_CHUNQIULIN]);
                    _this._viewUI.mapTaoHuaXi_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_TAOHUAXI]);
                    _this._viewUI.mapHuangYanLing_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_HUANGYANLING]);
                    _this._viewUI.mapChengNingDao_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_CHENGNINGDAO]);
                    _this._viewUI.mapPanLongShan_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_PANLONGSHAN]);
                    _this._viewUI.mapTianZhouYiZhan_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_TIANZHOUYIZHAN]);
                    _this._viewUI.mapWangFengTing_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_WANGFENGTING]);
                    _this._viewUI.mapLiuLinTaoHai_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_LIULINTAOHAI]);
                    _this._viewUI.mapQiXingGuan_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_QIXINGGUAN]);
                    _this._viewUI.mapLianHuaGu_btn.on(LEvent.MOUSE_DOWN, _this, _this.mapChange, [MapInfo.MAP_LIANHUAGU]);
                    _this._viewUI.mapCloseView_btn.on(LEvent.MOUSE_DOWN, _this, _this.closeView);
                    _this._viewUI.mapQieHuan_btn.on(LEvent.MOUSE_DOWN, _this, _this.changesmallmap);
                    _this._viewUI.mapGuaJiDiTu_btn.on(LEvent.MOUSE_DOWN, _this, _this.openGuaJi);
                    _this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(app);
                    return _this;
                }
                /** 打开挂机界面 */
                MapWorldModule.prototype.openGuaJi = function () {
                    this.closeView();
                    modules.ModuleManager.show(modules.ModuleNames.GUA_JI, this._app);
                };
                /**小地图*/
                MapWorldModule.prototype.changesmallmap = function () {
                    this._smallmapUI = new game.modules.mapworld.SmallMapMediator(this._app);
                    this._smallmapUI.show();
                    this.hide();
                };
                /**初始化可用按钮*/
                MapWorldModule.prototype.initbtn = function () {
                    game.modules.mainhud.models.HudProxy.getInstance().once(game.modules.mainhud.models.GETPOST_EVENT, this, this.changepost);
                    this._viewUI.mapHuoYunZong_btn.mouseEnabled = true;
                    this._viewUI.mapJiShiZhen_btn.mouseEnabled = true;
                    this._viewUI.mapTianLeiYu_btn.mouseEnabled = true;
                    this._viewUI.mapYunXiaoDian_btn.mouseEnabled = true;
                    this._viewUI.mapWuLiangGong_btn.mouseEnabled = true;
                    this._viewUI.mapCangYuGong_btn.mouseEnabled = true;
                    this._viewUI.mapFeiXueYa_btn.mouseEnabled = true;
                    this._viewUI.mapDanYangGuan_btn.mouseEnabled = true;
                    this._viewUI.mapYouMingDian_btn.mouseEnabled = true;
                    this._viewUI.mapBaiShaXiaoZhu_btn.mouseEnabled = true;
                    this._viewUI.mapXiangSiGu_btn.mouseEnabled = true;
                    this._viewUI.mapChunQiuLin_btn.mouseEnabled = true;
                    this._viewUI.mapTaoHuaXi_btn.mouseEnabled = true;
                    this._viewUI.mapHuangYanLing_btn.mouseEnabled = true;
                    this._viewUI.mapChengNingDao_btn.mouseEnabled = true;
                    this._viewUI.mapPanLongShan_btn.mouseEnabled = true;
                    this._viewUI.mapTianZhouYiZhan_btn.mouseEnabled = true;
                    this._viewUI.mapWangFengTing_btn.mouseEnabled = true;
                    this._viewUI.mapLiuLinTaoHai_btn.mouseEnabled = true;
                    this._viewUI.mapQiXingGuan_btn.mouseEnabled = true;
                    this._viewUI.mapLianHuaGu_btn.mouseEnabled = true;
                };
                /**初始化地图图片*/
                MapWorldModule.prototype.initicon = function () {
                    this._viewUI.cangyugongicon_img.skin = "";
                    this._viewUI.feixueyaicon_img.skin = "";
                    this._viewUI.tianzhouyizhanicon_img.skin = "";
                    this._viewUI.tianleiyuicon_img.skin = "";
                    this._viewUI.chengningdaoicon_img.skin = "";
                    this._viewUI.wangfengtingicon_img.skin = "";
                    this._viewUI.liulintaohaiicon_img.skin = "";
                    this._viewUI.yunxiaodianicon_img.skin = "";
                    this._viewUI.jishizhenicon_img.skin = "";
                    this._viewUI.baishaxiaozhuicon_img.skin = "";
                    this._viewUI.youmingdianicon_img.skin = "";
                    this._viewUI.chunqiulinicon_img.skin = "";
                    this._viewUI.guajiicon_img.skin = "";
                    this._viewUI.xiangsiguicon_img.skin = "";
                    this._viewUI.taohuaxiicon_img.skin = "";
                    this._viewUI.huangyanlingicon_img.skin = "";
                    this._viewUI.huoyunzongicon_img.skin = "";
                    this._viewUI.wulianggongicon_img.skin = "";
                    this._viewUI.danyangguanicon_img.skin = "";
                    this._viewUI.lianhuaguicon_img.skin = "";
                    this._viewUI.qixingguanicon_img.skin = "";
                    this._viewUI.panlongshanicon_img.skin = "";
                };
                /**选择要跳转的地图*/
                MapWorldModule.prototype.minishow = function (sceneid) {
                    this.initbtn();
                    this.initicon();
                    switch (sceneid) { //选择跳转的场景按钮
                        case MapInfo.MAP_HUOYUNZONG: //火云宗
                            this._viewUI.mapHuoYunZong_btn.mouseEnabled = false;
                            this._viewUI.huoyunzongicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_JISHIZHEN: //济世镇
                            this._viewUI.mapJiShiZhen_btn.mouseEnabled = false;
                            this._viewUI.jishizhenicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_TIANLEIYU: //天雷狱
                            this._viewUI.mapTianLeiYu_btn.mouseEnabled = false;
                            this._viewUI.tianleiyuicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_YUNXIAODIAN: //云霄殿
                            this._viewUI.mapYunXiaoDian_btn.mouseEnabled = false;
                            this._viewUI.yunxiaodianicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_WULIANGGONG: //无量宫
                            this._viewUI.mapWuLiangGong_btn.mouseEnabled = false;
                            this._viewUI.wulianggongicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_CANGYUGONG: //苍羽宫
                            this._viewUI.mapCangYuGong_btn.mouseEnabled = false;
                            this._viewUI.cangyugongicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_FEIXUEYA: //飞雪涯
                            this._viewUI.mapFeiXueYa_btn.mouseEnabled = false;
                            this._viewUI.feixueyaicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_DANYANGGUAN: //丹阳
                            this._viewUI.mapDanYangGuan_btn.mouseEnabled = false;
                            this._viewUI.danyangguanicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_YOUMINGDIAN: //幽冥殿
                            this._viewUI.mapYouMingDian_btn.mouseEnabled = false;
                            this._viewUI.youmingdianicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_BAISHAXIAOZHU: //白沙小筑
                            this._viewUI.mapBaiShaXiaoZhu_btn.mouseEnabled = false;
                            this._viewUI.baishaxiaozhuicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_XIANGSIGU: //相思谷
                            this._viewUI.mapXiangSiGu_btn.mouseEnabled = false;
                            this._viewUI.xiangsiguicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_CHUNQIULIN: //春秋林
                            this._viewUI.mapChunQiuLin_btn.mouseEnabled = false;
                            this._viewUI.chunqiulinicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_TAOHUAXI: //桃花溪
                            this._viewUI.mapTaoHuaXi_btn.mouseEnabled = false;
                            this._viewUI.taohuaxiicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_HUANGYANLING: //黄岩岭
                            this._viewUI.mapHuangYanLing_btn.mouseEnabled = false;
                            this._viewUI.huangyanlingicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_CHENGNINGDAO: //城林道
                            this._viewUI.mapChengNingDao_btn.mouseEnabled = false;
                            this._viewUI.chengningdaoicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_PANLONGSHAN: //盘龙山
                            this._viewUI.mapPanLongShan_btn.mouseEnabled = false;
                            this._viewUI.panlongshanicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_TIANZHOUYIZHAN: //天洲驿站
                            this._viewUI.mapTianZhouYiZhan_btn.mouseEnabled = false;
                            this._viewUI.tianzhouyizhanicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_WANGFENGTING: //望峰亭
                            this._viewUI.mapWangFengTing_btn.mouseEnabled = false;
                            this._viewUI.wangfengtingicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_LIULINTAOHAI: //柳林桃海
                            this._viewUI.mapLiuLinTaoHai_btn.mouseEnabled = false;
                            this._viewUI.liulintaohaiicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_QIXINGGUAN: //七星观
                            this._viewUI.mapQiXingGuan_btn.mouseEnabled = false;
                            this._viewUI.qixingguanicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        case MapInfo.MAP_LIANHUAGU: //莲花谷
                            this._viewUI.mapLianHuaGu_btn.mouseEnabled = false;
                            this._viewUI.lianhuaguicon_img.skin = "common/icon/avatarrole/" + (game.modules.createrole.models.LoginModel.getInstance().roleDetail.shape + 30000) + ".png";
                            break;
                        default:
                            break;
                    }
                };
                /**关闭*/
                MapWorldModule.prototype.closeView = function () {
                    //关闭世界地图按钮
                    this.hide();
                };
                /**跳转地图*/
                MapWorldModule.prototype.mapChange = function (mapid) {
                    //如果有队伍切不是队长切未暂离则不可跳图
                    this.mapjump = 1;
                    var role = game.scene.models.SceneModel.getInstance().rolelist.get(game.modules.createrole.models.LoginModel.getInstance().roleDetail.roleid);
                    var team = role.rolebasicOctets.datas.get(2);
                    if (team) { //是否有队伍
                        if (team.teamindexstate > 0) { //在队伍中 暂离的话值为负数
                            if ((team.teamindexstate >> 4) != 1) { //141216
                                var chattext = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[141216];
                                this.tips.onShow(chattext.msg);
                                return;
                            }
                        }
                    }
                    this.getpost(mapid);
                    var mainUnit = this._app.sceneObjectMgr.mainUnit;
                    RequesterProtocols._instance.c2s_req_goto(mapid, parseInt(mainUnit.pos.x.toFixed(0)), parseInt(mainUnit.pos.y.toFixed(0)));
                    game.modules.autohangup.models.AutoHangUpModel.getInstance().notaketimer = 0;
                };
                /**跳转地图*/
                MapWorldModule.prototype.changepost = function (e) {
                    AutoHangUpModels.getInstance().notaketimer = 0;
                    HudModel.getInstance().taskxl = 0;
                    this._app.sceneObjectMgr.mainUnit.xunluo = 2;
                    this._app.sceneRoot.hangup = 0;
                    game.modules.mainhud.models.HudModel.getInstance().autobatt.stop();
                    if (this.mapjump == 1) { //是否挂机地图
                        game.modules.mainhud.models.HudModel.getInstance().autobatt.init();
                        this.mapjump = 0;
                    }
                    this.hide();
                };
                /**获取坐标*/
                MapWorldModule.prototype.getpost = function (mapid) {
                    var MapData = MapModel.getInstance().WorldMapConfigData[mapid];
                    var mainUnit = this._app.sceneObjectMgr.mainUnit;
                    var x, y;
                    x = (Math.random() * (MapData.bottomx - MapData.topx) + MapData.topx);
                    y = (Math.random() * (MapData.bottomy - MapData.topy) + MapData.topy);
                    mainUnit.SetPosX(x);
                    mainUnit.SetPosY(y);
                    mainUnit.SetPos(x, y);
                };
                MapWorldModule.prototype.show = function () {
                    _super.prototype.show.call(this);
                    this.minishow(game.modules.mainhud.models.HudModel.getInstance().sceneid);
                    this._app.uiRoot.closeLoadProgress();
                };
                MapWorldModule.prototype.hide = function () {
                    _super.prototype.hide.call(this);
                };
                MapWorldModule.prototype.getView = function () {
                    return this._viewUI;
                };
                return MapWorldModule;
            }(game.modules.ModuleMediator));
            mapworld.MapWorldModule = MapWorldModule;
        })(mapworld = modules.mapworld || (modules.mapworld = {}));
    })(modules = game.modules || (game.modules = {}));
})(game || (game = {}));
//# sourceMappingURL=MapWorldModule.js.map