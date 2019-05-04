module scene3d.me {
    export class Scene3dInit {
        public static isConfig: boolean = false
        public static initData(): void {
            //替换SceneManager场景管理对象；
            OverrideSceneManager.initConfig()
            //替换Engine引擎对象；
            OverrideEngine.initConfig()
            //初始化场景
            Pan3d.me.Engine.init(mainpan3d_me.canvas)
            OverrideBloodManager.getInstance()
            Pan3d.me.Engine.resetSize(mainpan3d_me.canvas.width, mainpan3d_me.canvas.height); //设置canvas大小
            Pan3d.me.Engine.initPbr();
            Scene3dInit.isConfig = true;   //完成
            Pan3d.me.SceneManager.getInstance().ready = true; //场景update可以
        }

    }
}