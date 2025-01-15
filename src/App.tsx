import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormEditor from "./pages/FormEditor";
import FormsList from "./pages/FormsList";
import FormTryout from "./pages/FormTryout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/tryout" element={<FormTryout />} />
            <Route path="/forms" element={<FormsList />} />
            <Route path="/forms/:id" element={<FormEditor />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
