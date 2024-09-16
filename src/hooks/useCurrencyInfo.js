import { useEffect, useState } from "react";

const formattedDate = () => {
  let today = new Date();
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, "0");
  let date = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
};

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetching = async () => {
    try {
      const response = await fetch(
        `https://${formattedDate()}.currency-api.pages.dev/v1/currencies/${currency}.json`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const currencyData = await response.json();
      return currencyData[currency];
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetching().then((response) => {
      if (response) {
        setData(response);
      }
    });
  }, [currency]);

  return { data, loading, error };
}

export default useCurrencyInfo;

/*
https://2024-09-16.currency-api.pages.dev/v1/currencies/bdt.json
*/
