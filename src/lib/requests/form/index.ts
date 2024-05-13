import { isAxiosError } from "axios";
import { API } from "../utils/axios";
import successHandler from "../utils/successHandler";
import errorHandler from "../utils/errorHandler";
import { toast } from "@/components/ui/use-toast";
import { IFormState } from "@/types";

export const addForm = async (data: { name: string }) => {
  try {
    const { data: resData } = await API.post("form/create", data);
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

export const updateForm = async (data: {
  formId: string;
  formData: IFormState;
}) => {
  try {
    const { data: resData } = await API.put("form/update", data);
    return successHandler(resData, { showNotification: true });
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

export const getForm = async (formId?: string) => {
  try {
    let url = "form/get";
    if (formId) {
      url += `?formId=${formId}`;
    }
    const { data: resData } = await API.get(url);
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
