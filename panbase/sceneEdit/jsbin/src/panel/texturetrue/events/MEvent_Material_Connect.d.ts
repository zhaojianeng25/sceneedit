declare module materialui {
    import BaseEvent = Pan3d.me.BaseEvent;
    class MEvent_Material_Connect extends BaseEvent {
        static MEVENT_MATERIAL_CONNECT_STARTDRAG: string;
        static MEVENT_MATERIAL_CONNECT_STOPDRAG: string;
        static MEVENT_MATERIAL_CONNECT_REMOVELINE: string;
        static MEVENT_MATERIAL_CONNECT_DOUBLUELINE: string;
        itemNode: ItemMaterialUI;
        line: MaterialNodeLineUI;
        startNode: ItemMaterialUI;
        endNode: ItemMaterialUI;
    }
}
