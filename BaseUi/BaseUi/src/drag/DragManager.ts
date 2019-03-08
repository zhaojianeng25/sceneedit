module drag {
    import UIConatiner = Pan3d.UIConatiner

    export interface IDragManager {
        doDrag(
            dragInitiator: UIConatiner,
            dragSource: DragSource,
            mouseEvent: MouseEvent
        )
    }
    export class TempDrawManager implements IDragManager {
        doDrag(dragInitiator: UIConatiner, dragSource: DragSource, mouseEvent: MouseEvent): void {
            console.log(dragInitiator, dragSource, mouseEvent);
        }
    }


    export class DragManager {
        public static NONE: string = "none";
        public static COPY: string = "copy";
        public static MOVE: string = "move";
        public static LINK: string = "link";

        private static _impl: IDragManager;

        private static get impl(): IDragManager {
            if (!this._impl) {
                this._impl = new TempDrawManager()
            }

            return this._impl;
        }
        public static doDrag(
            dragInitiator: UIConatiner,
            dragSource: DragSource,
            mouseEvent: MouseEvent,
            xOffset: Number = 0,
            yOffset: Number = 0,
            imageAlpha: Number = 0.5,
            allowMove: Boolean = true): void {
            this.impl.doDrag(dragInitiator, dragSource, mouseEvent);

            Pan3d.ModuleEventManager.dispatchEvent(new DragEvent(DragEvent.DRAG_SHOW))
        }

    }
}