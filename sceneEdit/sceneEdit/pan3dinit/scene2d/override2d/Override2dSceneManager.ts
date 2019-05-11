module scene2d.me {
    export class Override2dSceneManager extends scene3d.me.OverrideSceneManager {
        constructor() {
            super()
        }
        public static initConfig(): void {
            Pan3d.me.SceneManager._instance = new Override2dSceneManager;
        }

        public update(): void {

            Pan3d.me.MathClass.getCamView(Pan3d.me.Scene_data.cam3D, Pan3d.me.Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
            Pan3d.me.Scene_data.context3D._contextSetTest.clear();
            if (isNaN(this._time)) {
                this._time = Pan3d.me. TimeUtil.getTimer()
            }
            GroundModel.getInstance().update();
            this.updateMovieFrame();
            if (this._ready) {
                Pan3d.me. ParticleManager.getInstance().updateTime();
                Pan3d.me. SkillManager.getInstance().update();
                if (this.render) {

                    Pan3d.me.Scene_data.context3D.setWriteDepth(true);
                    Pan3d.me.Scene_data.context3D.setDepthTest(true);
                    this.updateStaticDiplay();
                    this.updateSpriteDisplay();
                    this.updateMovieDisplay();

                    Pan3d.me. Scene_data.context3D.setWriteDepth(false);
                    Pan3d.me. ParticleManager.getInstance().update();
                    Pan3d.me. BloodManager.getInstance().update();
                    Pan3d.me. Scene_data.context3D.setBlendParticleFactors(0)
                    Pan3d.me.  Scene_data.context3D.setWriteDepth(true);
                    Pan3d.me.  Scene_data.context3D.setWriteDepth(false);
                }
                Pan3d.me. Scene_data.context3D.setDepthTest(false);
                Pan3d.me. UIManager.getInstance().update();
            }

        }
    }
}