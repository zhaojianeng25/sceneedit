declare module Pan3d {
    class ParticleFacetData extends ParticleData {
        _maxAnimTime: number;
        _lockx: boolean;
        _locky: boolean;
        _isCycle: boolean;
        setAllByteInfo($byte: Pan3dByteArray): void;
        getParticle(): Display3DParticle;
        uploadGpu(): void;
        private makeRectangleData;
        initVcData(): void;
        setFloat32Vec(key: string, ary: Array<number>): void;
        setFloat32Mat(key: string, ary: Float32Array): void;
        regShader(): void;
    }
}
