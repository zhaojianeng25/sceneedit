module Pan3d.me {
    export interface IBind {
        getSocket(socketName: String, resultMatrix: Matrix3D): void;
  
    }
    export  interface IMulBind {
        getMulSocket(ary: Array<Vector3D>): void;
    }

}