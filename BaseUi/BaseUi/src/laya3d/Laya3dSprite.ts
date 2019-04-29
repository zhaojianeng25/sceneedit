
module LayaPan3D {

    import Vector2D = Pan3d.Vector2D
    import Object3D = Pan3d.Object3D
    import MathClass = Pan3d.MathClass
    import Scene_data = Pan3d.Scene_data

    import MaterialRoleSprite = left.MaterialRoleSprite;
    import ModelSprite = maineditor.ModelSprite;
    import SkillSpriteDisplay = maineditor.SkillSpriteDisplay;
    import LyfSpriteDisplay = maineditor.LyfSpriteDisplay;

    import EdItorSceneManager = maineditor.EdItorSceneManager;


    export class Laya3dSprite extends Laya.Image {

        public constructor(value: string, bfun: Function = null) { //"res/ui/icon/512.jpg"
            super();
            Laya.loader.load(value, Laya.Handler.create(this, (aa: Laya.Texture) => {
                this.texture = aa
                this.texture.bitmap.enableMerageInAtlas = false;
                this.initScene();
                this.texture.uv = [0, 1, 1, 1, 1, 0, 0, 0];
                this.width = this.texture.width;
                this.height = this.texture.height;
                bfun && bfun();
            }))

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
                this.sceneMaager.cam3D.cavanRect.width = tw;
                this.sceneMaager.cam3D.cavanRect.height = th;
            }
        }
  
        private initScene(): void {
            Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
            this.sceneMaager = new EdItorSceneManager()
            var temp: Pan3d.GridLineSprite = new Pan3d.GridLineSprite()
            this.sceneMaager.addDisplay(temp)
            this.sceneMaager.addDisplay(new Pan3d.BaseDiplay3dSprite())
            this.sceneMaager.ready = true;
            this.sceneMaager.cam3D = new Pan3d.Camera3D();
            this.sceneMaager.cam3D.cavanRect = new Pan3d.Rectangle(0, 0, 512, 512)
            this.sceneMaager.cam3D.distance = 200;
            this.sceneMaager.focus3D.rotationY = random(360);
            this.sceneMaager.focus3D.rotationX = -45;
      
            this.addSceneModel();
        }
        private addSceneModel(): void {
           // this.addDisplay();
           //  this.addRole();
           this.addSkillRole();
          //  this.addLyfSprite();
        }
        private addDisplay(): void {
            let prefabSprite: ModelSprite = new ModelSprite();
            prefabSprite.setPreFabUrl("pefab/模型/球/球.prefab");
            prefabSprite.scale = 2
            prefabSprite.x=-100
            this.sceneMaager.addDisplay(prefabSprite);
        }
        private addRole(): void {
            let roleSprite = new MaterialRoleSprite();
         //   roleSprite.setRoleZwwUrl("pefab/德川家康/德川家康.zzw")
            roleSprite.setRoleZwwUrl("pefab/上杉谦信/ssqx.zzw")
           // roleSprite.setRoleZwwUrl("pefab/野猪/野猪.zzw")
            roleSprite.scale = 0.5
            roleSprite.x = 50
            this.sceneMaager.addMovieDisplay(roleSprite);

        }
        //
        private addSkillRole(): void {
            let skillsprite = new SkillSpriteDisplay();
            skillsprite.addSkillByUrl("pefab/技能/上杉谦信技能.skill")
            skillsprite.x =-30
            this.sceneMaager.addDisplay(skillsprite);

        }
        private addLyfSprite(): void {
            let lyfSprite = new LyfSpriteDisplay();
            lyfSprite.addLyfByUrl("pan/model/denglong_lyf.lyf");
            lyfSprite.y = 100;
            this.sceneMaager.addDisplay(lyfSprite);
        }

        private saveBasePrarame(): void {
            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;
            this.arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
            this.elementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
            this.program = gl.getParameter(gl.CURRENT_PROGRAM);
 
            this.sFactor = gl.getParameter(gl.BLEND_SRC_RGB);
            this.dFactor = gl.getParameter(gl.BLEND_DST_RGB);
            this.depthWriteMask = gl.getParameter(gl.DEPTH_WRITEMASK)
            this.cullFaceModel =  gl.getParameter(gl.CULL_FACE_MODE)
        

        }
        private cullFaceModel: GLenum;
        private depthWriteMask: GLboolean;
        private sFactor: GLenum;
        private dFactor: GLenum;
        private program: WebGLProgram
        private arrayBuffer: WebGLBuffer
        private elementArrayBuffer: WebGLBuffer
        private resetBasePrarame(): void {
            var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;
            gl.useProgram(this.program) //着色器
            gl.bindBuffer(gl.ARRAY_BUFFER, this.arrayBuffer); //定点对象
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementArrayBuffer); 
            gl.blendFunc(this.sFactor, this.dFactor); //混合模式
            gl.depthMask(this.depthWriteMask); //写入深度
            gl.cullFace(this.cullFaceModel);  //正反面

            Scene_data.context3D.setBlendParticleFactors(-1);
            Scene_data.context3D.setDepthTest(true);
            Scene_data.context3D.cullFaceBack(true);

            Laya.BaseShader.activeShader = null;
            Laya.BaseShader.bindShader = null;




        }
        public upData(): void {
            if (this.sceneMaager) {
                this.saveBasePrarame();
                if (this.sceneMaager.fbo && this.texture && this.texture.bitmap) {
                    (<any>this.texture.bitmap)._source = this.sceneMaager.fbo.texture
                }

                this.renderToTexture();

                this.resetBasePrarame();
            }
        }
        protected renderToTexture(): void {
            this.sceneMaager.renderToTexture();

        }
        protected sceneMaager: EdItorSceneManager;

    }
}