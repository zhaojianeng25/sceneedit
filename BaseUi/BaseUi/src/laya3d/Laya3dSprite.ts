
module LayaPan3D {

    import Scene_data = Pan3d.me.Scene_data;
    import GlReset = Pan3d.me. GlReset;
    import LineDisplayShader = Pan3d.me.LineDisplayShader;
    import GridLineSprite = Pan3d.me.GridLineSprite;
    import ProgrmaManager = Pan3d.me.ProgrmaManager;
    import BaseDiplay3dSprite = Pan3d.me.BaseDiplay3dSprite;
    import Camera3D = Pan3d.me.Camera3D;
    import Rectangle = Pan3d.me.Rectangle;
    import FBO = Pan3d.me.FBO;

    import MaterialRoleSprite = left.MaterialRoleSprite;
    import ModelSprite = maineditor.ModelSprite;
    import SkillSpriteDisplay = maineditor.SkillSpriteDisplay;
    import LyfSpriteDisplay = maineditor.LyfSpriteDisplay;
    import EdItorSceneManager = maineditor.EdItorSceneManager;

    export class Laya3dSprite extends Laya.Image {

        public constructor(value: string, bfun: Function = null) { //"res/ui/icon/512.jpg"
            super();
            this.initScene();
            Laya.loader.load(value, Laya.Handler.create(this, (aa: Laya.Texture) => {
                this.texture = aa
                this.texture.bitmap.enableMerageInAtlas = false;
                this.texture.uv = [0, 1, 1, 1, 1, 0, 0, 0];
                this.width = this.texture.width;
                this.height = this.texture.height;
                this.resizeRect()
                bfun && bfun();
            }))
            this.frameLoop(1, this, this.upData);

        }
        public scale(scaleX: number, scaleY: number, speedMode: boolean = null): Sprite {
            var sp: Sprite = super.scale(scaleX, scaleY, speedMode)
            this.resizeRect();
            return sp;
        }
 
        private resizeRect(): void {
            if (this.texture) {
                var tw: number = this.scaleX * this.width;
                var th: number = this.scaleY * this.height;
                this.sceneManager.cam3D.cavanRect.width = tw;
                this.sceneManager.cam3D.cavanRect.height = th;
            }
        }

        protected initScene(): void {
             ProgrmaManager.getInstance().registe( LineDisplayShader.LineShader, new  LineDisplayShader);
            this.sceneManager = new EdItorSceneManager()
            var temp:  GridLineSprite = new  GridLineSprite()
            this.sceneManager.addDisplay(temp)
            this.sceneManager.addDisplay(new  BaseDiplay3dSprite())
            this.sceneManager.ready = true;
            this.sceneManager.cam3D = new  Camera3D();
            this.sceneManager.cam3D.cavanRect = new  Rectangle(0, 0, 512, 512)
            this.sceneManager.cam3D.distance = 200;
            this.sceneManager.focus3D.rotationY = random(360);
            this.sceneManager.focus3D.rotationX = -45;
 
        }
        public set bgColor(value: Vector3D) {
            if (!this.sceneManager.fbo) {
                this.sceneManager.fbo = new  FBO
            }
            this.sceneManager.fbo.color.x = value.x;
            this.sceneManager.fbo.color.y = value.y;
            this.sceneManager.fbo.color.z = value.z;
            this.sceneManager.fbo.color.w = value.w;
        }
        protected addDisplay(): void {
            let prefabSprite: ModelSprite = new ModelSprite();
            prefabSprite.setPreFabUrl("pefab/模型/球/球.prefab");
            prefabSprite.scale = 2
            prefabSprite.x=-100
            this.sceneManager.addDisplay(prefabSprite);
        }
        protected addRole(): void {
            let roleSprite = new MaterialRoleSprite();
         //   roleSprite.setRoleZwwUrl("pefab/德川家康/德川家康.zzw")
            roleSprite.setRoleZwwUrl("pefab/上杉谦信/ssqx.zzw")
           // roleSprite.setRoleZwwUrl("pefab/野猪/野猪.zzw")
            roleSprite.scale = 0.5
            roleSprite.x = 50
            this.sceneManager.addMovieDisplay(roleSprite);

        }
        //
        protected addSkillRole(): void {
            let skillsprite = new SkillSpriteDisplay();
            skillsprite.addSkillByUrl("pefab/技能/上杉谦信技能.skill")
            skillsprite.x =-30
            this.sceneManager.addDisplay(skillsprite);

        }
        private addLyfSprite(): void {
            let lyfSprite = new LyfSpriteDisplay();
            lyfSprite.addLyfByUrl("pan/model/denglong_lyf.lyf");
            lyfSprite.y = 100;
            this.sceneManager.addDisplay(lyfSprite);
        }
 
        public upData(): void {
            if (this.sceneManager && this.parent) {
                if (this.sceneManager.fbo && this.texture && this.texture.bitmap) {
                    (<any>this.texture.bitmap)._source = this.sceneManager.fbo.texture
                }
                this.renderToTexture();
                Laya.BaseShader.activeShader = null;
                Laya.BaseShader.bindShader = null;


            }
        }
        protected renderToTexture(): void {
            this.sceneManager.renderToTexture();

        }
        protected sceneManager: EdItorSceneManager;

    }
}