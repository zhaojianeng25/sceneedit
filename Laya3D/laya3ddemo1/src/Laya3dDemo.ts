



import Sprite = Laya.Sprite
import { Pan4D } from "./a/PanBaseC";
 

export default class Laya3dDemo extends Laya.Box {

    private bg: Laya.Sprite
    private renderPic: Laya.Image;
    public constructor() {
        super();

        this.bg = new Laya.Sprite()
        this.bg.graphics.drawRect(0, 0, 500, 500, "#FFFFFF", "#00FF00", 2);

        this.addChild(this.bg)




        this.renderPic = new Laya.Image()
        this.addChild(this.renderPic)


        new Pan4D.PanBaseC



        Laya.loader.load("res/img_zjh_02.png", Laya.Handler.create(this, (value: any) => {
            this.renderPic.texture = value;

        }))



        Laya.timer.frameLoop(1, this, () => {

            this.upData()
        })


    }
    public loadTest(): void  {


    }

    public upData(): void {
        //console.log(this.renderPic.texture)
    }

}