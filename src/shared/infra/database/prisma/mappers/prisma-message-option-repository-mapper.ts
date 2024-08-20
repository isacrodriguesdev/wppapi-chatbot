import { MessageOption } from "src/domain/entities/message-option";

export class PrismaMessageOptionRepositoryMapper {
  static toDomain(option: any): MessageOption {
    return new MessageOption(
      {
        index: option.index,
        message: option.message,
        value: option.value,
        child: option.child,
        content: option.content,
      },
      option.id,
    );
  }
}
