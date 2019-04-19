

import WebGL = Laya.WebGL;


class SceneUiPanel extends Laya.Sprite {
    constructor() {

        super();
        var $imag: Laya.Image = new Laya.Image(Pan3d.Scene_data.fileRoot + "2dbg.jpg")
        $imag.x = 20
        $imag.y = 30

        this.addChild($imag)
 
    }
    

}