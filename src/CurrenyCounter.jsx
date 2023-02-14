import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Textfield from "@mui/material/Textfield";
// import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";

import { FetchData } from "./utils/FetchCurrency";
import { debounce } from "lodash";

const symbolsURL = "https://api.apilayer.com/fixer/symbols";

const CurrenyCounter = () => {
  const [state, setState] = useState({
    amount: "",
    to: "",
    from: "",
  });

  const [exchangeData, setExchangeData] = useState("");
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    (async function () {
      if (state.amount === "" || state.to === "" || state.from === "") return;

      const data = await FetchData({ ...state });

      if (!data.message || !data.error) setExchangeData({ ...data });
    })();
  }, [state]);

  useEffect(() => {
    (async function () {
      const response = await fetch(symbolsURL, {
        method: "GET",
        headers: new Headers({ apiKey: import.meta.env.VITE_APIKEY }),
      });

      const data = await response.json();
      setSymbols(Object.keys(data?.symbols));
    })();
  }, []);

  const handleChange = debounce((e) => {
    const { name, value } = e.target;

    setState((state) => ({
      ...state,
      [name]: value,
    }));
  }, 1000);

  return (
    <Box component="main">
      <Box sx={{ p: "2rem" }} component={Card}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Stack
            component="div"
            direction={"column"}
            justifyContent="center"
            alignItems={"center"}
            spacing={2}
          >
            <Typography component="h1" sx={{ fontSize: "2rem" }}>
              Currency Converter
            </Typography>

            <Stack direction={"row"} spacing={3}>
              <Stack direction={"row"} spacing={0.1}>
                <Select
                  name="from"
                  value={state?.from}
                  onChange={handleChange}
                  autoWidth
                  sx={{ background: "#fff" }}
                >
                  {symbols?.map((country, i) => (
                    <MenuItem value={country} key={i}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
                <Textfield
                  label="From"
                  name="amount"
                  onChange={handleChange}
                  sx={{ color: "#fff", background: "#fff" }}
                />
              </Stack>

              <Stack direction={"row"} spacing={0.1}>
                <Select
                  name="to"
                  value={state?.to}
                  onChange={handleChange}
                  autoWidth
                  label="To"
                  sx={{ background: "#fff" }}
                >
                  {symbols?.map((country, i) => (
                    <MenuItem value={country} key={i}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
                <Textfield
                  label="To"
                  sx={{ color: "#fff", background: "#fff" }}
                  disabled
                  value={exchangeData?.result}
                />
              </Stack>
            </Stack>
          </Stack>
        </FormControl>
      </Box>
    </Box>
  );
};

export default CurrenyCounter;
