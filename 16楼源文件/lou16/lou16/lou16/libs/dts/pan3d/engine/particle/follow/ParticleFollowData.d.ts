declare module Pan3d.me {
    class ParticleFollowData extends ParticleBallData {
        getParticle(): Display3DParticle;
        setAllByteInfo($byte: Pan3dByteArray): void;
        regShader(): void;
    }
}
