import bcrypt from "bcrypt";
import { jwtVerify } from "jose";
import { sign } from "jsonwebtoken";

import { TokenData } from "../type";

const salt = bcrypt.genSaltSync(10);
export const hashPassword = async (password: string) => {
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

const jwtOption = {
  expiresIn: "1d",
};

export const createJwtToken = (data: TokenData) => {
  return sign(data, process.env.SECRET_KEY, jwtOption);
};

export const getTokenData = async (token: string) => {
  const { payload } = await jwtVerify<TokenData>(
    token,
    new TextEncoder().encode(process.env.SECRET_KEY)
  );
  return payload;
};

export const returnErrorMessageZod = <T>(formattedError: Zod.ZodError<T>) => {
  const flattedError = Object.entries(formattedError.flatten().fieldErrors);
  const [field, error] = flattedError[0];
  let msg = "";
  if (error) {
    if (Array.isArray(error)) {
      msg = error[0] as string;
    } else {
      msg = String(error) as string;
    }
  }
  return `${field} ${msg}`;
};
