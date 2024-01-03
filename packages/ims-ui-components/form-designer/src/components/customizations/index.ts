import { withInstall } from "@imsjs/ims-ui-utils";

import DesignerCustomizationProp from "./customization-prop.vue";

import DesignerCustomizationPropHeader from "./customization-prop-header.vue";

import DesignerCustomizationInput from "./customization-input.vue";
import DesignerCustomizationSwitch from "./customization-switch.vue";
import DesignerCustomizationRadioGroup from "./customization-radio-group.vue";

const ImsDesignerCustomizationProp = withInstall(DesignerCustomizationProp);

const ImsDesignerCustomizationPropHeader = withInstall(
  DesignerCustomizationPropHeader
);

const ImsDesignerCustomizationInput = withInstall(DesignerCustomizationInput);
const ImsDesignerCustomizationSwitch = withInstall(DesignerCustomizationSwitch);
const ImsDesignerCustomizationRadioGroup = withInstall(
  DesignerCustomizationRadioGroup
);

export {
  ImsDesignerCustomizationPropHeader,
  ImsDesignerCustomizationProp,
  ImsDesignerCustomizationInput,
  ImsDesignerCustomizationSwitch,
  ImsDesignerCustomizationRadioGroup,
};
