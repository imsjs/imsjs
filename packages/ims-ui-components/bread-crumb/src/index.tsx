import { Breadcrumb, BreadcrumbItem } from 'ant-design-vue';
import { ImsNavMenu } from '../../nav-menu';

export default defineComponent({
  name: 'BreadCrumb',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    console.info('BreadCrumb => props....', props.data);
    const siderMenuProps = {
      cachePrefix: 'path-data-',
      children: 'children',
      label: 'name',
      value: 'id',
      icon: 'icon',
      leaf: 'leaf',
      disabled: 'disabled'
    };

    return () => (
      <Breadcrumb>
        {props.data.map((item: any) => {
          if (item.children.length) {
            return (
              <BreadcrumbItem
                overlay={<ImsNavMenu data={item.children}></ImsNavMenu>}
              >
                {item.name}
              </BreadcrumbItem>
            );
          } else {
            return <BreadcrumbItem>{item.name}</BreadcrumbItem>;
          }
        })}
      </Breadcrumb>
    );
  }
});
