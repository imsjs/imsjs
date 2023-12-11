import { withInstall } from "@imsjs/ims-ui-utils";
import CustomizationComponentEvents from "./src/index.vue";

const ImsCustomizationComponentEvents = withInstall(
  CustomizationComponentEvents
);

export { ImsCustomizationComponentEvents };

export default ImsCustomizationComponentEvents;
