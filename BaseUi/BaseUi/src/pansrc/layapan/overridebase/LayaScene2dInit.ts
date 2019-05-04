module layapan.me {
    export class LayaScene2dInit {
        public static isConfig: boolean = false
        public static initData(): void {
            if (!LayaScene2dInit.isConfig) {
              //  Pan3d.Scene_data.fileRoot = " http://" + document.domain + "/res/";
                //替换SceneManager场景管理对象；
              // LayaOverride2dSceneManager.initConfig();
                //替换Engine引擎对象；
                LayaOverride2dEngine.initConfig();

                Pan3d.me.Engine.init(mainpan3d_me.canvas) //初始化场景
                Pan3d.me.Engine.resetSize(mainpan3d_me.canvas.width, mainpan3d_me.canvas.height); //设置canvas大小
                Pan3d.me.Engine.initPbr();
                Pan3d.me.Engine.initShadow();
                LayaScene2dInit.isConfig = true;   //完成
                Pan3d.me.SceneManager.getInstance().ready = true; //场景update可以
                this.sceneItem = new Array;
            }
          
        }
        public static sceneItem: Array<LayaOverride2dSceneManager>;


    }
}