import { PrimeReactProvider } from 'primereact/api';
import { store } from './redux/store';
import { Provider } from 'react-redux';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react';

const queryClient = new QueryClient()

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/modern/production.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);




export default function AppProviders({ children }) {
    const [showDevtools, setShowDevtools] = React.useState(false)

    React.useEffect(() => {
      // @ts-ignore
      window.toggleDevtools = () => setShowDevtools((old) => !old)
    }, [])
    return (
        <Provider store={store}>
             <QueryClientProvider client={queryClient}>
                <PrimeReactProvider >
                    {children}
                </PrimeReactProvider>
                <ReactQueryDevtools initialIsOpen />
                {showDevtools && (
                    <React.Suspense fallback={null}>
                    <ReactQueryDevtoolsProduction />
                    </React.Suspense>
                )}
             </QueryClientProvider>
        </Provider>
    );
}