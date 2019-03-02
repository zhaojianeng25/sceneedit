module pack {
    import EventDispatcher = Pan3d.EventDispatcher
    export class Prefab extends EventDispatcher implements ITile{
        getName() :string{
            return "prefab"
        }
        public objsurl: string;
        public textureurl: string


        public pic1: string = "b.jpg"
        public pic2: string = "c.png"
      
    }
}