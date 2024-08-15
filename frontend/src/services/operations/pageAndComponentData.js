import {toast} from "react-hot-toast";
import { apiConnector } from "../apiconnector";


export const getCatelogPageData = async(categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector("POST" , catalogData.CATALOGPAGE_DATA_API , {
        categoryId : categoryId
    })

    if(!response?.data?.success) {
        throw new Error("Could not Fetch Category page data")
    }

    const result = response?.data;
  }
  catch(error) {
    console.log("CATELOG PAGE DATA API ERROR...: " , error);
    toast.error(error.message);
    result = error?.response?.data
  }
  toast.dismiss(toastId);
  return result;
}
