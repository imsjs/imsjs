<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-header`">
      <div :class="`${prefixCls}-header-logo`">LOGO</div>
      <div :class="`${prefixCls}-header-center`">Ims Designer</div>
      <div :class="`${prefixCls}-header-right`">right</div>
    </div>

    <div :class="`${prefixCls}-contents`">
      <div :class="`${prefixCls}-contents-left`">
        <div :class="`${prefixCls}-contents-left-nav-bar`">
          <a-tabs
            tabPosition="left"
            class="h-full"
            :class="`${prefixCls}-contents-left-nav-bar-tabs`"
          >
            <a-tab-pane key="1">
              <template #tab>
                <div class="flex flex-col justify-center items-center">
                  <div><icon icon="uiw:component"></icon></div>
                  <div>组件</div>
                </div>
              </template>

              <div
                :class="`${prefixCls}-contents-left-nav-bar-tabs-components`"
              >
                <div
                  :class="`${prefixCls}-contents-left-nav-bar-tabs-components-components`"
                >
                  <div>components</div>
                  <div>components</div>
                </div>
                <div
                  :class="`${prefixCls}-contents-left-nav-bar-tabs-components-outline`"
                >
                  outline
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2">
              <template #tab>
                <div class="flex flex-col justify-center items-center">
                  <div><icon icon="mdi:file-tree-outline"></icon></div>
                  <div>大纲</div>
                </div>
              </template>

              <div class="tab-wrapper">大纲</div>
            </a-tab-pane>
            <a-tab-pane key="3">
              <template #tab>
                <div class="flex flex-col justify-center items-center">
                  <div><icon icon="ri:code-box-line"></icon></div>
                  <div>源码</div>
                </div>
              </template>

              <div class="tab-wrapper">源码</div>
            </a-tab-pane>
            <a-tab-pane key="4">
              <template #tab>
                <div class="flex flex-col justify-center items-center">
                  <div><icon icon="uiw:component"></icon></div>
                  <div>记录</div>
                </div>
              </template>

              <div class="tab-wrapper">记录</div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div :class="`${prefixCls}-contents-canvas`">
        <div :class="`${prefixCls}-contents-canvas-tools`">
          <div :class="`${prefixCls}-contents-canvas-tools-left`">
           <a-space>
           
            <a-radio-group  class="rgi" size="small">
              <a-radio-button value="a" ><icon icon="ion:arrow-undo-outline"></icon></a-radio-button>
              <a-radio-button value="b" ><icon icon="ion:arrow-undo-outline"></icon></a-radio-button>
            </a-radio-group>
            <a-radio-group  class="rgi" size="small">
              <a-radio-button value="d" > <icon icon="system-uicons:move"></icon></a-radio-button>
              <a-radio-button value="c" ><icon icon="ph:selection-plus-light"></icon></a-radio-button>
              
            </a-radio-group>

            <a-radio-group  class="rgi" size="small">
              <a-radio-button value="a" ><icon icon="iconoir:pc-check"></icon></a-radio-button>
              <a-radio-button value="b" ><icon icon="clarity:mobile-line"></icon></a-radio-button>
              
            </a-radio-group>
            
           </a-space>
          </div>
          <div :class="`${prefixCls}-contents-canvas-tools-right`">
            <a-radio-group  class="rgi" size="small">
              <a-radio-button value="a" ><icon icon="ic:outline-color-lens"></icon></a-radio-button>
              <a-radio-button value="b" ><icon icon="tabler:code-dots"></icon></a-radio-button>
              <a-radio-button value="c"><icon icon="tabler:code"></icon></a-radio-button>
              <a-radio-button value="d"> <icon icon="ph:play-bold"></icon></a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <div :class="`${prefixCls}-contents-canvas-workspace`">workspace</div>
      </div>
      <div :class="`${prefixCls}-contents-right`">
        <div
          class="breadcrumb h-48px flex items-center px-2"
          style="border-bottom: 1px solid #d9d9d9"
        >
          <a-breadcrumb>
            <a-breadcrumb-item>表单</a-breadcrumb-item>
            <a-breadcrumb-item>输入框</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div class="breadcrumb h-48px flex-1">
          <a-tabs centered>
            <a-tab-pane key="1" tab="表单属性">表单属性</a-tab-pane>
            <a-tab-pane key="2" tab="组件属性">组件属性</a-tab-pane>
            <a-tab-pane key="3" tab="其他属性">其他属性</a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>

   
  </div>
</template>

<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui-hooks";

import type { CSSProperties } from "vue";

import type { ImsFormDesignerProps } from "@imsjs/ims-ui-types";

const props = withDefaults(defineProps<ImsFormDesignerProps>(), {});

console.info("props =>", props);

const COMPONENT_NAME = "ImsFormDesigner";
defineOptions({
  name: COMPONENT_NAME,
});
const { prefixCls } = useStyle("form-designer");



const value1 = ref<string>("a");

const value = ref();


const testOptions = [
  {
    label:'1',
    value:1,
  },
  {
    label:'2',
    value:2,
  },
  {
    label:'3',
    value:3,
  },
  {
    label:'4',
    value:4,
  }
];

const data = reactive(["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]);
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-form-designer";

.@{prefix-cls} {
  --at-apply: w-full h-full flex flex-col overflow-hidden;

  &-header {
    --at-apply: h-48px min-h-48px flex justify-between items-center;

    border-bottom: 1px solid #eaeaea;

    &-logo {
      --at-apply: font-bold px-2;
    }

    &-center {
      --at-apply: font-bold;
    }

    &-right {
      --at-apply: font-bold px-2;
    }
  }
  // 内容区域
  &-contents {
    --at-apply: flex-1 flex;
    // border: 2px solid red;
    &-left {
      --at-apply: flex flex-row;
      &-nav-bar {
        --at-apply: w-356px;

        &-tabs {
          // border: 1px solid red;
          /* tabs 样式调整 开始 */
          :deep(.ant-tabs-tab) {
            padding: 8px 12px;
          }
          :deep(.ant-tabs-content-holder) {
            .ant-tabs-content {
              height: 100%;
              .ant-tabs-tabpane {
                padding-left: 0;
                height: 100%;
              }
            }
          }
          /* tabs 样式调整  结束 */
          .tab-wrapper {
            --at-apply: h-full p-2;
            // border: 1px solid green;
          }

          &-components {
            --at-apply: h-full flex flex-col;
            // border: 1px solid red;

            &-components {
              --at-apply: flex-1;
            }

            &-outline {
              // border: 1px solid red;
              --at-apply: h-300px bd-red;
            }
          }
        }
        // border-right: 1px solid #eaeaea;
      }
    }

    &-canvas {
      --at-apply: "bg-#eeeeee flex-1  flex flex-col p-1";
      // border: 1px solid red;

      &-tools {
        --at-apply: py-1 pt-0 px-1  flex justify-between items-center;

        .rgi {
          
            :deep(.ant-radio-button-wrapper) {
               span:last-child {
                  --at-apply: flex justify-between items-center h-full;
                }
                
            }

            

          }

        &-left {
          --at-apply: flex;
          
        }

        &-right {
          --at-apply: flex;
          
        }
      }

      &-workspace {
        --at-apply: "flex-1 bg-#fff";
      }
    }

    &-right {
      --at-apply: w-300px flex flex-col;
    }
  }
}
</style>
