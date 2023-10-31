<template>
  <div :class="prefixCls">
    <div class="h-48px" :class="`${prefixCls}-header`">
      <div :class="`${prefixCls}-header-logo`">
        <a-typography-text strong>LOGO</a-typography-text>
      </div>
      <div :class="`${prefixCls}-header-center`">
        <a-typography-text strong>Ims Designer</a-typography-text>
      </div>
      <div :class="`${prefixCls}-header-right`">
        <a-space>
          <ims-button icon="iconoir:undo" :disabled="true" />
          <ims-button icon="iconoir:redo" :disabled="true" />
          <a-button>预览</a-button>
          <a-button>保存</a-button>
          <a-button>数据回显</a-button>
          <a-button>重置操作</a-button>
        </a-space>
      </div>
    </div>
    <div :class="`${prefixCls}-content`">
      <div :class="`${prefixCls}-content-left`">
        <div :class="`${prefixCls}-content-left-tabs`">
          <div
            :class="[
              `${prefixCls}-content-left-tabs-item`,
              { active: item.key === activeTabKey },
            ]"
            @click="onTabClick(item)"
            @dblclick="onTabDblClick(item)"
            :key="item.key"
            v-for="item in tabsItems"
          >
            <icon :icon="item.icon"></icon>
            <span class="title">{{ item.title }}</span>
          </div>
        </div>
        <div :class="[`${prefixCls}-content-left-contents`, { hided: hided }]">
          <div
            v-show="activeTabKey === 'component'"
            :class="`${prefixCls}-content-left-contents-component`"
          >
            <div
              :class="`${prefixCls}-content-left-contents-component-searcher`"
            >
              <a-input
                v-model:value="componentKeywords"
                allowClear
                placeholder="搜索组件"
              >
                <template #prefix>
                  <icon icon="ant-design:search-outlined"></icon>
                </template>
              </a-input>
            </div>
            <div
              :class="`${prefixCls}-content-left-contents-component-wrapper`"
            >
              <div
                :class="`${prefixCls}-content-left-contents-component-wrapper-filter`"
              >
                <div
                  :class="[
                    `${prefixCls}-content-left-contents-component-wrapper-filter-item`,
                    { active: item.key === activeFilterKey },
                  ]"
                  :key="item.key"
                  @click="onFilterItemClick(item)"
                  v-for="item in filterItems"
                >
                  {{ item.title }}
                </div>
              </div>
              <div
                data-simplebar
                data-simplebar-auto-hide="false"
                :class="`${prefixCls}-content-left-contents-component-wrapper-components`"
              >
                <Simplebar>
                  <div
                    :class="`${prefixCls}-content-left-contents-component-wrapper-components-item`"
                    :key="component.key"
                    v-for="component in componentLists"
                  >
                    <div  :class="`${prefixCls}-content-left-contents-component-wrapper-components-item-component`">
                      <icon class="icon" :icon="component.icon"></icon>
                      <span class="title">{{ component.title }}</span>
                    </div>
                  </div>
                </Simplebar>
              </div>
            </div>
          </div>
          <div
            v-show="activeTabKey === 'source-code'"
            :class="`${prefixCls}-content-left-contents-source-code`"
          >
            source-code
          </div>
          <div
            v-show="activeTabKey === 'outline'"
            :class="`${prefixCls}-content-left-contents-outline`"
          >
            outline
          </div>
        </div>
      </div>
      <div :class="`${prefixCls}-content-center`">
        <div :class="`${prefixCls}-content-center-canvas`">
          <draggable
            :list="list"
            :enabled="enabled"
            item-key="name"
            class="list-group"
            ghost-class="ghost"
            :move="checkMove"
            @start="dragging = true"
            @end="dragging = false"
          >
            <template #item="{ element }">
              <div
                class="list-group-item"
                :class="{ 'not-draggable': !enabled }"
              >
                {{ element.name }}
              </div>
            </template>
          </draggable>
        </div>
      </div>
      <div :class="`${prefixCls}-content-right`">
        <div :class="`${prefixCls}-content-right-breadcrumb`">
          <a-breadcrumb>
            <a-breadcrumb-item>页面</a-breadcrumb-item>
            <a-breadcrumb-item>级联选择器</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div>
          <a-tabs v-model:activeKey="activeKey" centered>
            <a-tab-pane key="1" tab="属性"></a-tab-pane>
            <a-tab-pane key="2" tab="样式"></a-tab-pane>
            <a-tab-pane key="3" tab="事件"></a-tab-pane>
          </a-tabs>

          <div v-show="activeKey === '1'" class="px-2">属性</div>
          <div v-show="activeKey === '2'" class="px-2">样式</div>
          <div v-show="activeKey === '3'" class="px-2">事件</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStyle } from "@imsjs/ims-ui";

import draggable from "vuedraggable";

import Simplebar from "simplebar-vue";
import "simplebar-vue/dist/simplebar.min.css";

import { h } from "vue";

const { prefixCls } = useStyle("designer");

console.info("prefixCls =>", prefixCls);

const activeKey = ref("1");

const activeTabKey = ref("component");

const activeFilterKey = ref("all");

const hided = ref(false);

const componentKeywords = ref("");

const enabled = ref(true);

const list = ref([
  { name: "John", id: 0 },
  { name: "Joao", id: 1 },
  { name: "Jean", id: 2 },
]);

const checkMove = (e) => {
  window.console.log("Future index: " + e.draggedContext.futureIndex);
};

const dragging = ref(false);

const tabsItems = [
  {
    title: "组件",
    icon: "uiw:component",
    key: "component",
  },
  {
    title: "大纲",
    icon: "mdi:file-tree-outline",
    key: "outline",
  },
  {
    title: "源码",
    icon: "ri:code-box-line",
    key: "source-code",
  },
];

const filterItems = [
  {
    title: "全部",
    icon: "uiw:component",
    key: "all",
  },
  {
    title: "表单",
    icon: "mdi:file-tree-outline",
    key: "form",
  },
  {
    title: "布局",
    icon: "ri:code-box-line",
    key: "layout",
  },
];

const componentLists = ref([
  {
    title: "输入框",
    icon: "iconoir:input-field",
    key: "component",
  },
  {
    title: "文本域",
    icon: "bi:textarea-resize",
    key: "component",
  },
  {
    title: "数字输入框",
    icon: "fluent-emoji-high-contrast:input-numbers",
    key: "component",
  },
  {
    title: "密码输入框",
    icon: "ph:password-light",
    key: "component",
  },
  {
    title: "选择框",
    icon: "tabler:select",
    key: "component",
  },
  {
    title: "级联选择器",
    icon: "uiw:component",
    key: "component",
  },
  {
    title: "多选框",
    icon: "ci:select-multiple",
    key: "component",
  },
  {
    title: "单选框",
    icon: "ant-design:check-square-outlined",
    key: "component",
  },
  {
    title: "日期选择器",
    icon: "ant-design:calendar-twotone",
    key: "component",
  },
  {
    title: "时间选择器",
    icon: "ant-design:field-time-outlined",
    key: "component",
  },
  {
    title: "滑块",
    icon: "vaadin:slider",
    key: "component",
  },
  {
    title: "开关",
    icon: "line-md:switch-off",
    key: "component",
  },
  {
    title: "颜色选择器",
    icon: "mdi:color",
    key: "component",
  },
  {
    title: "上传",
    icon: "ant-design:cloud-upload-outlined",
    key: "component",
  },
  {
    title: "按钮",
    icon: "mdi:button",
    key: "component",
  },
  {
    title: "卡片布局",
    icon: "ant-design:credit-card-outlined",
    key: "component",
  },
  {
    title: "栅格布局",
    icon: "radix-icons:layout",
    key: "component",
  },

  
]);

const onTabClick = (item) => {
  console.info("item =>", item);

  activeTabKey.value = item.key;
};

const onTabDblClick = (item) => {
  console.info("onTabDblClick.item =>", item);

  hided.value = !hided.value;
};

const onFilterItemClick = (item) => {
  console.info("onFilterItemClick =>", item);
  activeFilterKey.value = item.key;
};
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-designer";

.@{prefix-cls} {
  --at-apply: h-full w-full flex flex-col;

  &-header {
    --at-apply: flex justify-between items-center h-48px;
    // box-shadow: 0 1px 4px #eaeaea;
    border-bottom: 1px solid #eaeaea;

    &-logo {
      --at-apply: flex-1 flex justify-start items-center px-2;
    }
    &-center {
      --at-apply: flex-1 flex justify-center items-center;
    }
    &-right {
      --at-apply: flex-1 flex justify-end items-center px-2;
    }
  }

  &-content {
    height: calc(100% - 48px);
    --at-apply: flex-1 flex;
    // overflow: hidden;
    box-sizing: border-box;

    &-left {
      --at-apply: flex;

      &-tabs {
        --at-apply: p-2;
        border-right: 1px solid #eaeaea;

        .active {
          .title {
            color: #3e8bf2;
          }
          .iconify {
            color: #3e8bf2;
          }
        }

        &-item {
          --at-apply: cursor-pointer w-54px flex flex-col items-center
            justify-center mb-2;

          .title {
            font-size: 14px;
            color: #777;
            user-select: none;
          }

          .iconify {
            font-size: 20px;
          }

          &:hover {
            color: #3e8bf2;
            .title {
              color: #3e8bf2;
            }
            .iconify {
              color: #3e8bf2;
            }
          }
        }
      }

      .hided {
        display: none;
      }

      &-contents {
        --at-apply: flex-1 w-300px h-full;
        &-component {
          --at-apply: flex flex-col h-full;
          &-searcher {
            --at-apply: p-2 h-48px;
            border-bottom: 1px solid #eaeaea;
          }

          &-wrapper {
            --at-apply: flex-1 flex h-full;
            box-sizing: border-box;

            overflow: hidden;

            &-filter {
              --at-apply: px-2 py-2 h-full;
              box-sizing: border-box;

              background-color: #f8f8f8;

              .active {
                color: #3e8bf2;
                background-color: #3e8bf20f;
              }

              &-item {
                --at-apply: cursor-pointer w-50px h-28px mb-2 rd flex
                  items-center justify-center;
                // background-color: #3e8bf20f;
                color: #3d3d3d;
                font-size: 12px;

                &:hover {
                  color: #3e8bf2;
                  background-color: #3e8bf20f;
                }
              }
            }

            &-components {
              --at-apply: box-border flex-1 h-full box-border;


              &-item {
                --at-apply: box-border float-left w-1/2 px-2 py-1 ;
                  // border: 1px solid red;
                &-component {
                  border: 1px solid #eaeaea;
                  --at-apply: px-2 py-2 cursor-pointer rd flex items-center justify-start;
                  &:hover {
                    border-color: #3e8bf2;
                    background-color: #3e8bf20f;
                    .icon {
                      color: #3e8bf2;
                    }

                    .title {
                      color: #3e8bf2;
                    }
                  }

                  .icon {
                    font-size: 14px;
                    --at-apply: mr-1;
                  }

                  .title {
                    font-size: 12px;
                    color: rgb(51, 51, 51);
                    user-select: none;
                  }
                }

                
              }
            }
          }
        }

        &-source-code {
          border: 1px solid red;
        }

        &-outline {
          border: 1px solid red;
        }
      }
    }

    &-center {
      --at-apply: flex-1 p-6;
      border: 1px solid #eaeaea;
      background-image: linear-gradient(#f8f8f8 14px, transparent 0),
        linear-gradient(90deg, transparent 14px, #373739 0);
      background-size: 15px 15px;
      overflow: hidden;

      &-canvas {
        --at-apply: w-full h-full p-2;
        // border: 1px solid red;
        background-color: #fff;
      }
    }

    &-right {
      --at-apply: w-300px;

      &-breadcrumb {
        border-bottom: 1px solid #eaeaea;

        --at-apply: h-48px flex items-center px-2;
      }
    }
  }
}
</style>
