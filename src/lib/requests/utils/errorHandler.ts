import { StatusCodes } from "http-status-codes";
import { responseMessage } from "./messages";
import { toast } from "@/components/ui/use-toast";
import { BaseResponse } from "./axios";

export default function errorHandler(
  error: BaseResponse,
  options = { showNotification: false }
) {
  const { message: statusMessage, statusCode: statusCode } = error;
  const defaultMsg = responseMessage[statusCode as never] as any;
  const message = statusMessage ?? defaultMsg;

  const rc = {
    statusMessage,
    statusCode,
    isSuccess: false,
    data: error.data,
  };

  if (statusCode === StatusCodes.UNAUTHORIZED) {
    window.location.replace("/login");
    return rc;
  }

  if (options.showNotification) {
    toast({
      description: message ?? responseMessage?.default?.message,
      title: defaultMsg?.title,
      variant: "destructive",
    });
  }

  return rc;
}
