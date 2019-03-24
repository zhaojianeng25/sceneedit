module materialui {

    export class NodeTreeTime extends NodeTree {
        public speed: number = 1;
        public timeValue: Vector2D
        public constructor() {
            super();
        }
       
        public getComponentID($id: number): string {
            if ($id == 0) {
                return "time";
            }
            return null;
        }


    }
}