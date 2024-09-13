import { HttpsError, onCall } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";

const employerSignupKey = defineSecret("EMPLOYER_SIGNUP_KEY");

exports.helloWorld = onCall(
  { cors: true, secrets: [employerSignupKey] },
  () => {
    try {
      return {
        data: "Hello World",
      };
    } catch (e) {
      throw new HttpsError("internal", "Interal server error.");
    }
  }
);
