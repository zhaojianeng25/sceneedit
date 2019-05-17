/**
* 剧情基类
*/
var game;
(function (game) {
    var story;
    (function (story) {
        var Base = /** @class */ (function () {
            function Base(app) {
                //有自己的视野显示规则
                this.haveSelfLookRule = false;
                //是否需要劫持摄像头
                this.needJieChiCamer = false;
                this._app = app;
            }
            Object.defineProperty(Base.prototype, "followUnit", {
                //获取跟随对象
                get: function () {
                    return this.needJieChiCamer ? this._mainFakeUnit : null;
                },
                enumerable: true,
                configurable: true
            });
            Base.prototype.lookIn = function (obj) {
                return false;
            };
            // 初始化
            Base.prototype.init = function () {
                this.addListener = true;
            };
            //剧情3D场景加载完成
            Base.prototype.onCompleteScene3D = function () {
            };
            Object.defineProperty(Base.prototype, "isSceneMove", {
                //移动场景
                get: function () {
                    return false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Base.prototype, "addListener", {
                /**
                 * 添加事件侦听(子类重写方法添加各类监听)
                 * 剧情初始化，清理函数会处理监听的开启和关闭
                 */
                set: function (isAdd) {
                },
                enumerable: true,
                configurable: true
            });
            // 心跳
            Base.prototype.update = function (diff) {
            };
            //点击地面
            Base.prototype.onSceneTouch = function (cellx, celly, hitObject) {
                return false;
            };
            //释放技能
            Base.prototype.castSpell = function (castr, spellId, isTrajectory, target) {
                if (isTrajectory === void 0) { isTrajectory = false; }
                if (target === void 0) { target = null; }
                this._app.sceneRoot.onSpellCast(castr, spellId, isTrajectory, target);
            };
            //显示特效
            Base.prototype.showEffect = function (target, name, x, y, z) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                this._app.sceneRoot.showEffect(target, name, x, y, z);
            };
            //显示特效(主要用于图集资源的特效，目前是技能使用)
            Base.prototype.showFrameEffect = function (target, name, info, x, y, z) {
                if (info === void 0) { info = null; }
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                this._app.sceneRoot.showFrameEffect(target, name, info, x, y, z);
            };
            //清理特效
            Base.prototype.clearEffect = function (target, name) {
                this._app.sceneRoot.clearEffect(target, name);
            };
            //创建战斗飘字信息
            Base.prototype.createdFightxt = function (target, type, data, isbottom) {
                if (isbottom === void 0) { isbottom = false; }
                this._app.sceneRoot.createdFightxt(target, type, data, isbottom);
            };
            // 执行模拟移动
            Base.prototype.doImitateMove = function (target, x, y, type, totalTime, delay) {
                if (delay === void 0) { delay = 0; }
                this._app.sceneRoot.doImitateMove(target, x, y, type, totalTime, delay);
            };
            /**
             * 战斗场景动作
             * @param atnStus 动作枚举
             * @param completeState 动作完成状态:0 循环,1 最后一幀,2 默认动作
             */
            Base.prototype.battleAction = function (target, atnStus, completeState) {
                if (completeState === void 0) { completeState = 2; }
                this._app.sceneRoot.battleAction(target, atnStus, null, completeState);
            };
            //显隐战斗黑底
            Base.prototype.showBack = function (isShow) {
                this._app.sceneRoot.showBack(isShow);
            };
            // 清理
            Base.prototype.clear = function () {
                this.addListener = false;
            };
            return Base;
        }());
        story.Base = Base;
    })(story = game.story || (game.story = {}));
})(game || (game = {}));
//# sourceMappingURL=Base.js.map