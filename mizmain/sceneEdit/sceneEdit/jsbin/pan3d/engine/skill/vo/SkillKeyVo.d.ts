declare module Pan3d {
    class SkillKeyVo {
        frame: number;
        url: string;
        setData($data: any): void;
    }
    class SkillShockVo {
        time: number;
        lasttime: number;
        amp: number;
        setData($data: any): void;
    }
    class SkillFixEffectKeyVo extends SkillKeyVo {
        pos: Vector3D;
        rotation: Vector3D;
        hasSocket: boolean;
        socket: string;
        setData($data: any): void;
    }
    class SkillTrajectoryTargetKeyVo extends SkillKeyVo {
        beginType: number;
        beginSocket: string;
        beginPos: Vector3D;
        hitSocket: string;
        endParticleUrl: string;
        speed: number;
        multype: number;
        setData($data: any): void;
    }
}
