import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { mongooseConnection } from "../../utils/db";
import { z } from "zod";
import UserModel from "../../model/userModel";
import {
  comparePassword,
  createJwtToken,
  returnErrorMessageZod,
} from "../../utils";

const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
const sevenDayExpirationDate = new Date(Date.now() + sevenDaysInMilliseconds);

const reqBodySchema = z.object({
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

    const { email, password } = reqBody;
    const user = (await UserModel.findOne({
      email,
    }).lean()) as any;

    if (!user) {
      return NextResponse.json(
        {
          message: "user not found",
          statusCode: StatusCodes.NOT_FOUND,
          data: null,
        },
        {
          status: StatusCodes.NOT_FOUND,
        }
      );
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          message: "password does not match please try again",
          statusCode: StatusCodes.BAD_REQUEST,
        },
        {
          status: StatusCodes.BAD_REQUEST,
        }
      );
    }

    const jwtToken = createJwtToken({
      email: user.email,
      user_id: user._id,
    });

    const userData = {
      user_id: user._id,
      email: user.email,
    };

    cookies().set("token", jwtToken, {
      maxAge: sevenDaysInMilliseconds,
      expires: sevenDayExpirationDate,
      httpOnly: true,
      path: "/",
      // secure: true,
      // sameSite: true,
    });

    return NextResponse.json(
      {
        data: userData,
        message: "user successfully login",
        statusCode: StatusCodes.OK,
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
      },
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      }
    );
  }
}
