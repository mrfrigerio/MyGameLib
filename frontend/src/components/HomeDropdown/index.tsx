import { Controller, Control } from "react-hook-form";
import Input from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IconButton, InputAdornment, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface DropdownProps {
  values: string[];
  placeholder: string;
  name: string;
  control: Control;
}

export const HomeDropdown: React.FC<DropdownProps> = ({
  values,
  placeholder,
  name,
  control,
}) => {
  return (
    <FormControl sx={{ minWidth: 180 }}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            size="small"
            displayEmpty
            autoWidth
            value={field.value || ""}
            onChange={field.onChange}
            notched={undefined}
            input={
              <Input
                disableInjectingGlobalStyles
                sx={{
                  backgroundColor: "#1E1E1E",
                  borderRadius: 2,
                }}
              />
            }
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <Typography variant="caption" sx={{ ml: 2 }}>
                    {placeholder}
                  </Typography>
                );
              }

              return (
                <Typography variant="caption" sx={{ ml: 2 }}>
                  {selected}
                </Typography>
              );
            }}
            endAdornment={
              field.value && (
                <InputAdornment sx={{ marginRight: "30px" }} position="end">
                  <IconButton size="small" onClick={() => field.onChange("")}>
                    <ClearIcon sx={{ fontSize: "15px" }} />
                  </IconButton>
                </InputAdornment>
              )
            }
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <Typography variant="caption">{placeholder}</Typography>
            </MenuItem>
            {values.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};
