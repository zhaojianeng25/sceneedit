declare module mars3D {
    import TextureRes = Pan3d.TextureRes;
    class Mars3Dmesh extends marmoset.Mesh {
        tAlbedo: TextureRes;
        setAlbedoUrl(value: string): void;
        tNormal: TextureRes;
        setNormalUrl(value: string): void;
        tReflectivity: TextureRes;
        setReflectRgbAlphaUrl(rgbUrl: string, alphaUrl: string): void;
        private fromFilesMergeAlpha;
        objData: Pan3d.ObjData;
        private meshVect;
        private meshIndexFloat;
        private meshVecFloat;
        private meshUvFloat;
        private meshNrmFloat;
        private getNrmByXY;
        initdata(a: any, b: any, c: any): void;
    }
}
