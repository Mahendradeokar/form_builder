import { toast } from "@/components/ui/use-toast";
import { responseMessage } from "./messages";
import { BaseResponse } from "./axios";

export default function successHandler(
  res: BaseResponse,
  options = { showNotification: false }
) {
  const { message: statusMessage, statusCode: statusCode } = res;
  const message = statusMessage ?? responseMessage[statusCode as never];

  if (options.showNotification) {
    toast({
      description: message ?? "Marketplace Added!",
      title: "Hurry...",
      variant: "default",
    });
  }

  return {
    statusMessage,
    statusCode,
    isSuccess: true,
    data: res.data,
  };
}
