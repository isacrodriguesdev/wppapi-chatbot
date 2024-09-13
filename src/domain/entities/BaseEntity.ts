import { v7 as randomUUID } from "uuid";
import { Buffer } from "buffer";

export class BaseEntity {
  private readonly _id: string;

  constructor(id?: string) {
    this._id = id ?? randomUUID();
  }

  public get id(): string {
    return this._id;
  }

  public static toBuffer(id: string): Buffer {
    // Remove hífens e converte para Buffer binário (16 bytes)
    return Buffer.from(id.replace(/-/g, ""), "binary");
  }

  public static fromBuffer(buffer: Buffer): string {
    // Converte Buffer binário de volta para UUID string
    const hexString = buffer.toString("binary");
    return [
      hexString.slice(0, 8),
      hexString.slice(8, 12),
      hexString.slice(12, 16),
      hexString.slice(16, 20),
      hexString.slice(20),
    ].join("-");
  }
}
