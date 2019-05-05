declare module Pan3d.me {
    class Grid9Compenent extends UICompenent {
        ogw: number;
        ogh: number;
        gw: number;
        gh: number;
        constructor();
        pushVaData(objData: ObjData, i: number, beginIndex: number): number;
    }
}
