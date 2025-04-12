import React, { useState } from "react";
import { InputBase, Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(() => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  // maxWidth: 600,
  margin: "0 30px",
  padding: "4px 12px",
  borderRadius: 40,
  "&:hover": {
    backgroundColor: "#3b3b3b",
    transition: "0.2s",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
  fontSize: "1rem",
  color: "#cecece",
}));

const SearchBar: React.FC<{
  onSearch?: (query: string) => void;
  games?: number;
}> = ({ onSearch, games }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <StyledPaper>
      <IconButton aria-label="search" onClick={handleSearch} disabled>
        <SearchIcon />
      </IconButton>
      <StyledInputBase
        placeholder={`Pesquise por ${
          games?.toLocaleString("pt-BR") ?? ""
        } jogos...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        inputProps={{ "aria-label": "search games" }}
      />
    </StyledPaper>
  );
};

export default SearchBar;
