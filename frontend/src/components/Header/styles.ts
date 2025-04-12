import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));
