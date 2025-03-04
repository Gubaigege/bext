import font from './src/assets/font';
import dayjs from 'dayjs';
import path from 'path';
import shelljs from 'shelljs';
import { defineConfig } from 'umi';
import WindiCSSWebpackPlugin from 'windicss-webpack-plugin';

export default defineConfig({
  title: 'Bext',
  nodeModulesTransform: {
    type: 'none',
  },
  plugins: ['./src/plugins/meta'],
  links: [
    ...font.map((href) => ({
      rel: 'preload',
      as: 'font',
      crossorigin: 'anonymous',
      href,
    })),
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.snow.css',
    },
  ],
  define: {
    BUILD_TIMESTAMP: dayjs().unix(),
    BUILD_HASH: shelljs.exec('git rev-parse HEAD').toString(),
  },
  externals: {
    quill: 'window.Quill',
  },
  headScripts: ['https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.min.js'],
  chainWebpack: (config) => {
    config.module
      .rule('lib')
      .test(/nevermatch/)
      .use('raw')
      .loader('raw-loader');
    config.plugin('windicss').use(WindiCSSWebpackPlugin);
  },
  alias: {
    '@bext': path.resolve(__dirname, 'src/lib'),
  },
  mfsu: false,
  analytics: {
    baidu: process.env.BAIDU_TOKEN || false,
  },
});
