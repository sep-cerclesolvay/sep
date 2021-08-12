export class Base58 {
  alphabet: string;
  base: number;

  constructor(alpha?: string) {
    this.alphabet = alpha || '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
    this.base = this.alphabet.length;
  }

  encode(enc: number): string {
    let encoded = '';
    while (enc) {
      const remainder = enc % this.base;
      enc = Math.floor(enc / this.base);
      encoded = this.alphabet[remainder].toString() + encoded;
    }
    return encoded;
  }

  decode(dec: string): number {
    let decoded = 0;
    while (dec) {
      const alphabetPosition = this.alphabet.indexOf(dec[0]);
      if (alphabetPosition < 0) throw `"decode" can't find "${dec[0]}" in the alphabet: "${this.alphabet}"`;
      const powerOf = dec.length - 1;
      decoded += alphabetPosition * Math.pow(this.base, powerOf);
      dec = dec.substring(1);
    }
    return decoded;
  }
}
