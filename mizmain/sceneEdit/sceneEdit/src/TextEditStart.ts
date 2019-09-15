class TextEditStart {
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
 
        window["webgl"] = Pan3d.Scene_data.context3D.renderContext
        mars3D.MarmosetModel.getInstance().viewFileName = "karen1.mview"
   
        var rootpath: string = "6_15/";
        Pan3d.LoadManager.getInstance().load(Pan3d.Scene_data.fileuiRoot + rootpath + "outshder.txt", Pan3d.LoadManager.XML_TYPE, (outstr: any) => {
            mars3D.MarmosetModel.changerOutshader = outstr
            Pan3d.LoadManager.getInstance().load(Pan3d.Scene_data.fileuiRoot + rootpath + "vshader.txt", Pan3d.LoadManager.XML_TYPE, (vstr: any) => {
                mars3D.MarmosetModel.changerVshader = vstr
                Pan3d.LoadManager.getInstance().load(Pan3d.Scene_data.fileuiRoot + rootpath + "fshader.txt", Pan3d.LoadManager.XML_TYPE, (fstr: any) => {
                    mars3D.MarmosetModel.changerFshader = fstr

                    marmoset.embed("res/6_15/" + mars3D.MarmosetModel.getInstance().viewFileName, { width: 100, height: 100, autoStart: true, fullFrame: false, pagePreset: false });
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