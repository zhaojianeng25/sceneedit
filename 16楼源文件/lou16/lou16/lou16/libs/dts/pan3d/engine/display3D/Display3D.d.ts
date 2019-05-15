declare module Pan3d.me {
    class Display3D extends Object3D {
        objData: ObjData;
        program: WebGLProgram;
        shader: Shader3D;
        beginTime: number;
        type: number;
        protected _onStage: boolean;
        sceneVisible: boolean;
        protected _hasDestory: boolean;
        _scene: Pan3d.me.SceneManager;
        constructor();
        update(): void;
        readonly onStage: boolean;
        addStage(): void;
        removeStage(): void;
        resize(): void;
        destory(): void;
    }
}
