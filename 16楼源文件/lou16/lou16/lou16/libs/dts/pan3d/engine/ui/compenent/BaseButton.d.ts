declare module Pan3d.me {
    class BaseButton extends UICompenent {
        trDown: Rectangle;
        protected _state: number;
        protected _currentState: number;
        constructor();
        update(): void;
        applyRenderSize(): void;
    }
}
