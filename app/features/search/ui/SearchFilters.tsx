"use client";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Rating, Switch, Typography, useMediaQuery } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { memo } from 'react';
import { MEDIA_TYPES } from '../constants/media-types';

const ratings = [5, 4, 3, 2, 1];

export const SearchFilters = memo(function () {
  const isLargerScreen = useMediaQuery("(min-width: 600px)");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateSearchParams = (param: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  const isChecked = (rating: number) => {
    const ratingParams = searchParams.get("rating");

    return ratingParams
      ? ratingParams.split(",").some(ratingParam => ratingParam === rating.toString())
      : false;
  }

  const handleSelectOnChange = (event: SelectChangeEvent<string>) => {
    updateSearchParams("mediatype", event.target.value);
  }

  const handleCheckBoxOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ratingParams = searchParams.get("rating");
    const value = event.target.name;
    const isChecked = event.target.checked;
    let newValue;

    if (!ratingParams) {
      newValue = value;
    } else {
      let ratingsArray = ratingParams.split(",");

      if (isChecked) {
        ratingsArray.push(value);
      } else {
        ratingsArray = ratingsArray.filter(rating => rating !== value);
      }

      newValue = ratingsArray.join(",");
    }

    updateSearchParams("rating", newValue);
  }

  const handleSwitchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchParams("favorite", event.target.checked.toString());
  };

  const renderComponent = (): JSX.Element =>
    <>
      <FormControl variant="standard" sx={{ mb: 2 }} component="fieldset" fullWidth>
        <FormLabel component="legend">Media type</FormLabel>
        <FormGroup>
          <Select
            variant="outlined"
            fullWidth
            defaultValue={searchParams.get("mediatype")?.toString() || "all"}
            onChange={handleSelectOnChange}
          >
            {MEDIA_TYPES.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormGroup>
      </FormControl>
      <FormControl variant="standard" sx={{ mb: 2 }} component="fieldset" fullWidth>
        <FormLabel component="legend">Rating</FormLabel>
        <FormGroup>
          {ratings.map((rating) => (
            <FormControlLabel key={rating}
              control={
                <Checkbox checked={isChecked(rating)}
                  name={rating.toString()}
                  onChange={handleCheckBoxOnChange}
                />
              }
              label={<Rating value={rating} readOnly />}
            />
          ))}
        </FormGroup>
      </FormControl>
      <FormControl variant="standard" component="fieldset" fullWidth>
        <FormLabel component="legend">Favorites</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                defaultChecked={searchParams.get("favorite") === "true"}
                onChange={handleSwitchOnChange} />
            }
            label="Show only favorites"
          />
        </FormGroup>
      </FormControl>
    </>

  const renderWithoutAccordion = () =>
    <Box>
      <Typography sx={{ mb: 2 }} variant="h6">
        Filters
      </Typography>
      {renderComponent()}
    </Box>

  const renderWithAccordion = () =>
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
        <Typography variant="h6">
          Filters
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{renderComponent()}</AccordionDetails>
    </Accordion>

  return isLargerScreen ? renderWithoutAccordion() : renderWithAccordion();
});