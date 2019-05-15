declare module Pan3d.me {
    class DynamicConstItem extends DynamicBaseConstItem {
        curve: Curve;
        update(t?: number): void;
        type: number;
    }
}
