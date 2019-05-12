import axios from "axios";
import { toast } from "react-toastify";
import { serializeQueryString } from "../../utils/helpers";

const appRequest = async (requestInfo, dispatch) => {
  const { triggeredBy, query, data: payload, url, method, onSuccess, onFailure } = requestInfo;

  try {
    dispatch({ type: triggeredBy });

    let toSendUrl = url;
    if (query) {
      const serializedQuery = serializeQueryString(query);
      toSendUrl = `${url}?${serializedQuery}`;
    }
    let axiosParams = [toSendUrl];
    if (payload) {
      axiosParams.push(payload);
    }

    const { data: response } = await axios[method](...axiosParams);
    console.log(response, "response");
    dispatch({ type: onSuccess, payload: response });
  } catch (error) {
    if (error.response) {
      dispatch({ type: onFailure, payload: error.response });
    } else {
      toast.error("Error processing request");
    }
  }
};

export default appRequest;
