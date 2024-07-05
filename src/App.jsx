import React, { useState, useEffect } from 'react';
import { fetchData } from './api'; // Assuming fetchData is defined in ./api

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData();
        if (response.Error) {
          setError(response);
        } else {
          setData(response);
        }
      } catch (error) {
        console.error(error);
        setError({
          Error: 1,
          Description: "An unexpected error occurred.",
          MessageToShow: "Sorry, an error occurred. Please try again later.",
          NextAction: { Action: 7, Name: "Close" },
        });
      }
    };

    getData();
  }, []);

  const handleErrorAction = () => {
    if (error.NextAction.Action === 7) {
      window.close();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="bg-blue-600 text-white w-full p-4 text-center">
        <h1 className="text-2xl font-bold">MobiBox Users Acquisition</h1>
      </header>
      <main className="flex-1 w-full p-4">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          {error ? (
            <div className="p-4 bg-red-100 text-red-800 rounded-md shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Error {error.Error}</h2>
              <p className="mb-2">{error.Description}</p>
              <p>{error.MessageToShow}</p>
              {error.NextAction && (
                <button
                  onClick={handleErrorAction}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  {error.NextAction.Name}
                </button>
              )}
            </div>
          ) : data ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Users List</h2>
              <ul className="space-y-4">
                {data.users.map((user, index) => (
                  <li key={index} className="p-4 bg-gray-50 rounded-md shadow-sm">
                    <p className="text-lg font-medium">{user.name}</p>
                    <p>{user.email}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
              <p className="ml-4">Loading...</p>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-blue-600 text-white w-full p-4 text-center">
        <p>&copy; 2024 MobiBox</p>
      </footer>
    </div>
  );
}

export default App;
