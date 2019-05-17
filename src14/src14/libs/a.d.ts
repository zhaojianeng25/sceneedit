declare class GameConf {
    // 游戏代码包
    game_data: string;
    // 适配服
    ws1: string;
    // 战斗服
    ws2: string;
    // 渠道id
    cid: string;
    // 平台id
    pid: string;
    // 游戏id
    gid: string;
    // 素材版本信息文件
    vesionFileUrl: string;
    // 素材默认版本号
    defaultVesion: string;

    PRIVATE_OPENID: string;
}

declare class GameApi {
    
}

declare namespace Zlib {
    export class Inflate {
        constructor(data?: Uint8Array);
        decompress(): Uint8Array;
    }

    export class Deflate {
        constructor(data?: Uint8Array);
        compress(): Uint8Array;
    }
}