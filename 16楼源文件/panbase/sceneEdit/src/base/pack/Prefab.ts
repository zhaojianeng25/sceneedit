module pack {
    import Material = Pan3d.me.Material
    import ObjData = Pan3d.me.ObjData
    import EventDispatcher = Pan3d.me.EventDispatcher
    export class Prefab extends EventDispatcher implements ITile{
        getName() :string{
            return "prefab"
        }
        public url: string
        public objsurl: string;
        public objData: ObjData;
        public textureurl: string;
        public material: Material;

        public version: number
 
      
    }
}