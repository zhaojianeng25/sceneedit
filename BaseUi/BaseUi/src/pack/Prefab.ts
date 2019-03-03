module pack {
    import Material = Pan3d.Material
    import EventDispatcher = Pan3d.EventDispatcher
    export class Prefab extends EventDispatcher implements ITile{
        getName() :string{
            return "prefab"
        }
        public objsurl: string;;
        public textureurl: string;
        public material: Material;

 
      
    }
}