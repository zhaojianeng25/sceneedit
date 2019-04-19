
export default  class TestPage extends Laya.Box {

    private renderPic:Laya.Image
    public constructor() {

        super()

        console.log("到这里了，要就是这样子的")

        
        this.renderPic = new Laya.Image()
        this.addChild(this.renderPic)
  
 
        Laya.loader.load("res/0.png", Laya.Handler.create(this, (value: any) => {
            this.renderPic.texture = value;

        }))

    }
}
