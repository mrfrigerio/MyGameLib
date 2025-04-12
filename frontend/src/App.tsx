import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/Auth";
import { Box, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { darkTheme } from "./styles/theme";
import Routes from "./routes";
import GlobalStyles from "./styles/GlobalStyles";
import { SearchProvider } from "./context/Search";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <AuthProvider>
        <ThemeProvider theme={darkTheme}>
          <Box
            sx={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ToastContainer
              theme="colored"
              toastStyle={{ whiteSpace: "pre-line" }}
            />
            <SearchProvider>
              <Routes />
            </SearchProvider>
          </Box>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
