import { defineComponent } from "vue";
import { ImsNavMenu } from "../../nav-menu";

export default defineComponent({
  name: "ImsBreadCrumb",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    // console.info('ctx =>',ctx);
    const onClick = ({ key }) => {
      const realKey = key.split("-")[0];
      console.info("realKey =>", realKey);
      emit("click", realKey);
    };
    return () => (
      <ImsNavMenu
        data={props.data}
        selectable={false}
        class="bread-crumb-menu"
        mode="horizontal"
        bread-crumb={true}
        triggerSubMenuAction="click"
      ></ImsNavMenu>
    );
  },
});
