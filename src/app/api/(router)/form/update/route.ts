import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { z } from "zod";
import { mongooseConnection } from "@/app/api/utils/db";
import { getTokenData, returnErrorMessageZod } from "@/app/api/utils";
import FormModel from "@/app/api/model/formModel";

const reqBodySchema = z.object({
  formData: z.any(),
  formId: z.string().min(1, { message: "Form id is required" }),
});

type ReqBody = z.infer<typeof reqBodySchema>;

export async function PUT(request: NextRequest) {
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

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        {
          message: "User not authenticated",
          statusCode: StatusCodes.BAD_REQUEST,
          data: null,
        },
        {
          status: StatusCodes.BAD_REQUEST,
        }
      );
    }
    const payload = await getTokenData(token);

    const form = await FormModel.findOneAndUpdate(
      {
        userId: payload.user_id,
        _id: reqBody.formId,
      },
      { formData: reqBody.formData }
    );

    return NextResponse.json(
      {
        data: null,
        message: "Form Updated",
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
