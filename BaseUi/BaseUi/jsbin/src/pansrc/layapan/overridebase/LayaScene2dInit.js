var layapan;
(function (layapan) {
    var me;
    (function (me) {
        var LayaScene2dInit = /** @class */ (function () {
            function LayaScene2dInit() {
            }
            LayaScene2dInit.initData = function () {
                if (!LayaScene2dInit.isConfig) {
                    //  Pan3d.Scene_data.fileRoot = " http://" + document.domain + "/res/";
                    //替换SceneManager场景管理对象；
                    // LayaOverride2dSceneManager.initConfig();
                    //替换Engine引擎对象；
                    me.LayaOverride2dEngine.initConfig();
                    Pan3d.me.Engine.init(mainpan3d_me.canvas); //初始化场景
                    Pan3d.me.Engine.resetSize(mainpan3d_me.canvas.width, mainpan3d_me.canvas.height); //设置canvas大小
                    Pan3d.me.Engine.initPbr();
                    Pan3d.me.Engine.initShadow();
                    LayaScene2dInit.isConfig = true; //完成
                    Pan3d.me.SceneManager.getInstance().ready = true; //场景update可以
                    this.sceneItem = new Array;
                }
            };
            LayaScene2dInit.isConfig = false;
            return LayaScene2dInit;
        }());
        me.LayaScene2dInit = LayaScene2dInit;
    })(me = layapan.me || (layapan.me = {}));
})(layapan || (layapan = {}));
//# sourceMappingURL=LayaScene2dInit.js.map