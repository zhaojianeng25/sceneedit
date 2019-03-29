module maineditor {


    export class LyfSpriteDisplay extends Pan3d.Display3D {
        public constructor() {
            super()
            this.waitLoadUrl=[]
        }
        private waitLoadUrl: Array<string>;

        public addLyfByUrl($url: string): void {
            if (this._scene) {
                this.loadTempByUrl($url)
            } else {
                this.waitLoadUrl.push($url);
            }
        }
        public addStage(): void {
            super.addStage()
            while (this.waitLoadUrl.length) {
                this.loadTempByUrl(this.waitLoadUrl.pop());
            }
        }
        private loadTempByUrl(value: string): void {

            var scene: EdItorSceneManager = <EdItorSceneManager>this._scene;
            scene.groupDataManager.scene = scene;
            scene.groupDataManager.getGroupData(Pan3d.Scene_data.fileRoot + value, (groupRes: Pan3d.GroupRes) => {
                for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                    var item: Pan3d.GroupItem = groupRes.dataAry[i];
                    if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle: Pan3d.CombineParticle = scene.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + item.particleUrl);
                        scene.particleManager.addParticle($particle);
                    } else {
                        console.log("播放的不是单纯特效");
                    }
                }
            })
        }


    }
}