

class Skill2dUiPanel extends Laya.Sprite {
    constructor() {
        super();
        this.ape = new BaseWinPanel()
        this.addChild(this.ape);

        var $imag: Laya.Image = new Laya.Image("res/2dbg.jpg")
        $imag.x = 20
        $imag.y = 30
        this.ape.addChild($imag);

        this.ape.pos(150, 150)

        this.layaSceneLevel = new BaseLaya3dSprite();
        this.addChild(this.layaSceneLevel)
 

        this.ape.on(Pan3d.MouseType.MouseDown, this, this.onStartDrag);
 

    }
 
    render(context: Laya.RenderContext, x: number, y: number): void {
        super.render(context, x, y)
        this.layaSceneLevel.x = this.ape.x
        this.layaSceneLevel.y = this.ape.y
        //  this.uiLayaSceneChar.set2dPos(this.ape.x + 200, this.ape.y + 200)

    }


    private ape: BaseWinPanel

    private onStartDrag(e: Event): void {
        //鼠标按下开始拖拽(设置了拖动区域和超界弹回的滑动效果)

     
        this.ape.showJumpText(this.layaSceneLevel.scene, new Pan3d.Vector3D(0, 0, 0))


    }
   

   
    private layaSceneLevel: BaseLaya3dSprite
 

}