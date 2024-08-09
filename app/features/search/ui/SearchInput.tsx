"use client";

import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { memo } from "react";
import { useDebouncedCallback } from "use-debounce";

export const SearchInput = memo(function() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleOnChange = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const params = new URLSearchParams(searchParams);
    const term = event.target.value.trim();
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <TextField
      onChange={(event) => handleOnChange(event)}
      defaultValue={searchParams.get('query')?.toString()}
      fullWidth
      label="Type to search"
      sx={{ maxWidth: "800px", mt: { xs: 0, sm: "1rem" }, mb: { xs: 0, sm: "2rem" } }}
      InputProps={{
        endAdornment: <InputAdornment position="end">
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }}
    />
  )
});