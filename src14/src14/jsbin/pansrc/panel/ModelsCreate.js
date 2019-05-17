// /*
// * name;//添加模型
// */
// class ModelVo {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//     public Char: layapan.LayaSceneChar;
//     public type: number;
//     public name: string;
// }
// class ModelsCreate extends Laya.Sprite{
//   constructor() {
//         super();
//         // this.ape = new BaseWinPanel()
//         // this.addChild(this.ape);
//         //   this.ape.pos(0, 200)
//         this.layaSceneLevel = new Scene3dLaya3dSprite();
//         this.layaSceneLevel.camAotuMove = false;
//         this.layaSceneLevel.camRotationY = 45
//         this.layaSceneLevel.camDistance = 520
//         // this.ape.x = x
//         // this.ape.y = y
//         //  this.layaSceneLevel.camViewLH = 1
//         this.addChild(this.layaSceneLevel)
//         this.roleItem = new Array()
//         // 
//     }
//     private mainSceneComplete(): void {
//     }
//     private mainSceneProgress(num: number): void {
//     }
//    // private uiLayaSceneChar: layapan.LayaSceneChar
//     render(context: Laya.RenderContext, x: number, y: number): void {
//         super.render(context, x, y)
//         this.layaSceneLevel.x =  x
//         this.layaSceneLevel.y =  y
//     }
//     private ape: BaseWinPanel
//     private layaSceneLevel: Scene3dLaya3dSprite
//     private roleItem: Array<layapan.LayaSceneChar>
//     private addBaseRole($str: string = "ms_0001", $pos: Pan3d.Vector3D=null, $rotation: number=0): void {    
//         var $baseChar: layapan.LayaSceneChar = new layapan.LayaSceneChar();
//         this.layaSceneLevel.scene.addMovieDisplay($baseChar);
//         $baseChar.setRoleUrl(getRoleUrl($str));
//         if ($pos) {
//             $baseChar.px = $pos.x
//             $baseChar.py = $pos.y
//             $baseChar.pz = $pos.z 
//         }
//         if(parseInt($str)>=1010101 && parseInt($str)<=1010106){
//             $baseChar.scale =2
//         }
//         else{
//             $baseChar.scale =1.5
//         }       
//         $baseChar.rotationY = $rotation
//         this.roleItem.push($baseChar);
//     }
//      public modelcreate(id:string,x:number,y:number,z:number,pos:number):void{//宠物模型IDstring类型，xyz 坐标，宠物朝向
//         this.addBaseRole(id, new Pan3d.Vector3D(x, y, z),pos);     
//     }
//     public modeldelt():void{
//         if(this.roleItem.length!=0){
//             for (var index = 0; index < this.roleItem.length; index++) {
//                 var $char: layapan.LayaSceneChar = this.roleItem.pop()
//                 this.layaSceneLevel.scene.removeMovieDisplay($char)                
//             }            
//         }        
//     }
// }
var ModelVo = /** @class */ (function () {
    function ModelVo() {
    }
    return ModelVo;
}());
var ModelsCreate = /** @class */ (function (_super) {
    __extends(ModelsCreate, _super);
    function ModelsCreate() {
        return _super.call(this) || this;
    }
    ModelsCreate.prototype.mainSceneComplete = function () {
    };
    ModelsCreate.prototype.mainSceneProgress = function (num) {
    };
    ModelsCreate.prototype.modelcreate = function (id, x, y, z, pos) {
    };
    ModelsCreate.prototype.modeldelt = function () {
    };
    return ModelsCreate;
}(Laya.Sprite));
//# sourceMappingURL=ModelsCreate.js.map