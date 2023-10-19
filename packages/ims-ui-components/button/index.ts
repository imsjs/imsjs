import { withInstall } from "@imsjs/ims-ui-utils";

import Button from "./src/index.vue";

import PopconfirmButton from "./src/popconfirm-button.vue";

export const ImsButton = withInstall(Button);

export const ImsPopconfirmButton = withInstall(PopconfirmButton);

export default ImsButton;
