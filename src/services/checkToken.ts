import { AUTH_JobId } from "@/constants/jobId";
import { request } from "@/services";

// TEST_TOKEN is defined by webpack DefinePlugin
declare const TEST_TOKEN: string;

export default function checkToken(
  type: string,
  callback: (isAuthorized: boolean | string) => void
): void {
  if (type === "development") {
    localStorage.setItem("token", TEST_TOKEN);
    callback(true);
  } else {
    if (!document.referrer) {
      callback(false);
    } else {
      window.parent.postMessage({ tip: "getToken" }, document.referrer);
      window.addEventListener(
        "message",
        (e) => handlePostMessage(e, callback),
        false
      );
    }
  }
}

export const handlePostMessage = async (
  e: MessageEvent,
  callback: (isAuthorized: boolean | string) => void
): Promise<void> => {
  const data = e.data;
  if (data.tip === "getToken") {
    const oToken = data.token;
    if (oToken) {
      localStorage.setItem("oToken", oToken);
      const dataInfo = { token: oToken };
      localStorage.setItem("token", dataInfo.token);
      const response = await request({
        jobId: AUTH_JobId,
        dataInfo,
      });
      if (response.error === false) {
        localStorage.setItem("userData", JSON.stringify(response.data));
        callback(true);
      } else {
        callback(response.error);
      }
    }
  }
};
