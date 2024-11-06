import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { appRouter } from './router';

import './index.css'
import LoadingPage from './pages/others/loading-page';


const router = createBrowserRouter(appRouter);

const App = () => {
  return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
        <Suspense fallback={<LoadingPage />} >
          <RouterProvider router={router} />
        </Suspense>
      </div>
  );
};

export default App;
