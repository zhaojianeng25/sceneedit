﻿module scenemos {
    import Scene_data = Pan3d.Scene_data;
    import LoadManager = Pan3d.LoadManager;
    import MarmosetModel = mars3D.MarmosetModel;

    export  class TextEditStart {
        public static initCanvas($caves: HTMLCanvasElement): void {
            mainpan3d_me.canvas = $caves;
            Pan3d.Scene_data.fileRoot = "res/";
            Pan3d.Engine.init($caves);

            window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
            if (requestAnimationFrame) {
                requestAnimationFrame(TextEditStart.step);
            }

            TextEditStart.resetSize();


            this.initmosort()
        }
        private static initmosort(): void {

            Pan3d.SceneManager.getInstance().addDisplay(new depth.DepthRectSprite())
            Pan3d.SceneManager.getInstance().ready = true
            mars3D.MarmosetModel.getInstance().initData();



            MarmosetModel.getInstance().viewFileName = "karen1.mview"

            var rootpath: string = "pan/marmoset/feiji/6_14/";
            LoadManager.getInstance().load(Scene_data.fileuiRoot + rootpath + "outshder.txt", LoadManager.XML_TYPE, (outstr: any) => {
                MarmosetModel.changerOutshader = outstr
                LoadManager.getInstance().load(Scene_data.fileuiRoot + rootpath + "vshader.txt", LoadManager.XML_TYPE, (vstr: any) => {
                    MarmosetModel.changerVshader = vstr
                    LoadManager.getInstance().load(Scene_data.fileuiRoot + rootpath + "fshader.txt", LoadManager.XML_TYPE, (fstr: any) => {
                        MarmosetModel.changerFshader = fstr
                        marmoset.embed("res/" + MarmosetModel.getInstance().viewFileName, { width: 500, height: 400, autoStart: true, fullFrame: false, pagePreset: false });
                    });

                });
            });


        }
        public static resetSize(): void {
            if (mainpan3d_me.canvas) {
                mainpan3d_me.canvas.width = document.body.clientWidth
                mainpan3d_me.canvas.height = document.body.clientHeight
                Pan3d.Engine.resetSize(mainpan3d_me.canvas.width, mainpan3d_me.canvas.height); //设置canvas大小
                win.LayerManager.getInstance().resize();

            }
        }
        private static step(timestamp): void {
            requestAnimationFrame(TextEditStart.step);
            TextEditStart.upFrame()
        }
        private static upFrame(): void {

            Pan3d.TimeUtil.update();
            Pan3d.Scene_data.context3D.update();

            let gl = Pan3d.Scene_data.context3D.renderContext
            gl.clearColor(255 / 255, 0, 0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
            win.LayerManager.getInstance().update();

            Pan3d.SceneManager.getInstance().update()




        }

    }
}