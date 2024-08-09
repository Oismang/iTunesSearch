"use client";

import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MEDIA_TYPES } from '../constants/media-types';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { memo } from 'react';

export const SearchFilters = memo(function () {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleOnChange = (event: SelectChangeEvent<string>) => {
    const params = new URLSearchParams(searchParams);
    const type = event.target.value;
    params.set("page", "1");

    if (type) {
      params.set("mediatype", type);
    } else {
      params.delete("mediatype");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <Typography sx={{mb: 2}} variant="body1">
        Filters
      </Typography>
      <Select
        fullWidth
        defaultValue={searchParams.get("mediatype")?.toString() || "all"}
        onChange={handleOnChange}
        label="Age"
      >
        {MEDIA_TYPES.map((type) => (
          <MenuItem key={type} value={type}>{type}</MenuItem>
        ))}
      </Select>
    </>
  )
});