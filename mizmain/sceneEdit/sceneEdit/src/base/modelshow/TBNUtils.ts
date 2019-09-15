﻿import ObjData = Pan3d.ObjData;
import Vector3D = Pan3d.Vector3D;
import Vector2D = Pan3d.Vector2D;


class TBNUtils {

    public constructor() {
      
    }
    public static  processTBN(_objData: ObjData, normalV4: Boolean = false): void {

        var normals: Array<number> = _objData.normals;
        var vectices: Array<number> = _objData.vertices;
        var uvs: Array<number> = _objData.uvs;
        var indexs: Array< number> = _objData.indexs;

        var triNum: number = _objData.vertices.length / 3;
        var tangentsAry: Array<Vector3D> = new Array;
        var tangentsNumAry: Array<number> = new Array;

        var bitangentsAry: Array<Vector3D> = new Array;
        var bitangentsNumAry: Array<number> = new Array;

        for (var j: number=0; j < triNum; j++) {
            tangentsAry.push(new Vector3D);
            tangentsNumAry.push(0);

            bitangentsAry.push(new Vector3D);
            bitangentsNumAry.push(0);
        }

        var normalsAry: Array<Vector3D> = new Array;
        var normalFlag: number = normalV4 ? 4 : 3;
        for (var i: number = 0; i < normals.length; i += normalFlag) {
            var n: Vector3D = new Vector3D(normals[i], normals[i + 1], normals[i + 2]);
            normalsAry.push(n);
        }

        for (i = 0; i < indexs.length; i += 3) {
            var v0: Vector3D = new Vector3D(vectices[indexs[i] * 3], vectices[indexs[i] * 3 + 1], vectices[indexs[i] * 3 + 2]);
            var v1: Vector3D = new Vector3D(vectices[indexs[i + 1] * 3], vectices[indexs[i + 1] * 3 + 1], vectices[indexs[i + 1] * 3 + 2]);
            var v2: Vector3D = new Vector3D(vectices[indexs[i + 2] * 3], vectices[indexs[i + 2] * 3 + 1], vectices[indexs[i + 2] * 3 + 2]);
            
            var uv0: Vector2D = new Vector2D(uvs[indexs[i] * 2], uvs[indexs[i] * 2 + 1]);
            var uv1: Vector2D = new Vector2D(uvs[indexs[i + 1] * 2], uvs[indexs[i + 1] * 2 + 1]);
            var uv2: Vector2D = new Vector2D(uvs[indexs[i + 2] * 2], uvs[indexs[i + 2] * 2 + 1]);

            var deltaPos1: Vector3D = v1.subtract(v0);
            var deltaPos2: Vector3D = v2.subtract(v0);

            var deltaUV1: Vector2D = uv1.subtract(uv0);
            var deltaUV2: Vector2D = uv2.subtract(uv0);

            var r: number = 1 / (deltaUV1.x * deltaUV2.y - deltaUV1.y * deltaUV2.x);
            var pos1: Vector3D = deltaPos1.clone();
            pos1.scaleBy(deltaUV2.y);
            var pos2: Vector3D = deltaPos2.clone();
            pos2.scaleBy(deltaUV1.y);
            var tangent: Vector3D = pos1.subtract(pos2); //(deltaPos1 * deltaUV2.Y - deltaPos2 * deltaUV1.Y)*r;
            tangent.scaleBy(r);
            tangent.normalize();

            pos1 = deltaPos1.clone();
            pos1.scaleBy(deltaUV2.x);
            pos2 = deltaPos2.clone();
            pos2.scaleBy(deltaUV1.x);

            var bitangent: Vector3D = pos1.subtract(pos2);//(deltaPos2 * deltaUV1.X - deltaPos1 * deltaUV2.X)*r;
            bitangent.scaleBy(r);
            bitangent.normalize();

            tangentsAry[indexs[i]] = tangentsAry[indexs[i]].add(tangent);
            tangentsAry[indexs[i + 1]] = tangentsAry[indexs[i + 1]].add(tangent);
            tangentsAry[indexs[i + 2]] = tangentsAry[indexs[i + 2]].add(tangent);

            tangentsNumAry[indexs[i]] += 1;
            tangentsNumAry[indexs[i + 1]] += 1;
            tangentsNumAry[indexs[i + 2]] += 1;

            bitangentsAry[indexs[i]] = bitangentsAry[indexs[i]].add(bitangent);
            bitangentsAry[indexs[i + 1]] = bitangentsAry[indexs[i + 1]].add(bitangent);
            bitangentsAry[indexs[i + 2]] = bitangentsAry[indexs[i + 1]].add(bitangent);

            bitangentsNumAry[indexs[i]] += 1;
            bitangentsNumAry[indexs[i + 1]] += 1;
            bitangentsNumAry[indexs[i + 2]] += 1;

        }

        for (i = 0; i < triNum; i++) {
            tangentsAry[i].scaleBy(1 / tangentsNumAry[i]);
            bitangentsAry[i].scaleBy(1 / bitangentsNumAry[i]);
        }

        for (i = 0; i < triNum; i++) {
            n = normalsAry[i];
            var t: Vector3D = tangentsAry[i];
            var b: Vector3D = bitangentsAry[i];

            var temp: Vector3D = n.clone();
            temp.scaleBy(temp.dot(t));
            t = t.subtract(temp);
            t.normalize();

            temp = n.cross(t);
            if (temp.dot(b) < 0) {
                t.scaleBy(-1);
            }

        };

        var tangents: Array<number> = new Array;
        var bitangents: Array<number> = new Array;

        for (i = 0; i < triNum; i++) {
            tangentsAry[i].normalize();
            bitangentsAry[i].normalize();

            tangents.push(tangentsAry[i].x);
            tangents.push(tangentsAry[i].y);
            tangents.push(tangentsAry[i].z);

            bitangents.push(bitangentsAry[i].x);
            bitangents.push(bitangentsAry[i].y);
            bitangents.push(bitangentsAry[i].z);

            if (normalV4) {
                tangents.push(0);
                bitangents.push(0);
            }

        }
        _objData.tangents = tangents;
        _objData.bitangents = bitangents;

   
    }
}