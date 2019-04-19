 
import ParticleManager = Pan3d.ParticleManager
import Display3DParticle = Pan3d.Display3DParticle
import Shader3D = Pan3d.Shader3D
import ObjData = Pan3d.ObjData
import UIManager = Pan3d.UIManager
import TextureManager = Pan3d.TextureManager
import Scene_data = Pan3d.Scene_data
import MeshData = Pan3d.MeshData
import Matrix3D = Pan3d.Matrix3D
import TextureRes = Pan3d.TextureRes
import Vector3D = Pan3d.Vector3D
class Game2dZipChar extends Game2dChar {
    constructor() {
        super();
    }
    public update(): void {
        super.update();

    }
    public setVcMatrix($mesh: MeshData): void {
        var m: Matrix3D = Scene_data.vpMatrix.clone()
        
        Scene_data.context3D.setVpMatrix($mesh.material.shader, m.m);

        // m.appendScale(0.2, 0.2, 0.2)
        Scene_data.context3D.setVcMatrix4fv($mesh.material.shader, "posMatrix3D", this.posMatrix.m);
         
    }
    public updateMatrix(): void {
        this.posMatrix.identity();
 
        this.posMatrix.appendScale(this._scaleX, this._scaleY, this._scaleZ);
        this.posMatrix.appendRotation(this._rotationY, Vector3D.Y_AXIS)
        this.posMatrix.appendRotation(30, Vector3D.X_AXIS)
      //  this.posMatrix.appendScale(1, 1,0.2)
        this.posMatrix.appendTranslation(this._x, this._y, this._z);
  
    }
}

class WillDeletePanel extends Laya.Sprite {
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
        this.uiLayaSceneChar.rotationY = 145
        var ddd: Game2dZipChar = this.addModelChar();
        ddd.set2dPos(330, 215);  //坐标
        ddd.rotationY=145


        //  this.uiLayaSceneChar.addPartToPos("name_0", getModelUrl("buff_lyf"), new Pan3d.Vector3D(0, -30, 0))
        // this.uiLayaSceneChar.addPartToPos("name_1", getModelUrl("npcxuanzhon_lyf"), new Pan3d.Vector3D(0, 0, 0))

        this.ape.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);


        Pan3d.TimeUtil.addFrameTick(() => {

            if (this.isCanMove) {
                this.uiLayaSceneChar.rotationY += 1
            }
    
        })

    }
    private isCanMove: boolean
    private uiLayaSceneChar: Game2dZipChar;
 

    public render(context: Laya.RenderContext, x: number, y: number): void {
        super.render(context, x, y)
        this.layaSceneLevel.x = this.ape.x
        this.layaSceneLevel.y = this.ape.y
    }


    private ape: BaseWinPanel
    private skilnum: number = 0
    private onStartDrag(e: Event): void {
        this.isCanMove = !this.isCanMove
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

        //this.layaSceneLevel.scene.layaForntPanel.drawDemo(new Pan3d.Vector2D(Laya.stage.mouseX * scene2d.Override2dEngine.htmlScale, Laya.stage.mouseY * scene2d.Override2dEngine.htmlScale))

        var dd: topfront.DynamicTextMeshVo = this.layaSceneLevel.scene.layaForntPanel.drawDynamicTextDemo()
        dd.showTime = 1000;
        dd.pos.x = random(600)
        dd.pos.y = random(600)
        dd.alpha = Math.random() 
        
    }


    private layaSceneLevel: BaseLaya3dSprite
    private addModelChar(): Game2dZipChar {
        var $baseChar: Game2dZipChar = new Game2dZipChar();


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