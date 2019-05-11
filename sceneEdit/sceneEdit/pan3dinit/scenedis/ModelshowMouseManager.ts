
module scenedis.me {


    export class ModelshowMouseManager {
        private static _instance: ModelshowMouseManager;
        public static getInstance(): ModelshowMouseManager {
            if (!this._instance) {
                this._instance = new ModelshowMouseManager();
            }
            return this._instance;
        }
        public constructor() {
        }
        public addMouseEvent(): void {
            if (Pan3d.me.Scene_data.isPc) {
                document.addEventListener(Pan3d.me.MouseType.MouseDown, ($evt: MouseEvent) => { this.onMouse($evt) });
                document.addEventListener(Pan3d.me.MouseType.MouseUp, ($evt: MouseEvent) => { this.onMouse($evt) });
                document.addEventListener(Pan3d.me.MouseType.MouseMove, ($evt: MouseEvent) => { this.onMouse($evt) });
                document.addEventListener(Pan3d.me.MouseType.MouseWheel, ($evt: MouseWheelEvent) => { this.onMouseWheel($evt) });
            } else {
                document.addEventListener(Pan3d.me.MouseType.TouchMove, ($evt: TouchEvent) => { this.mouseToEvent($evt) });
                document.addEventListener(Pan3d.me.MouseType.TouchEnd, ($evt: TouchEvent) => { this.mouseToEvent($evt) });
                document.addEventListener(Pan3d.me.MouseType.TouchStart, ($evt: TouchEvent) => { this.mouseToEvent($evt) });
            }

        }



        public onMouseWheel($evt: MouseWheelEvent): void {

        }
        private onMouse($e: MouseEvent): void {
            var evt: Pan3d.me.InteractiveEvent;
            var point: Pan3d.me.Vector2D = new Pan3d.me.Vector2D();
            if ($e instanceof MouseEvent) {
                if ($e.type == Pan3d.me. MouseType.MouseDown) {
                    evt = new Pan3d.me.InteractiveEvent(Pan3d.me.InteractiveEvent.Down);
                } else if ($e.type == Pan3d.me.MouseType.MouseUp) {
                    evt = new Pan3d.me.InteractiveEvent(Pan3d.me.InteractiveEvent.Up);
                } else if ($e.type == Pan3d.me.MouseType.MouseMove) {
                    evt = new Pan3d.me.InteractiveEvent(Pan3d.me.InteractiveEvent.Move);
                } else if ($e.type == Pan3d.me.MouseType.MouseClick) {

                }
                point.x = $e.pageX;
                point.y = $e.pageY;
            }
            this.makeMouseEvent(evt, point);
        }
        private mouseToEvent($touchEvent: TouchEvent): void {
            var evt: Pan3d.me.InteractiveEvent;
            var point: Pan3d.me.Vector2D = new Pan3d.me.Vector2D();
            if ($touchEvent.type == Pan3d.me.MouseType.TouchStart) {
                evt = new Pan3d.me.InteractiveEvent(Pan3d.me.InteractiveEvent.Down);
            } else if ($touchEvent.type == Pan3d.me. MouseType.TouchEnd) {
                evt = new Pan3d.me.InteractiveEvent(Pan3d.me.InteractiveEvent.Up);
                point.x = $touchEvent.changedTouches[0].pageX;
                point.y = $touchEvent.changedTouches[0].pageY;
            } else if ($touchEvent.type == Pan3d.me.MouseType.TouchMove) {
                evt = new Pan3d.me.InteractiveEvent(Pan3d.me.InteractiveEvent.Move);
            }
            if ($touchEvent.touches.length) {
                point.x = $touchEvent.touches[$touchEvent.touches.length - 1].clientX;
                point.y = $touchEvent.touches[$touchEvent.touches.length - 1].clientY;
            }
            this.makeMouseEvent(evt, point);
        }
        private makeMouseEvent(evt: Pan3d.me.InteractiveEvent, point: Pan3d.me.Vector2D): void {
            var temp: boolean = Pan3d.me.UIManager.getInstance().mouseEvetData(evt, point);

            if (!temp) {
                if (evt.type == Pan3d.me.InteractiveEvent.Up) {

                    this.clikSceneGround(point)

                }

            }

        }

        private clikSceneGround($pos: Pan3d.me.Vector2D): void {



        }
        public walkPathComplete(): void {


        }





    }

}