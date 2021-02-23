export interface Encrypter {
  async encrypt(value: string): Promise<string>
}
