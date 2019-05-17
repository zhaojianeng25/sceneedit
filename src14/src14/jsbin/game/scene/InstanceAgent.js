/**
* 副本代理
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var InstanceAgent = /** @class */ (function () {
            function InstanceAgent(app) {
                //是否开始了
                this._isStart = false;
                //锁妖塔是否已发起挑战了
                this._isSendTiaoZhanEquip = false;
                //有假对象
                this._haveFakeUnit = false;
                this._app = app;
            }
            //初始
            InstanceAgent.prototype.init = function () {
                var mapinfo = this._app.sceneObjectMgr.mapInfo;
                if (!mapinfo)
                    return;
                this._isStart = false;
                this._isSendTiaoZhanEquip = false;
                //主玩家对象
                if (!this._app.sceneObjectMgr.mainUnit) {
                    this._app.sceneObjectMgr.on(SceneObjectMgr.MAINUNIT_UPDATE, this, this.onMainUnitUpdate);
                }
                else {
                    this.onMainUnitUpdate();
                }
                //地图对象
                mapinfo.AddListen(MapInfo.MAP_INT_MAP_BYTE, this, this.onUpdateState);
                this.onUpdateState();
            };
            // 主玩家unit对象有更新
            InstanceAgent.prototype.onMainUnitUpdate = function () {
                this._app.sceneObjectMgr.off(SceneObjectMgr.MAINUNIT_UPDATE, this, this.onMainUnitUpdate);
            };
            //更新状态
            InstanceAgent.prototype.onUpdateState = function () {
                var mapinfo = this._app.sceneObjectMgr.mapInfo;
                if (!mapinfo)
                    return;
                var aCotrller = this._app.aCotrller;
                var map_status = mapinfo.GetMapState();
                var mainUnit = this._app.sceneObjectMgr.mainUnit;
                // logd("地图状态",mapid,map_status);
            };
            //挂机处理
            InstanceAgent.prototype.onStartGuaJi = function () {
                var controler = this._app.aCotrller;
                if (controler.curBehaviorState != game.cotrl.ACotrller.BEHAVIOR_STATE_HANGUP) {
                    console.log("人物停止8");
                    controler.pluginsStart();
                }
            };
            InstanceAgent.prototype.onStopGuaJi = function () {
                var controler = this._app.aCotrller;
                if (controler.curBehaviorState == game.cotrl.ACotrller.BEHAVIOR_STATE_HANGUP)
                    controler.pluginsStop();
            };
            //退出
            InstanceAgent.prototype.instanceExit = function () {
                this._app.aCotrller.instanceExit();
            };
            //触发退出监听
            InstanceAgent.prototype.eventInstanceExit = function () {
                this._app.aCotrller.doInstanceExitEvent();
            };
            //清理
            InstanceAgent.prototype.clear = function () {
                Laya.timer.clearAll(this);
                //清理假对象
                if (this._haveFakeUnit) {
                    this._app.sceneObjectMgr.clearFakeObject();
                    this._fakeUnitList = null;
                }
                this._isStart = false;
                var mapinfo = this._app.sceneObjectMgr.mapInfo;
                if (mapinfo)
                    mapinfo.removeListene(MapInfo.MAP_INT_MAP_BYTE, this, this.onUpdateState);
            };
            return InstanceAgent;
        }());
        scene.InstanceAgent = InstanceAgent;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=InstanceAgent.js.map