module xyz {
    import BaseEvent = Pan3d.BaseEvent;
    import Vector3D = Pan3d.Vector3D;
    import Module = Pan3d.Module;
    import Processor = Pan3d.Processor;
    import BaseProcessor = Pan3d.BaseProcessor;
    import UIManager = Pan3d.UIManager;
    import SceneManager = Pan3d.SceneManager
    import BaseDiplay3dSprite = Pan3d.BaseDiplay3dSprite;
    import MouseType = Pan3d.MouseType
    import Matrix3D = Pan3d.Matrix3D
    import MathUtil = Pan3d.MathUtil
    import UICompenent = Pan3d.UICompenent

    export class MoveScaleRotatioinEvent extends BaseEvent {
        public static INIT_MOVE_SCALE_ROTATION: string = "INIT_MOVE_SCALE_ROTATION"; //显示面板
  
    }
    export class MoveScaleRotatioinModule extends Module {
        public getModuleName(): string {
            return "MoveScaleRotatioinModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new MoveScaleRotatioinProcessor()];
        }
    }

    export class MoveScaleRotatioinProcessor extends BaseProcessor {
        public getName(): string {
            return "MoveScaleRotatioinProcessor";
        }
        private moveScaleRotationLevel: MoveScaleRotationLevel
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof MoveScaleRotatioinEvent) {
                switch ($event.type) {
                    case MoveScaleRotatioinEvent.INIT_MOVE_SCALE_ROTATION:
                        this.moveScaleRotationLevel = new MoveScaleRotationLevel()
                        this.selectScene = $event.data;
                        this.selectScene.addDisplay(this.moveScaleRotationLevel);
                        this.addEvents()
                        break
                    default:
                        break;
                }
              
            }
        }
        private mouseInfo: MouseVO = new MouseVO;
        private selectScene: SceneManager

        private onMouseWheelFun: any;
        private onMouseDownFun: any;
        private onMouseMoveFun: any;
        private onMouseUpFun: any;
        private onKeyDownFun: any;
        private onKeyUpFun: any;
        private addEvents(): void {
            if (!this.onMouseWheelFun) {
                this.onMouseWheelFun = ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) };
                this.onMouseDownFun = ($evt: MouseEvent) => { this.onMouseDown($evt) };
                this.onMouseMoveFun = ($evt: MouseEvent) => { this.onMouseMove($evt) };
                this.onMouseUpFun = ($evt: MouseEvent) => { this.onMouseUp($evt) };
                this.onKeyDownFun = ($evt: KeyboardEvent) => { this.onKeyDown($evt) };
                this.onKeyUpFun = ($evt: KeyboardEvent) => { this.onKeyUp($evt) };
            }
            document.addEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
            document.addEventListener(MouseType.MouseDown, this.onMouseDownFun);
            document.addEventListener(MouseType.MouseMove, this.onMouseMoveFun);
            document.addEventListener(MouseType.MouseUp, this.onMouseUpFun);
            document.addEventListener(MouseType.KeyDown, this.onKeyDownFun)
            document.addEventListener(MouseType.KeyUp, this.onKeyUpFun)

            document.addEventListener("contextmenu", (event: any) => {
                event.preventDefault();
            });
        }
        private removeEvents(): void {
            document.removeEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
            document.removeEventListener(MouseType.MouseDown, this.onMouseDownFun);
            document.removeEventListener(MouseType.MouseMove, this.onMouseMoveFun);
            document.removeEventListener(MouseType.MouseUp, this.onMouseUpFun);
            document.removeEventListener(MouseType.KeyDown, this.onKeyDownFun)
            document.removeEventListener(MouseType.KeyUp, this.onKeyUpFun)
        }
        private onMouseMove($e: MouseEvent): void {
            switch ($e.buttons) {
                case 4:
                    var $v: Vector3D = this.mouseHitInWorld3D(new Vector2D($e.x, $e.y));
                    this.selectScene.cam3D.x = this.mouseInfo._last_rx + (this._middleMoveVe.x - $v.x);
                    this.selectScene.cam3D.y = this.mouseInfo._last_ry + (this._middleMoveVe.y - $v.y);
                    this.selectScene.cam3D.z = this.mouseInfo._last_rz + (this._middleMoveVe.z - $v.z);
                    MathUtil.MathCam(this.selectScene.cam3D)
                    break;
                case 2:
                    this.selectScene.cam3D.rotationX = this.mouseInfo.old_rotation_x - ($e.y - this.mouseInfo.last_mouse_y);
                    this.selectScene.cam3D.rotationY = this.mouseInfo.old_rotation_y - ($e.x - this.mouseInfo.last_mouse_x);
                    MathUtil.MathCam(this.selectScene.cam3D)
                    break;
                default:
                    console.log($e.buttons)
                    break;
            }
        }

        private mouseHitInWorld3D($p: Vector2D): Vector3D {

            var stageHeight: number = this.selectScene.cam3D.cavanRect.width;
            var stageWidth: number = this.selectScene.cam3D.cavanRect.height;
            var $v: Vector3D = new Vector3D();
            $v.x = $p.x - stageWidth / 2;
            $v.y = stageHeight / 2 - $p.y;
            $v.z =100 * 2;
            var $m: Matrix3D = new Matrix3D;
            console.log(this.selectScene.cam3D.rotationX)
            $m.appendRotation(- this.selectScene.cam3D.rotationX, Vector3D.X_AXIS);
            $m.appendRotation(- this.selectScene.cam3D.rotationY, Vector3D.Y_AXIS);
            return $m.transformVector($v);
        }


        private middleMovetType: boolean //是否按下中键
        private _middleMoveVe: Vector3D
        private onMouseDown($e: MouseEvent): void {
      
            this.middleMovetType = ($e.button == 1);

            this.mouseInfo.last_mouse_x = $e.x;
            this.mouseInfo.last_mouse_y = $e.y;

            this.mouseInfo._last_rx = this.selectScene.cam3D.x;
            this.mouseInfo._last_ry = this.selectScene.cam3D.y;
            this.mouseInfo._last_rz = this.selectScene.cam3D.z;

            this.mouseInfo.old_rotation_x = this.selectScene.cam3D.rotationX;
            this.mouseInfo.old_rotation_y = this.selectScene.cam3D.rotationY;

         

            switch ($e.button) {
                case 0:
                    break;
                case 1:
                    this._middleMoveVe = this.mouseHitInWorld3D(new Vector2D($e.x, $e.y));
                    break;
                default:
                    break;
            }
           
        }
        private onMouseUp($e: MouseEvent): void {
        }
        private onKeyDown($e: KeyboardEvent): void {
        }
        private onKeyUp($e: KeyboardEvent): void {
        }

        public onMouseWheel($evt: MouseWheelEvent): void {

            if ($evt.x > BaseUiStart.leftPanel.width && $evt.x < BaseUiStart.rightPanel.x) {
                var $slectUi: UICompenent = layout.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y))
                if (!$slectUi) {
                    var $p: Vector3D = this.getCamForntPos($evt.wheelDelta * 0.1)
                    this.selectScene.cam3D.x = $p.x;
                    this.selectScene.cam3D.y = $p.y;
                    this.selectScene.cam3D.z = $p.z;
 
                    MathUtil.MathCam(this.selectScene.cam3D)
                }
            }


        }
        private getCamForntPos(dis: number): Vector3D {

            var $p: Vector3D = new Vector3D(0, 0, dis);
            var $m: Matrix3D = new Matrix3D;
            $m.appendRotation(-this.selectScene.cam3D.rotationX, Vector3D.X_AXIS);
            $m.appendRotation(-this.selectScene.cam3D.rotationY, Vector3D.Y_AXIS);
            $p = $m.transformVector($p);
            $p.x = this.selectScene.cam3D.x + $p.x;
            $p.y = this.selectScene.cam3D.y + $p.y;
            $p.z = this.selectScene.cam3D.z + $p.z;
            return $p
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new MoveScaleRotatioinEvent(MoveScaleRotatioinEvent.INIT_MOVE_SCALE_ROTATION),
            ];
        }
    }
}