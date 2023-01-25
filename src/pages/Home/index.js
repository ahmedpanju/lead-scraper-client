import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome! Please select one of the follwing scrapers</h1>
      <Button variant="outlined" onClick={() => navigate("/github")}>
        GITHUB
      </Button>
    </div>
  );
};

export default Home;
