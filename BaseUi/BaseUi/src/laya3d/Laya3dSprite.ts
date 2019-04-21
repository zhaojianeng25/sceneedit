
class Laya3dSprite extends Laya.Image {

    public constructor(value: string) { //"res/ui/icon/512.jpg"
        super();
        Laya.loader.load(value, Laya.Handler.create(this, (aa: Laya.Texture) => {
            this.texture = aa;
            aa.bitmap.enableMerageInAtlas = false;
          //  this.texture.uv = [0, 1, 1, 1, 1, 0, 0, 0];
            this.initScene()
        }))

         
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
        this.frameLoop(1, this, () => {
            this.sceneMaagerUpData()
        })
      //  this.addDisplay()
        this.addRole()
      //  this.addSkillRole()
      //  this.addLyfSprite()
    }
    private addDisplay(): void {
        let prefabSprite: maineditor.ModelSprite = new maineditor.ModelSprite();
        prefabSprite.setPreFabUrl("pefab/模型/球/球.prefab");
        prefabSprite.scale = 2
        this.sceneMaager.addDisplay(prefabSprite);
    }
    private addRole(): void {
        let roleSprite = new left.MaterialRoleSprite();
       // roleSprite.setRoleZwwUrl("pefab/德川家康/德川家康.zzw")
        roleSprite.setRoleZwwUrl("pefab/野猪/野猪.zzw")
        roleSprite.scale = 0.5
        roleSprite.x = 60
        this.sceneMaager.addMovieDisplay(roleSprite);


    }
    //
    private addSkillRole(): void {
        let skillsprite = new maineditor.SkillSpriteDisplay();
        skillsprite.addSkillByUrl("pefab/技能/上杉谦信技能.skill")

        this.sceneMaager.addDisplay(skillsprite);

    }
    private addLyfSprite(): void {
        let lyfSprite = new maineditor.LyfSpriteDisplay();
        lyfSprite.addLyfByUrl("pan/model/denglong_lyf.lyf");
        lyfSprite.y = 60
        this.sceneMaager.addDisplay(lyfSprite);
    }

    private saveBasePrarame(): void {
        var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;
        this.arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
        this.elementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
        this.program = gl.getParameter(gl.CURRENT_PROGRAM);
    }


    private program: WebGLProgram
    private arrayBuffer: WebGLBuffer
    private elementArrayBuffer: WebGLBuffer
    private resetBasePrarame(): void {
        var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;

        if (this.arrayBuffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.arrayBuffer);
        }
        if (this.elementArrayBuffer) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementArrayBuffer);
        }
        if (this.program) {
            gl.useProgram(this.program)
        }
        Scene_data.context3D.setCullFaceModel(2);

    }
    public sceneMaagerUpData(): void {
        this.sceneMaager.focus3D.rotationY++
        Pan3d.MathClass.getCamView(this.sceneMaager.cam3D, this.sceneMaager.focus3D); //一定要角色帧渲染后再重置镜头矩阵


        this.saveBasePrarame();
        var gl: WebGLRenderingContext = Scene_data.context3D.renderContext;
        if (this.sceneMaager.fbo) {
            this.sceneMaager.fbo.texture = this.texture.source;
        }
        this.sceneMaager.renderToTexture();


        this.resetBasePrarame();

        Laya.BaseShader.activeShader = null
        Laya.BaseShader.bindShader = null
    }

    private sceneMaager: EdItorSceneManager

}