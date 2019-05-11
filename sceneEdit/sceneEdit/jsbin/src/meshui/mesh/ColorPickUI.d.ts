declare module prop {
    import Vector3D = Pan3d.me.Vector3D;
    import InteractiveEvent = Pan3d.me.InteractiveEvent;
    class ColorPickUI extends TextLabelUI {
        constructor(w?: number, h?: number);
        protected initView(): void;
        private drawOutColor;
        private _vec3d;
        vec3d: Vector3D;
        protected butClik(evt: InteractiveEvent): void;
        private colorPickPanelFun;
    }
}
