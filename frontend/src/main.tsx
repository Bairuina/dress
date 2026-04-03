import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App, ConfigProvider, theme } from 'antd';

import { AuthProvider } from './hooks';
import { AppRouter } from './router';
import './styles/global.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ConfigProvider
          theme={{
            algorithm: theme.defaultAlgorithm,
            token: {
              colorPrimary: '#1677ff',
              colorInfo: '#1677ff',
              colorSuccess: '#2f9e44',
              colorWarning: '#f08c00',
              colorError: '#d4380d',
              colorTextBase: '#14213d',
              colorBgBase: '#f4fbff',
              colorBgLayout: '#eef7ff',
              colorBgContainer: '#fbfeff',
              colorBgElevated: '#ffffff',
              borderRadius: 22,
              borderRadiusLG: 28,
              lineWidth: 2,
              boxShadowSecondary: '0 12px 30px rgba(22, 119, 255, 0.14)',
            },
            components: {
              Layout: {
                bodyBg: '#eef7ff',
                siderBg: 'rgba(195, 230, 255, 0.92)',
                headerBg: 'rgba(255, 255, 255, 0.7)',
                triggerBg: 'rgba(214, 239, 255, 0.92)',
              },
              Card: {
                colorBgContainer: 'rgba(255, 255, 255, 0.84)',
                boxShadowTertiary: '0 12px 30px rgba(22, 119, 255, 0.12)',
              },
              Menu: {
                itemBg: 'transparent',
                itemSelectedBg: '#ffffff',
                itemHoverBg: 'rgba(255,255,255,0.72)',
                itemColor: '#284569',
                itemSelectedColor: '#1677ff',
              },
              Button: {
                borderRadius: 999,
                primaryShadow: '4px 6px 0 rgba(20, 33, 61, 0.12)',
              },
              Input: {
                activeShadow: '0 0 0 3px rgba(22, 119, 255, 0.14)',
              },
              Select: {
                optionSelectedBg: 'rgba(22, 119, 255, 0.1)',
              },
              Modal: {
                contentBg: 'rgba(255, 255, 255, 0.92)',
                headerBg: 'transparent',
              },
            },
          }}
        >
          <App>
            <AppRouter />
          </App>
        </ConfigProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
