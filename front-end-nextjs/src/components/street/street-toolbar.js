import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Grid,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { useEffect, useState } from "react";
import { API, CONFIG } from "./../../utils/api";
import axios from "axios";
import Link from "next/link";

export const StreetListToolbar = (props) => {
  let { limit, page, fetchStreets, setPage } = props;
  const [searchValue, setSearchValue] = useState();
  const [searchOptions, setSearchOptions] = useState([{ value: "0", label: "All State" }]);
  const [selectedOptions, setSelectedOptions] = useState(0);

  const handleChange = (event) => {
    setSelectedOptions(event.target.value);
    setPage(0);
  };

  const fetchDistricts = async () => {
    await axios.get(API.GET_DISTRICTS.url, CONFIG).then((res) => {
      const districtsToOptions = res.data.map((district) => ({
        value: district.id,
        label: district.name,
      }));
      districtsToOptions.unshift({
        value: "0",
        label: "All State",
      });
      setSearchOptions(districtsToOptions);
    });
  };

  useEffect(() => {
    const fetchTimeout = setTimeout(() => {
      fetchStreets(limit, page, searchValue, selectedOptions);
    }, 300);

    return () => {
      clearTimeout(fetchTimeout);
    };
  }, [fetchStreets, limit, page, searchValue, selectedOptions]);

  useEffect(() => {
    fetchDistricts();
  }, []);

  return (
    <Box {...props} sx={{ mt: 3 }}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Streets
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="primary" variant="contained">
            <Link href="streets/new">
              <a className="text-decoration-none text-white">Add Street</a>
            </Link>
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12} sx={{ maxWidth: 500 }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon color="action" fontSize="small">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Search customer"
                    variant="outlined"
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item md={3} xs={12} />
                <Grid item md={3} xs={12}>
                  <TextField
                    fullWidth
                    name="state"
                    onChange={handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={selectedOptions}
                    variant="outlined"
                  >
                    {searchOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
