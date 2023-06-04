import * as React from "react";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useSpinner } from "../../context/loaderContext/globalSpinnerContext";
import dropdloader2 from "../../assets/images/dropdloader2.gif"

export default function CircularIndeterminate() {
  const spinner = useSpinner();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(spinner.isLoading);
  }, [spinner]);
 
  return (
    // <Stack sx={{ color: "pink" }} spacing={2} direction="row">
    //   {isLoading ? <CircularProgress color="inherit" /> : ""}
    // </Stack>
    <div>
      {isLoading? <img className="animate-svg-stroke-1" style={{zIndex:99999}} src={dropdloader2}/> :""}
    </div>
  );
}