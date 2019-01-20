const urlRoot = window.APP_CONTEXT_PATH ; // window.location.origin;
const apiPrefix = "api";

export const apiNames = {
    apiinfo:   `${urlRoot}/${apiPrefix}/info`,
    booking:   `${urlRoot}/${apiPrefix}/booking`,
};