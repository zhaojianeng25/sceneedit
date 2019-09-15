var TextEditStart = /** @class */ (function () {
    function TextEditStart() {
    }
    TextEditStart.initCanvas = function ($caves) {
        mainpan3d_me.canvas = $caves;
        Pan3d.Scene_data.fileRoot = "res/";
        Pan3d.Engine.init($caves);
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
        if (requestAnimationFrame) {
            requestAnimationFrame(TextEditStart.step);
        }
        TextEditStart.resetSize();
        this.initmosort();
    };
    TextEditStart.initmosort = function () {
        Pan3d.SceneManager.getInstance().addDisplay(new depth.DepthRectSprite());
        Pan3d.SceneManager.getInstance().ready = true;
        mars3D.MarmosetModel.getInstance().initData();
        window["webgl"] = Pan3d.Scene_data.context3D.renderContext;
        mars3D.MarmosetModel.getInstance().viewFileName = "karen1.mview";
        var rootpath = "6_15/";
        Pan3d.LoadManager.getInstance().load(Pan3d.Scene_data.fileuiRoot + rootpath + "outshder.txt", Pan3d.LoadManager.XML_TYPE, function (outstr) {
            mars3D.MarmosetModel.changerOutshader = outstr;
            Pan3d.LoadManager.getInstance().load(Pan3d.Scene_data.fileuiRoot + rootpath + "vshader.txt", Pan3d.LoadManager.XML_TYPE, function (vstr) {
                mars3D.MarmosetModel.changerVshader = vstr;
                Pan3d.LoadManager.getInstance().load(Pan3d.Scene_data.fileuiRoot + rootpath + "fshader.txt", Pan3d.LoadManager.XML_TYPE, function (fstr) {
                    mars3D.MarmosetModel.changerFshader = fstr;
                    marmoset.embed("res/6_15/" + mars3D.MarmosetModel.getInstance().viewFileName, { width: 100, height: 100, autoStart: true, fullFrame: false, pagePreset: false });
                });
            });
        });
    };
    TextEditStart.resetSize = function () {
        if (mainpan3d_me.canvas) {
            mainpan3d_me.canvas.width = document.body.clientWidth;
            mainpan3d_me.canvas.height = document.body.clientHeight;
            Pan3d.Engine.resetSize(mainpan3d_me.canvas.width, mainpan3d_me.canvas.height); //设置canvas大小
            win.LayerManager.getInstance().resize();
        }
    };
    TextEditStart.step = function (timestamp) {
        requestAnimationFrame(TextEditStart.step);
        TextEditStart.upFrame();
    };
    TextEditStart.upFrame = function () {
        Pan3d.TimeUtil.update();
        Pan3d.Scene_data.context3D.update();
        var gl = Pan3d.Scene_data.context3D.renderContext;
        gl.clearColor(255 / 255, 0, 0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        win.LayerManager.getInstance().update();
        Pan3d.SceneManager.getInstance().update();
    };
    return TextEditStart;
}());
//# sourceMappingURL=TextEditStart.js.map