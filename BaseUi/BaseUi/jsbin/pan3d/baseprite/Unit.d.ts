declare module Pan3d.me {
    class Unit extends GuidObject {
        path: Array<Vector2D>;
        sceneChar: SceneChar;
        uintGuid: number;
        isMain: boolean;
        private originalRotation;
    }
}
