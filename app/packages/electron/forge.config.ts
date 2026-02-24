import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { MakerDMG } from '@electron-forge/maker-dmg';
import { VitePlugin } from '@electron-forge/plugin-vite';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import path from 'node:path';

const assetsPath = path.resolve(__dirname, '../../assets');

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    name: 'GitGael',
    executableName: 'gitgael',
    icon: path.join(assetsPath, 'icon'),
    extraResource: [
      path.join(assetsPath, 'gitgael.desktop'),
      path.join(assetsPath, 'icon.png'),
    ],
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      setupIcon: path.join(assetsPath, 'icon.ico'),
    }),
    new MakerZIP({}, ['darwin']),
    new MakerDMG({
      icon: path.join(assetsPath, 'icon.icns'),
      format: 'ULFO',
    }),
    new MakerRpm({
      options: {
        icon: path.join(assetsPath, 'icon.png'),
        categories: ['Development', 'Utility'],
      },
    }),
    new MakerDeb({
      options: {
        icon: path.join(assetsPath, 'icon.png'),
        categories: ['Development', 'Utility'],
        section: 'devel',
        desktopTemplate: path.join(assetsPath, 'gitgael.desktop'),
      },
    }),
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new VitePlugin({
      build: [
        {
          entry: 'src/main.ts',
          config: 'vite.main.config.ts',
          target: 'main',
        },
        {
          entry: 'src/preload.ts',
          config: 'vite.preload.config.ts',
          target: 'preload',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: '../../packages/frontend/vite.config.ts',
        },
      ],
    }),
  ],
};

export default config;
