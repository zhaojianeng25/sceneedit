﻿module Pan3d.me {
    export class Button extends BaseButton {

        public interactiveEvent(e: InteractiveEvent): boolean {
            //if (e.type == InteractiveEvent.Down) {
            //    if (this.testPoint(e.x, e.y)) {
            //        this._state = 1;
            //    }
            //} else if (e.type == InteractiveEvent.Up){
            //    if (this.testPoint(e.x, e.y)) {
            //        this._state = 0;
            //    }
            //}

            return super.interactiveEvent(e);
        }



    }
}