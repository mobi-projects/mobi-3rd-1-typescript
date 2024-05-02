import "@/libs/tailwind-css/global.css"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { DialogProvider } from "./components/dialog/dialog.context"
import { defaultQueryClient } from "./libs/react-query"
import { Router } from "./libs/react-router-dom"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={defaultQueryClient}>
      <DialogProvider>
        <RouterProvider router={Router} />
        <ReactQueryDevtools initialIsOpen={true} />
      </DialogProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
