var scene2d;
(function (scene2d) {
    var me;
    (function (me) {
        var Scene2dInit = /** @class */ (function () {
            function Scene2dInit() {
            }
            Scene2dInit.initData = function () {
                //替换SceneManager场景管理对象；
                me.Override2dSceneManager.initConfig();
                //替换Engine引擎对象；
                me.Override2dEngine.initConfig();
                Pan3d.me.Scene_data.fileRoot = " http://" + document.domain + "/res/";
                Pan3d.me.Engine.init(mainpan3d_me.canvas); //初始化场景
                Pan3d.me.Engine.resetSize(mainpan3d_me.canvas.width, mainpan3d_me.canvas.height); //设置canvas大小
                Pan3d.me.Engine.initPbr();
                Scene2dInit.isConfig = true; //完成
                Pan3d.me.SceneManager.getInstance().ready = true; //场景update可以
            };
            Scene2dInit.addGridLineSprite = function () {
                Pan3d.me.ProgrmaManager.getInstance().registe(Pan3d.me.LineDisplayShader.LineShader, new Pan3d.me.LineDisplayShader);
                Pan3d.me.SceneManager.getInstance().addDisplay(new Pan3d.me.GridLineSprite());
            };
            Scene2dInit.isConfig = false;
            return Scene2dInit;
        }());
        me.Scene2dInit = Scene2dInit;
    })(me = scene2d.me || (scene2d.me = {}));
})(scene2d || (scene2d = {}));
//# sourceMappingURL=Scene2dInit.js.map