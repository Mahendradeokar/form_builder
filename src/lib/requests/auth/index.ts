import { isAxiosError } from "axios";
import { API, BaseResponse } from "../utils/axios";
import errorHandler from "../utils/errorHandler";
import successHandler from "../utils/successHandler";
import { toast } from "@/components/ui/use-toast";

export const login = async (data: { email: string; password: string }) => {
  try {
    const { data: resData } = await API.post<BaseResponse>("login", data);
    const rc = successHandler(resData, { showNotification: false });
    return rc;
  } catch (error: any) {
    if (isAxiosError(error)) {
      return errorHandler(error.response?.data, {
        showNotification: true,
      });
    }
    toast({
      description: error.message,
      title: "Something went wrong!",
      variant: "destructive",
    });

    return {
      statusMessage: error.message,
      statusCode: 500,
      isSuccess: false,
      data: null,
    };
  }
};

export const signUp = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const { data: resData } = await API.post("signup", data);
    return successHandler(resData, { showNotification: false });
  } catch (error: any) {
    if (isAxiosError(error)) {
      return errorHandler(error?.response?.data, {
        showNotification: true,
      });
    }
    toast({
      description: error.message,
      title: "Something went wrong!",
      variant: "destructive",
    });

    return {
      statusMessage: error.message,
      statusCode: 500,
      isSuccess: false,
      data: null,
    };
  }
};
