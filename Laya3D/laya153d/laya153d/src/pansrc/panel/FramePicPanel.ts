 
import CombineParticle = Pan3d.CombineParticle
 


class CopyBaseLaya3dSprite extends Game2dChar {
    public get lifenum(): number {
        return this._lifenum
    }
    private _lifenum: number
    public set lifenum(value: number) {
        if (this._lifenum) {
            if (this._lifenum > value) {
                this._bloodMidNum = (this._lifenum - value) / 100
                TweenLite.to(this, 0.5, { bloodMidNum: 0 })
                this._charBloodVo.num = value
            } else {
                this.bloodNum = this._lifenum

                this._bloodMidNum = (value - this._lifenum) / 100
                TweenLite.to(this, 0.5, { bloodMidNum: 0 })

                TweenLite.to(this, 0.5, { bloodNum: value })
            }
        } else {
            if (this._charBloodVo) {
                this._charBloodVo.num = value
                this._charBloodVo.midNum = 0
            }

        }
        this._lifenum = value
    }
    private _bloodNum: number = 0
    public set bloodNum(value: number) {
        this._bloodNum = value
        if (this._charBloodVo) {
            this._charBloodVo.num = value
        }

    }
    public get bloodNum(): number {
        return this._bloodNum
    }

    private _bloodMidNum: number = 0
    public set bloodMidNum(value: number) {
        this._bloodMidNum = value
        this._charBloodVo.midNum = value
        this._charBloodVo.visibleChange = true
    }
    public get bloodMidNum(): number {
        return this._bloodMidNum
    }
}
class FramePicPanel extends Laya.Sprite {
    constructor() {
        super();
        this.ape = new BaseWinPanel()
        this.addChild(this.ape);
        var $imag: Laya.Image = new Laya.Image(Pan3d.Scene_data.fileRoot + "2dbg.jpg")
        $imag.x = 20
        $imag.y = 30
        this.ape.addChild($imag);

        this.ape.pos(100, 100)

        this.layaSceneLevel = new BaseLaya3dSprite();
        this.addChild(this.layaSceneLevel)
        this.uiLayaSceneChar = this.addModelChar();

        var ddd: CopyBaseLaya3dSprite = this.addModelChar();
        ddd.set2dPos(330, 220);  //坐标


        //  this.uiLayaSceneChar.addPartToPos("name_0", getModelUrl("buff_lyf"), new Pan3d.Vector3D(0, -30, 0))
        // this.uiLayaSceneChar.addPartToPos("name_1", getModelUrl("npcxuanzhon_lyf"), new Pan3d.Vector3D(0, 0, 0))

        this.ape.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);



    }

    private isShowBase: boolean
    private addFramePartice(): void {
        var eee: any = {};
     //   eee.timeLen = 3000; // 总时间 ;
     //   eee.loop = true;   //是否循环;
        eee.frameScale = 0.2   //整体缩放比例;
        eee.isShow = true    //是否为最上层显示;

        var pathname: string = getUrlParam("path")
        var effictname: string = getUrlParam("name")

        if (!getUrlParam("path")) {
            window.location.href = "index.html?path=atlas&name=10101_1&timeLen=1000&loop=true&frameScale=1&x=100&y=100" 
        }
        var timeLen: string = getUrlParam("timeLen")
        var loop: string = getUrlParam("loop")
        var frameScale: string = getUrlParam("frameScale")

        var info: any = {}
        if (getUrlParam("timeLen")) {
            info.timeLen = Number(getUrlParam("timeLen"))
        }
        if (getUrlParam("loop")) {
            info.loop = getUrlParam("loop")=="true"
        }
        if (getUrlParam("frameScale")) {
            info.frameScale = Number(getUrlParam("frameScale"))
        }
        info.loop = false

        info.isShow = this.isShowBase
        this.isShowBase = !this.isShowBase;
        console.log(this.isShowBase)

      //  var combineParticle: CombineParticle = layapan.Frame3DAtlasParticle.getFrameParticle(Scene_data.fileRoot + "atlas/", "10101_1", eee)
        var combineParticle: CombineParticle = layapan.Frame3DAtlasParticle.getFrameParticle(Scene_data.fileRoot + pathname + "/", effictname, info)
  
        this.layaSceneLevel.scene.particleManager.addParticle(combineParticle);

        var povsto: Pan3d.Vector2D = new Pan3d.Vector2D(100, 200)
        if (getUrlParam("x")) {
            povsto.x += Number(getUrlParam("x"))
        }
        if (getUrlParam("y")) {
            povsto.y += Number(getUrlParam("y"))
        }
        var povsto: Pan3d.Vector2D = new Pan3d.Vector2D(0, 0)
        var $nScale: number = 0.25 / scene2d.Override2dEngine.htmlScale
        var $tx: number = povsto.x * $nScale;
        var $tz: number = povsto.y * $nScale / (Math.sin(45 * Math.PI / 180)) * -1;

   

        combineParticle.x = $tx;
        combineParticle.y = 0;
        combineParticle.z = $tz;
     

    }
    private uiLayaSceneChar: CopyBaseLaya3dSprite

    public render(context: Laya.RenderContext, x: number, y: number): void {
        super.render(context, x, y)
        this.layaSceneLevel.x = this.ape.x
        this.layaSceneLevel.y = this.ape.y
    }


    private ape: BaseWinPanel
    private skilnum: number = 0
    private onStartDrag(e: Event): void {
        /*
        if (this.uiLayaSceneChar.curentAction == Pan3d.CharAction.WALK || this.uiLayaSceneChar.curentAction == Pan3d.CharAction.WALK_MOUNT) {
            this.uiLayaSceneChar.play(Pan3d.CharAction.STANAD)
        } else {
            this.uiLayaSceneChar.play(Pan3d.CharAction.WALK)
        }
        */

        // this.uiLayaSceneChar.lifenum = random(100)
        //  this.uiLayaSceneChar.lifenum =80

        /*
        this.skilnum++

        switch (this.skilnum) {
            case 1:
                // this.uiLayaSceneChar.addPart(Pan3d.SceneChar.NONE_SLOT, Pan3d.SceneChar.NONE_SLOT, getModelUrl("buff_lyf"))
                this.uiLayaSceneChar.removePart("name_0")
                break
            case 2:
                this.uiLayaSceneChar.removePart("name_1")
                break
            case 3:
                //   this.uiLayaSceneChar.addPart(Pan3d.SceneChar.NONE_SLOT, Pan3d.SceneChar.NONE_SLOT, getModelUrl("buff_lyf"))
                break

        }
        console.log(this.skilnum)
        */

        this.addFramePartice()
    }


    private layaSceneLevel: BaseLaya3dSprite
    private addModelChar(): CopyBaseLaya3dSprite {
        var $baseChar: CopyBaseLaya3dSprite = new CopyBaseLaya3dSprite();


        this.layaSceneLevel.scene.addMovieDisplay($baseChar);
        $baseChar.setRoleUrl(getRoleUrl("100110"));
        //   $baseChar.alpha = 0.5
        //   $baseChar.changeColor = [1, 0, 1, 1]


        //$baseChar.setMount("4104");
        //$baseChar.setWing("902");
        //$baseChar.setWeaponByAvatar(50011);
        //$baseChar.play(Pan3d.CharAction.STAND_MOUNT);
        $baseChar.forceRotationY = 145
        $baseChar.set2dPos(400, 200);  //坐标
        return $baseChar
    }

}