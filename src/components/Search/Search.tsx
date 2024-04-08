import {
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { ChangeEvent, useState } from "react";

interface SearchProps {
  onSearch: (search: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch("");
  };

  const bindSearch = () => {
    onSearch(search);
  };

  return (
    <Grid container display={"flex"} justifyContent={"center"}>
      <Grid item xs={10} md={8} lg={6} marginY={"20px"}>
        <Paper
          sx={{
            padding: "4px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "secondary.main",
          }}
        >
          <InputBase
            sx={{ marginLeft: 2, flex: 1, color: "primary.main" }}
            placeholder="Search the hero by name"
            onChange={handleSearch}
            value={search}
          />
          {search && (
            <>
              <Tooltip title="Clean">
                <IconButton
                  color="primary"
                  sx={{ padding: "8px" }}
                  onClick={clearSearch}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>

              <Divider
                sx={{ height: 28, margin: 0.5 }}
                orientation="vertical"
              />
            </>
          )}
          <Tooltip title={!search ? "Desabled" : "Search"}>
            <span>
              <IconButton
                color="primary"
                type="button"
                sx={{ padding: "8px" }}
                onClick={bindSearch}
                disabled={!search}
              >
                <SearchIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Search;
