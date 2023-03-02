import React from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "react-query";

import App from './App'
import NotificationContext from "./contexts/NotificationContext";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContext>
      <App/>
    </NotificationContext>
  </QueryClientProvider>
)
