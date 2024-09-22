import { HttpsError, onCall } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";

const adminSignupKey = defineSecret("ADMIN_SIGNUP_KEY");
const employerSignupKey = defineSecret("EMPLOYER_SIGNUP_KEY");
const authorizedPosterSignupKey = defineSecret("AUTHORIZED_POSTER_SIGNUP_KEY");

const getAccountType = (key: any): string => {
  if (key === adminSignupKey.value()) {
    return "admin";
  } else if (key === employerSignupKey.value()) {
    return "employer";
  } else if (key === authorizedPosterSignupKey.value()) {
    return "authorized-poster";
  } else {
    return "normal";
  }
};

exports.validateAdminKey = onCall(
  {
    cors: true,
    secrets: [adminSignupKey, employerSignupKey, authorizedPosterSignupKey],
  },
  (req) => {
    try {
      return {
        validKey:
          req.data.key === adminSignupKey.value() ||
          req.data.key === employerSignupKey.value() ||
          req.data.key === authorizedPosterSignupKey.value(),
        accountType: getAccountType(req.data.key),
        input: req.data.key,
        inputTypeOf: typeof req.data.key,
      };
    } catch (e) {
      throw new HttpsError("internal", "Interal server error.");
    }
  }
);
