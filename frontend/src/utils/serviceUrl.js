import {
  URL_USER_HISTORY_SVC,
  URL_USER_SVC,
  URL_QUESTION_SVC,
} from "../utils/configs";

var serviceStrings = [
  { reference: "USER", url: URL_USER_SVC },
  {
    reference: "USER-HISTORY",
    url: URL_USER_HISTORY_SVC,
  },
  {
    reference: "QUESTION",
    url: URL_QUESTION_SVC,
  },
];

export var getServiceUrl = (service) => {
  var serviceUrl = "";
  for (var serviceString of serviceStrings) {
    if (service === serviceString.reference) {
      serviceUrl = serviceString.url;
    }
  }
  return serviceUrl;
};
