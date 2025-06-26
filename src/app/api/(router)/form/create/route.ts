import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { z } from "zod";
import { mongooseConnection } from "@/app/api/utils/db";
import { getTokenData, returnErrorMessageZod } from "@/app/api/utils";
import FormModel from "@/app/api/model/formModel";

const reqBodySchema = z.object({
  formData: z.any(),
  name: z.string().min(1, { message: "Name is required" }),
});

type ReqBody = z.infer<typeof reqBodySchema>;

export async function POST(request: NextRequest) {
  try {
    await mongooseConnection();
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        {
          message: "User not authenticated",
          statusCode: StatusCodes.UNAUTHORIZED,
          data: null,
        },
        {
          status: StatusCodes.UNAUTHORIZED,
        }
      );
    }

    let payload: Partial<Awaited<ReturnType<typeof getTokenData>>> = {};
    try {
      payload = await getTokenData(token);
    } catch (error) {
      return NextResponse.json(
        {
          message: "Unauthorized user.",
          statusCode: StatusCodes.UNAUTHORIZED,
          data: null,
        },
        {
          status: StatusCodes.UNAUTHORIZED,
        }
      );
    }

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


    const form = await FormModel.create({
      userId: payload.user_id,
      name: reqBody.name,
      formData: reqBody.formData,
    });

    return NextResponse.json(
      {
        data: null,
        message: "Form Created",
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
