import React from 'react';
import ReactDOM from 'react-dom/client';

import './assets/style/global.scss';
import { Routers } from './routers.tsx';
import { ContextProvider } from './provider/index.tsx';
import { MuiThemeProvider } from './provider/muiTheme.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <MuiThemeProvider>
        <Routers />
      </MuiThemeProvider>
    </ContextProvider>
  </React.StrictMode>
)
