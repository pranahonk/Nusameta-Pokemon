import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/themes";
import { Provider } from "react-redux";
import store from "../store/store";
import Header from "../Components/Header";
import "../styles/global.css";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';


const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
              <Header />
              <Component {...pageProps} />
          </QueryClientProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
