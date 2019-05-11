declare module Pan3d.me {
    class SelectButton extends BaseButton {
        private _selected;
        constructor();
        selected: boolean;
        interactiveEvent(e: InteractiveEvent): boolean;
    }
}
