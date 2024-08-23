import { uuidv7 as randomUUID } from "uuidv7";
import { Buffer } from "buffer";

export abstract class BaseEntity {
  private readonly _id: string;

  constructor(id?: string) {
    this._id = id ?? randomUUID();
  }

  public get id(): string {
    return this._id;
  }

  public static toBuffer(id: string): Buffer {
    return Buffer.from(id.replace(/-/g, ""), "hex");
  }

  public static fromBuffer(buffer: Buffer): string {
    const hex = buffer.toString("hex");
    return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join("-");
  }
}
