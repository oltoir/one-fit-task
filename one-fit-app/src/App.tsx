import React from 'react';
import Header from './components/Header/Header'
import MainPage from "./components/Pages/Main.page";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

function App() {
    let example = 0
  return (
  <QueryClientProvider client={queryClient}>
    <div className="App">
        <Header/>
        <MainPage/>
    </div>
  </QueryClientProvider>
  );
}

export default App;
