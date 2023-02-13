import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Textfield from "@mui/material/Textfield";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";

const CurrenyCounter = () => {
  return (
    <Box component="main">
      <Stack component="div" direction={"column"}>
        <Typography component="h2"> Currency Converter </Typography>

        <Stack direction={"row"}>
          <Stack direction={"row"}>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              //   value={age}
              //   onChange={handleChange}
              autoWidth
              label="Age"
            ></Select>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CurrenyCounter;
