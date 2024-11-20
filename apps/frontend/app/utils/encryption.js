import Cryptr from "cryptr";

export function encrypt(text) {
  const secretKey = 'F6AM7R/6QDPm6UHYCMZL1ttPnmV2IHFP95wGF2OWKL4';
  const cryptr = new Cryptr(secretKey);

  const encryptedString = cryptr.encrypt(text);
  return encryptedString; 
}

export function decrypt(encryptedString) {
    const secretKey =  'F6AM7R/6QDPm6UHYCMZL1ttPnmV2IHFP95wGF2OWKL4';
    const cryptr = new Cryptr(secretKey);
  
    const text = cryptr.decrypt(encryptedString);
    return text;
  }