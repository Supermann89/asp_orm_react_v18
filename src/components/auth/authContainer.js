import React from "react";
import { Paper, Container, Grid } from "@mui/material";

function AuthContainer(props) {
  return (
    <Container maxWidth="sm" sx={{ marginTop: "10rem" }}>
      <Paper>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          px={2}
          rowSpacing={2}
        >
          {props.children}
        </Grid>
      </Paper>
    </Container>
  );
}

export default AuthContainer;
