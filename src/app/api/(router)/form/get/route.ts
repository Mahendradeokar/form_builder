import FormModel from "@/app/api/model/formModel";
import { getTokenData } from "@/app/api/utils";
import { mongooseConnection } from "@/app/api/utils/db";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await mongooseConnection();

    const querySearchParams = request.nextUrl.searchParams;
    const formId = querySearchParams.get("formId");

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        {
          message: "Not authenticated",
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

    const query: { userId: string; _id?: string } = { userId: payload.user_id! };
    if (formId) {
      query._id = formId;
    }
    const form = await FormModel.find(query).lean();
    if (!form) {
      return NextResponse.json(
        {
          message: "Form not found",
          statusCode: StatusCodes.NOT_FOUND,
          data: null,
        },
        {
          status: StatusCodes.NOT_FOUND,
        }
      );
    }

    return NextResponse.json(
      {
        data: form,
        message: "Done",
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
