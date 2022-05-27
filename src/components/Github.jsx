import React, { useEffect, useReducer, useState } from "react";
import { Avatar, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";

const initialState = {
  loading: true,
  error: false,
  data: null,
};

const GithubActions = {
  fetch: "fetch",
  success: "success",
  failure: "failure",
};

const githubReducer = (state, action) => {
  switch (action.type) {
    case GithubActions.fetch:
      return {
        ...state,
        loading: true,
        error: false,
        data: null,
      };
    case GithubActions.success:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      };
    case GithubActions.failure:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return { state };
  }
};

export const Github = () => {
  const [{ loading, error, data }, dispatch] = useReducer(
    githubReducer,
    initialState
  );

  useEffect(() => {
    dispatch({
      type: GithubActions.fetch,
    });
    axios({
      url: "https://api.github.com/search/users",
      params: {
        q: "masai",
      },
    })
      .then((response) => {
        dispatch({
          type: GithubActions.success,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GithubActions.failure,
        });
      });
  }, []);
  //  console.log(data);

  return (
    <Stack spacing={2} sx={{ width: "600px", margin: "auto" }}>
      <Typography variant="h2">Github Users</Typography>
      {loading && <Typography variant="h5">Loading...</Typography>}
      {error && <Typography variant="h5">Error...</Typography>}
      <Stack spacing={3} direction="row">
        <TextField
          fullWidth
          variant="standard"
          label="Search Github Users"
          placeholder="Type..."
          color="secondary"
        />
        <Button
          color="secondary"
          variant="contained"
          onClick={(e) => setQuery(e.target.value)}
        >
          Search
        </Button>
      </Stack>
      {data?.items.map((item) => (
        <Stack
          spacing={2}
          direction="row"
          key={item.id}
          sx={{ border: "1px solid black", borderRadius: "10px" }}
        >
          <img src={item.avatar_url} />
          <Stack>
            <Typography variant="h4">{item.login}</Typography>
            <Typography variant="p">Type: {item.type}</Typography>
            <Typography variant="p">Node ID: {item.node_id}</Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};
