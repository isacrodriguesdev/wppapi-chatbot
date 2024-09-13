export abstract class PhoneNumberHelper {
  abstract format(phone: string): string;
  abstract validate(phone: string): boolean;
}
