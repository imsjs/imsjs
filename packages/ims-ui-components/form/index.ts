import { withInstall } from "@imsjs/ims-ui-utils";

import Form from "./src/index.vue";

import FormItem from "./src/form-item.vue";

export const ImsForm = withInstall(Form);

export const ImsFormItem = withInstall(FormItem);

export default ImsForm;
