module layout {
    import Rectangle = Pan3d.Rectangle
    export class ResponseSprite extends Pan3d.UICompenent {

        private   _leftSp: Sprite;
        private   _rightSp: Sprite;
        private   _topSp: Sprite;
        private   _bottomSp: Sprite;
        private   _topTopSp: Sprite;
        private   _centerSp: Sprite;

        private _spWidth: number;
        private _spHeight: number;

        private widthNum: number = 30;
        private baseHeightNum: number = 20;

        public constructor() {
            super();
 

        }

        public get spWidth(): number {
            return this._spWidth;
        }

        public set spWidth(value: number) {
          this.  _spWidth = value;

    
        }

        public get spHeight(): number {
            return this._spHeight;
        }

        public set spHeight(value: number) {
            this. _spHeight = value;
 
        }

    }
}

