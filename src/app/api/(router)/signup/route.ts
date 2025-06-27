import { NextRequest, NextResponse } from "next/server";
import { mongooseConnection } from "../../utils/db";
import { Schema, z } from "zod";
import { StatusCodes } from "http-status-codes";

import UserModel from "../../model/userModel";
import { hashPassword, returnErrorMessageZod } from "../../utils";

const reqBodySchema = z.object({
  username: z.string().min(1, { message: "user name is required" }),
  email: z.string().email({ message: "invalid email" }),
  password: z
    .string({ message: "password is required" })
    .min(5, { message: "password should be atlas 5 character long" }),
});

type ReqBody = z.infer<typeof reqBodySchema>;

export async function POST(request: NextRequest) {
  try {
    await mongooseConnection();
    const reqBody = (await request.json()) as ReqBody;
    const validate = reqBodySchema.safeParse(reqBody);

    if (!validate.success) {
      return NextResponse.json(
        {
          message: returnErrorMessageZod(validate.error),
          statusCode: StatusCodes.BAD_REQUEST,
          data: null,
        },
        {
          status: StatusCodes.BAD_REQUEST,
        }
      );
    }
    const { username, email, password } = reqBody;

    const userData = await UserModel.findOne({ email }).lean();
    if (userData) {
      return NextResponse.json(
        {
          message: "User already exists",
          statusCode: StatusCodes.BAD_REQUEST,
          data: null,
        },
        {
          status: StatusCodes.BAD_REQUEST,
        }
      );
    }
    let bcryptPassword = await hashPassword(password);

    await UserModel.create({
      user_name: username,
      email,
      password: bcryptPassword,
    });
    return NextResponse.json(
      {
        message: "user created successfully",
        statusCode: StatusCodes.OK,
        data: null,
      },
      {
        status: StatusCodes.OK,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
      },
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      }
    );
  }
}
