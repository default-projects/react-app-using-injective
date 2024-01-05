import React from 'react';
import ReactDOM from 'react-dom/client';

import './assets/style/global.scss';
import { Routers } from './routers.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routers />
  </React.StrictMode>
)
