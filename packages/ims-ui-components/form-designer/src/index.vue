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
            
            <a-radio-group v-model:value="unReDo" class="rgi" size="small">
              <a-radio-button value="undo" ><icon icon="ion:arrow-undo-outline"></icon></a-radio-button>
              <a-radio-button value="redo" ><icon icon="ion:arrow-redo-outline"></icon></a-radio-button>
            </a-radio-group>

            <a-radio-group v-model:value="elementTool" class="rgi" size="small" v-if="operationalView === 'design'">
              <a-radio-button value="move" > <icon icon="system-uicons:move"></icon></a-radio-button>
              <a-radio-button value="selection" ><icon icon="ph:selection-plus-light"></icon></a-radio-button>
            </a-radio-group>

            <a-radio-group v-model:value="targetDevice" class="rgi" size="small">
              <a-radio-button value="pc" ><icon icon="iconoir:pc-check"></icon></a-radio-button>
              <a-radio-button value="mobile" ><icon icon="clarity:mobile-line"></icon></a-radio-button>
            </a-radio-group>
            
           </a-space>
          </div>
          <div :class="`${prefixCls}-contents-canvas-tools-right`">
            <a-radio-group v-model:value="operationalView" class="rgi" size="small">
              <a-radio-button value="design" ><icon icon="ic:outline-color-lens"></icon></a-radio-button>
              <a-radio-button value="json" ><icon icon="tabler:code-dots"></icon></a-radio-button>
              <a-radio-button value="code"><icon icon="tabler:code"></icon></a-radio-button>
              <a-radio-button value="play"> <icon icon="ph:play-bold"></icon></a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <div :class="`${prefixCls}-contents-canvas-workspace`">
          <div :class="`${prefixCls}-contents-canvas-workspace-view ${prefixCls}-contents-canvas-workspace-view-design`" v-show="operationalView === 'design'">
            <div>design</div>
            <div class="w-full bd-red h-400px"></div>
          </div>
          <div :class="`${prefixCls}-contents-canvas-workspace-view ${prefixCls}-contents-canvas-workspace-view-json`" v-show="operationalView === 'json'">json</div>
          <div :class="`${prefixCls}-contents-canvas-workspace-view ${prefixCls}-contents-canvas-workspace-view-code`" v-show="operationalView === 'code'">code</div>
          <div :class="`${prefixCls}-contents-canvas-workspace-view ${prefixCls}-contents-canvas-workspace-view-play`" v-show="operationalView === 'play'">play</div>
        </div>
      </div>
      <div :class="`${prefixCls}-contents-right`">
        <div
          class="breadcrumb h-48px flex items-center px-2"
          style="border-bottom: 1px solid #d9d9d9"
        >
          <a-breadcrumb>
            <a-breadcrumb-item>表单xxx</a-breadcrumb-item>
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

import type { ImsFormDesignerProps } from "@imsjs/ims-ui-types";

const props = withDefaults(defineProps<ImsFormDesignerProps>(), {});

console.info("props =>", props);

const COMPONENT_NAME = "ImsFormDesigner";
defineOptions({
  name: COMPONENT_NAME,
});
const { prefixCls } = useStyle("form-designer");

// 撤销 重做 Undo Redo 
const unReDo = ref<string>("");
// 元素工具
const elementTool = ref<string>("");
// 目标设备
const targetDevice = ref<string>("pc");
// 操作视图
const operationalView = ref<string>("design");



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
        &-view {
          --at-apply: h-full;
          &-design {
            border: 1px solid red;
          }

          &-json {
            border: 1px solid yellow;
          }

          &-code {
            border: 1px solid black;
          }

          &-play {
            border: 1px solid green;
          }
          // 
        }
      }
    }

    &-right {
      --at-apply: w-300px flex flex-col;
    }
  }
}
</style>
