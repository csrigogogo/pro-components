﻿import { setAlpha, useToken } from '@ant-design/pro-utils';
import type { GlobalToken } from 'antd/es/theme/interface';
import React from 'react';

export type BaseLayoutDesignToken = {
  /**
   * 跨站点应用的图标hover颜色
   */
  colorBgAppListIconHover: string;
  /**
   * 跨站点应用的图标hover颜色
   */
  colorTextAppListIconHover: string;
  /**
   * 跨站点应用的图标hover颜色
   */
  colorTextAppListIcon: string;

  /**
   * layout 的背景颜色
   */
  bgLayout: string;

  /**
   * 侧边side的 token 配置
   */
  sider: {
    colorBgCollapsedButton: string;
    colorTextCollapsedButtonHover: string;
    colorTextCollapsedButton: string;
    colorMenuBackground: string;
    colorBgMenuItemCollapsedHover: string;
    colorBgMenuItemCollapsedSelected: string;
    colorMenuItemDivider: string;
    colorBgMenuItemHover: string;
    colorBgMenuItemSelected: string;
    colorTextMenuSelected: string;
    colorTextMenuActive: string;
    colorTextMenu: string;
    colorTextMenuSecondary: string;
    paddingInlineLayoutMenu: number;
    paddingBlockLayoutMenu: number;
    /**
     * menu 顶部 title 的字体颜色
     */
    colorTextMenuTitle: string;
    colorTextSubMenuSelected: string;
  };
  /**
   * header 的 token 设置
   */
  header: {
    colorBgHeader: string;
    colorHeaderTitle: string;
    colorBgMenuItemHover: string;
    colorBgMenuItemSelected: string;
    colorTextMenuSelected: string;
    colorTextMenuActive: string;
    colorTextMenu: string;
    colorTextMenuSecondary: string;
    colorBgRightActionsItemHover: string;
    colorTextRightActionsItem: string;
    heightLayoutHeader: number;
  };

  /**
   * pageContainer
   */
  pageContainer: {
    /**
     * pageContainer 的背景颜色
     */
    colorBgPageContainer: string;
    /**
     * pageContainer 自带的 margin inline
     */
    marginInlinePageContainerContent: number;
    /**
     * pageContainer 自带的 margin block
     */
    marginBlockPageContainerContent: number;
    /**
     * pageContainer 被固定时的背景颜色
     */
    colorBgPageContainerFixed: string;
  };
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type LayoutDesignToken = BaseLayoutDesignToken & GlobalToken;

function decamelize(word: string) {
  const separator = '_';
  const split = /(?=[A-Z])/;
  return word.split(split).join(separator).toLowerCase().split(separator);
}
function firstUpperCase(str: string) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}
function sortKey(key: string) {
  return decamelize(key)
    .sort((a, b) => {
      if (['color', 'padding', 'margin', 'radius'].includes(a)) {
        return -10;
      }
      if (['color', 'padding', 'margin', 'radius'].includes(b)) {
        return 10;
      }

      if (['bg', 'text', 'border'].includes(a)) {
        return -9;
      }
      if (['bg', 'text', 'border'].includes(b)) {
        return 9;
      }
      return 0;
    })
    .map((item, index) => {
      if (index === 0) return item;
      return firstUpperCase(item);
    })
    .join('');
}
function sortToken(token: Record<string, any>) {
  const newToken = {};
  Object.keys(token)
    .sort()
    .forEach((key) => {
      if (key && typeof token[key] !== 'object') {
        newToken[sortKey(key)] = token[key];
      }
      if (key && typeof token[key] === 'object') {
        newToken[sortKey(key)] = sortToken(token[key]);
      }
    });

  return newToken;
}

export const getLayoutDesignToken: (
  baseDesignTokens: DeepPartial<LayoutDesignToken>,
  antdToken: Record<string, any>,
) => LayoutDesignToken = (designTokens, antdToken) => {
  const finalDesignTokens = { ...designTokens };
  return sortToken({
    bgLayout: 'linear-gradient(#fff, #f7f8fa 28%)',
    colorTextAppListIcon: '#666',
    appListIconHoverBgColor: finalDesignTokens?.sider?.colorBgMenuItemSelected,
    colorBgAppListIconHover: 'rgba(0, 0, 0, 0.04)',
    colorTextAppListIconHover: antdToken.colorTextBase,
    ...finalDesignTokens,
    header: {
      colorBgHeader: 'rgba(240, 242, 245, 0.4)',
      colorHeaderTitle: antdToken.colorText,
      colorBgMenuItemHover: setAlpha(antdToken.colorTextBase, 0.03),
      colorBgMenuItemSelected: 'transparent',
      colorTextMenuSelected: setAlpha(antdToken.colorTextBase, 0.95),
      colorBgRightActionsItemHover: setAlpha(antdToken.colorTextBase, 0.03),
      colorTextRightActionsItem: antdToken.colorTextTertiary,
      heightLayoutHeader: 56,
      colorTextMenu: setAlpha(antdToken.colorTextBase, 0.65),
      colorTextMenuSecondary: antdToken.colorTextTertiary,
      colorTextMenuTitle: antdToken.colorText,
      colorTextMenuActive: antdToken.colorText,
      ...finalDesignTokens.header,
    } as LayoutDesignToken['header'],
    sider: {
      paddingInlineLayoutMenu: 8,
      paddingBlockLayoutMenu: 8,
      colorBgCollapsedButton: '#fff',
      colorTextCollapsedButtonHover: antdToken.colorTextSecondary,
      colorTextCollapsedButton: setAlpha(antdToken.colorTextBase, 0.25),
      colorMenuBackground: 'transparent',
      colorBgMenuItemCollapsedHover: 'rgba(90, 75, 75, 0.03)',
      colorBgMenuItemCollapsedSelected: setAlpha(antdToken.colorTextBase, 0.04),
      colorMenuItemDivider: setAlpha(antdToken.colorTextBase, 0.06),
      colorBgMenuItemHover: 'rgba(90, 75, 75, 0.03)',
      colorBgMenuItemSelected: setAlpha(antdToken.colorTextBase, 0.04),
      colorTextMenuSelected: setAlpha(antdToken.colorTextBase, 0.95),
      colorTextMenuActive: antdToken.colorText,
      colorTextMenu: setAlpha(antdToken.colorTextBase, 0.65),
      colorTextMenuSecondary: antdToken.colorTextTertiary,
      colorTextMenuTitle: antdToken.colorText,
      colorTextSubMenuSelected: setAlpha(antdToken.colorTextBase, 0.95),
      ...finalDesignTokens.sider,
    } as LayoutDesignToken['sider'],
    pageContainer: {
      colorBgPageContainer: 'transparent',
      marginBlockPageContainerContent: 24,
      marginInlinePageContainerContent: 40,
      colorBgPageContainerFixed: '#fff',
      ...finalDesignTokens.pageContainer,
    },
  } as LayoutDesignToken) as LayoutDesignToken;
};

const defaultToken = getLayoutDesignToken({}, {});

export const ProLayoutContext = React.createContext<LayoutDesignToken>(defaultToken);

export type ProLayoutProviderProps = {
  token?: DeepPartial<LayoutDesignToken>;
  children?: React.ReactNode;
};

export const ProLayoutProvider: React.FC<ProLayoutProviderProps> = (props) => {
  const { token } = useToken();
  return (
    <ProLayoutContext.Provider
      value={{
        ...getLayoutDesignToken(props?.token || {}, token),
      }}
    >
      {props.children}
    </ProLayoutContext.Provider>
  );
};