var scene3d;
(function (scene3d) {
    var me;
    (function (me) {
        var Scene3dInit = /** @class */ (function () {
            function Scene3dInit() {
            }
            Scene3dInit.initData = function () {
                //替换SceneManager场景管理对象；
                me.OverrideSceneManager.initConfig();
                //替换Engine引擎对象；
                me.OverrideEngine.initConfig();
                //初始化场景
                Pan3d.me.Engine.init(mainpan3d_me.canvas);
                me.OverrideBloodManager.getInstance();
                Pan3d.me.Engine.resetSize(mainpan3d_me.canvas.width, mainpan3d_me.canvas.height); //设置canvas大小
                Pan3d.me.Engine.initPbr();
                Scene3dInit.isConfig = true; //完成
                Pan3d.me.SceneManager.getInstance().ready = true; //场景update可以
            };
            Scene3dInit.isConfig = false;
            return Scene3dInit;
        }());
        me.Scene3dInit = Scene3dInit;
    })(me = scene3d.me || (scene3d.me = {}));
})(scene3d || (scene3d = {}));
//# sourceMappingURL=Scene3dInit.js.map