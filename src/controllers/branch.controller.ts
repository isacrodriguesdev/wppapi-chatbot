import GetBranchById from "@/app/usecases/GetBranchById";
import { Controller, Get, Post, Param, Body } from "@nestjs/common";

@Controller("/api/v1/branch")
export class BranchController {
  constructor(private readonly getBranchById: GetBranchById) {}

  @Get("/:id")
  async getById(@Param("id") id: string): Promise<any> {
    return await this.getBranchById.execute(id);
  }
}
