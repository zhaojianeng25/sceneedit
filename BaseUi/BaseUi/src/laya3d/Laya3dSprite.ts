
module LayaPan3D {

    import Scene_data = Pan3d.me.Scene_data

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
            Pan3d.me.ProgrmaManager.getInstance().registe(Pan3d.me.LineDisplayShader.LineShader, new Pan3d.me.LineDisplayShader);
            this.sceneManager = new EdItorSceneManager()
            var temp: Pan3d.me.GridLineSprite = new Pan3d.me.GridLineSprite()
            this.sceneManager.addDisplay(temp)
            this.sceneManager.addDisplay(new Pan3d.me.BaseDiplay3dSprite())
            this.sceneManager.ready = true;
            this.sceneManager.cam3D = new Pan3d.me.Camera3D();
            this.sceneManager.cam3D.cavanRect = new Pan3d.me.Rectangle(0, 0, 512, 512)
            this.sceneManager.cam3D.distance = 200;
            this.sceneManager.focus3D.rotationY = random(360);
            this.sceneManager.focus3D.rotationX = -45;
    
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
            gl.enable(gl.CULL_FACE);
            gl.cullFace(this.cullFaceModel);  //正反面
              
            Scene_data.context3D.setBlendParticleFactors(-1);
            Scene_data.context3D.setDepthTest(false);
             Scene_data.context3D.cullFaceBack(true);
       
           


            Laya.BaseShader.activeShader = null;
            Laya.BaseShader.bindShader = null;
 
        }
        public upData(): void {


            if (this.sceneManager && this.parent) {
                this.saveBasePrarame();
                if (this.sceneManager.fbo && this.texture && this.texture.bitmap) {
                    (<any>this.texture.bitmap)._source = this.sceneManager.fbo.texture
                }
                this.renderToTexture();
                this.resetBasePrarame();
            }

       
    
        }
        protected renderToTexture(): void {
            this.sceneManager.renderToTexture();

        }
        protected sceneManager: EdItorSceneManager;

    }
}