import axios from "axios";
import { toast } from "react-toastify";
import history from "../../utils/history";
import { REQUEST_ERROR } from "./action-types";
import { serializeQueryString } from "../../utils/helpers";

const appRequest = async (requestInfo, dispatch) => {
  const {
    triggeredBy,
    query,
    data: payload,
    url,
    method,
    onSuccess,
    successRedirect,
  } = requestInfo;

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
    dispatch({ type: onSuccess, payload: response });
    if (successRedirect) {
      history.push(successRedirect);
    }
  } catch (error) {
    const { response } = error;
    if (response) {
      toast.error(response.data.message);
      dispatch({ type: REQUEST_ERROR, payload: { data: response.data, triggeredBy } });
    }
  }
};

export default appRequest;
