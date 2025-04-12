import React, { useEffect, useRef } from "react";
import {
  FormControl,
  FormLabel,
  InputAdornment,
  TextField as MUITextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Controller, useFormContext } from "react-hook-form";

interface IRHTextField {
  name: string;
  label?: string;
  defaultValue?: string;
  placeholder: string;
  onBlurEvent?: (event: React.FocusEvent<HTMLInputElement>) => void;
  maxLength?: number;
  [key: string]: string | boolean | number | Function | undefined;
}

export const TextField: React.FC<IRHTextField> = ({
  name,
  label,
  placeholder,
  defaultValue = "",
  onBlurEvent,
  maxLength = 50,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const theme = useTheme();

  const isMounted = useRef(true); // Initial value _isMounted = true

  useEffect(() => {
    return () => {
      // Component Will Unmount
      isMounted.current = false;
    };
  }, []);

  return (
    <FormControl size="small" sx={{ width: "100%" }}>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        render={({ field: { ref, ...field } }) => (
          <FormLabel sx={{ flex: 1 }}>
            <Typography
              variant="subtitle1"
              color={theme.palette.mode === "light" ? "#343734" : "#f4f4f4"}
              sx={{ fontSize: "1.1rem", mb: 2 }}
            >
              {label}
            </Typography>

            <MUITextField
              {...field}
              spellCheck={false}
              // placeholder={placeholder}
              label={placeholder}
              autoComplete="off"
              fullWidth
              inputRef={ref}
              error={
                (errors[name.split(".")[0]] &&
                  typeof errors[name.split(".")[0]] === "object" &&
                  !!(errors[name.split(".")[0]] as any)?.[name.split(".")[1]]?.[
                    name.split(".")[2]
                  ]) ||
                !!errors[name]
              }
              // helperText={errors[name]?.message as React.ReactNode}
              size="small"
              variant="outlined"
              onBlur={onBlurEvent}
              slotProps={{
                input: {
                  endAdornment: ((errors[name.split(".")[0]] &&
                    typeof errors[name.split(".")[0]] === "object" &&
                    !!(errors[name.split(".")[0]] as any)?.[
                      name.split(".")[1]
                    ]?.[name.split(".")[2]]) ||
                    !!errors[name]) && (
                    <InputAdornment position="end">
                      <Tooltip
                        title={
                          (errors[name]?.message as string) ||
                          (errors[name.split(".")[0]] &&
                            typeof errors[name.split(".")[0]] === "object" &&
                            (errors[name.split(".")[0]] as any)?.[
                              name.split(".")[1]
                            ]?.[name.split(".")[2]]?.message)
                        }
                      >
                        <InfoIcon color="error" sx={{ fontSize: 14 }} />
                      </Tooltip>
                    </InputAdornment>
                  ),
                },
                htmlInput: {
                  maxLength,
                },
              }}
              {...rest}
            />
          </FormLabel>
        )}
      />
    </FormControl>
  );
};
