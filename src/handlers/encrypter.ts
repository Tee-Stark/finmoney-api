/* eslint-disable @typescript-eslint/no-var-requires */
import { Encoding } from 'crypto';
import { FLW_ENC_KEY } from '../config/constants';
const forge = require('node-forge');

export const encryptPayload = (payload: any) => {
  const text: string = JSON.stringify(payload);

  console.log(process.env.PORT);
  const cipher = forge.cipher.createCipher('3DES-ECB', forge.util.createBuffer(FLW_ENC_KEY));

  console.log(FLW_ENC_KEY);
  cipher.start({ iv: '' });
  const encodeType: Encoding = 'base64';

  cipher.update(forge.util.createBuffer(text, encodeType));
  cipher.finish();
  const encrypted = cipher.output;

  return forge.util.encode64(encrypted.getBytes());
};

const pl: any = {
  name: 'ade',
  pass: 'weekman',
  lan: 'lamaolam',
  men: 'qwrwererr',
  women: 'wereertryryre',
  queer: 'mebn',
};

console.log(encryptPayload(pl));
