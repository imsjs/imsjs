import { resolve } from 'path';
import chalk from 'chalk';
import { loadEnv } from 'vite';
import type { ConfigEnv,InlineConfig } from 'vite';
import { build } from 'vite';
import { configVitePlugins } from '../vite';
import { getLessOptions } from '../vite/preprocessor/less';
import { wrapperEnv } from '../utils';
// rimrafSync
import { rimraf } from 'rimraf'

/**
 * 完成了 组件库的基本构建
 * 
 * 还有许多 需要完善的点 
 * 
 * @todo
 * 
 * - 类型 提取 
 * 
 */

const log = console.log;

const pathResolve =  (dir: string) => {
    return resolve(process.cwd(), '.', dir);
}
const getInlineConfig = ({ mode, command }: ConfigEnv): InlineConfig => {
    const root = pathResolve('packages/ims-ui');
    const env = loadEnv(mode, root);
    const viteEnv = wrapperEnv(env);
  
    const {
      VITE_PUBLIC_PATH,
      VITE_DROP_CONSOLE,
    } = viteEnv;
    const isBuild = command === 'build';
    return {
      base: VITE_PUBLIC_PATH,
      root: root,
      plugins: configVitePlugins(viteEnv, isBuild),
      define: {
        __IS_DEVELOPMENT__: JSON.stringify(mode === 'development'),
        __IMS_UI_INFO__:  JSON.stringify({author:'Van Chin',aa:'bb',foo:'bar'})
      },
      
      build: {
        lib: {
          entry: {
            index: root + '/index.ts'
          },
          formats: ['es', 'cjs', 'umd'],
          name: 'ims-ui',
          fileName: format => {
            // console.info('format =>', format, `index.${format}.js`);
            return `index.${format}.js`;
          }
        },
        // minify: false,
        /**
         *  打包时排除 选项
         *  'vue', vue: 'vue',
         * 
         */
        rollupOptions: {
          external: ['vue',/ant-design-vue.*/,'@iconify/vue',/lodash.*/,'sortablejs'],
          output: {
            globals: {
              vue:'Vue',
              'ant-design-vue':'antDesignVue',
              sortablejs:'Sortable',
              'lodash-es':'lodashEs',
              'ant-design-vue/es':'antDesignVueEs',
              '@iconify/vue':'iconifyVue',
              // alova:'alova'
              
            }
          }
        }
      },
     
      css: {
        preprocessorOptions: {
          less: getLessOptions(isBuild)
        }
      },
      esbuild: {
        drop: VITE_DROP_CONSOLE ? ['console', 'debugger'] : []
      },
      configFile:false,
    };
  };


  async function main() {
    // build
    log(chalk.gray('==================  build start ==================='));

    // 删除 types dist
    const res = await rimraf([pathResolve('packages/ims-ui/types'),pathResolve('packages/ims-ui/dist')]);

    if(!res) {
        log(chalk.red('delete types or dist files fail!'));
    }


    const inlineConfig = getInlineConfig({mode:'production',command:'build'});

    
    await build(inlineConfig);
    
    
    
    log(chalk.green('==================  build end   ==================='));
    
  }

  main();