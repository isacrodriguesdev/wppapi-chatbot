import { PhoneNumberHelper } from "@/interfaces/PhoneNumberHelper";

export class PhoneNumberBRHelper implements PhoneNumberHelper {
  // Método para formatar o número
  public format(phone: string): string {
    // Remover caracteres não numéricos
    let cleanPhone = phone.replace(/\D/g, "");
    // Remover o 9 do início se tiver 11 dígitos
    if (cleanPhone.length === 11 && cleanPhone[2] === "9") {
      cleanPhone = cleanPhone.substring(0, 2) + cleanPhone.substring(3);
    }
    // Adicionar o código do Brasil (+55) se não tiver
    if (cleanPhone.length === 10) {
      cleanPhone = "55" + cleanPhone;
    }

    return cleanPhone;
  }

  // Método para validar o número
  public validate(phone: string): boolean {
    // Remover caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, "");
    // O número deve ter pelo menos 10 dígitos (com DDD)
    if (cleanPhone.length !== 10 && cleanPhone.length !== 11) {
      return false;
    }
    // Verificar se tem um DDD válido (2 primeiros dígitos) e se é um número formatável
    const ddd = cleanPhone.substring(0, 2);
    if (!/^[1-9]{2}$/.test(ddd)) {
      return false;
    }
    // Se passar por todas as verificações, o número é válido
    return true;
  }
}
