import React, { useEffect, useState } from 'react';
import './App.css';
import { SearchForm } from "./components/searchForm";
import { TableDisplay } from "./components/tableDisplay";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';



function App() {

  const [backendData, setBackendData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);


  const goBack = () => {
    setIsLoading(false);
    setShowTable(false);
  }

  const callApi = (startDate, endDate, selectedField, input) => {
    setIsLoading(true);
    const searchType = 'JSON';
    // const searchType = 'MONGO'
    // const searchType = 'SQL';
    const page = 0;

    fetch(`/api/${searchType}/?selectedField=${selectedField}&searchValue=${input}&startDate=${startDate}&endDate=${endDate}&page=${page}`).then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
        setIsLoading(false);
        setShowTable(true);
      }
    )
  }

  const GoBack = () => {
    return (
      <Button onClick={goBack} variant="contained">Go Back to search</Button>
    );
  };

  return (
    <div className="App">
      {(isLoading) ? (
        <>
          <Box className="box">
            <CircularProgress />
          </Box>
          <GoBack />
        </>
      ) : (
        <>
          <HomePageHeader />

          {(showTable) ? (
            <>
              <TableDisplay data={backendData} />
              <GoBack />
            </>
          ) : (
            <>
              <SearchForm callApi={callApi} />
            </>)}
        </>
      )}

    </div>
  );
}

const HomePageHeader = () => {
  return (
    <header className="header">
      <h2>Users Dashboard</h2>
    </header>
  );
};





export default App;
