import { styled } from "@mui/material"

export const Item = styled("div")(({ theme }) => ({
  display: "flex",
  margin: `${theme.spacing(1)} 0`,
  ...theme.typography.body2,
  "& > span": {
    flex: 1
  },
  "& >  svg": {
    paddingRight: theme.spacing(1) // Adjust this to add more or less space
  },
  "& > span:last-child": {
    textAlign: "right"
  },
  backgroundColor: "#f8f9fa",
  border: "1px solid #e9ecef",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1)
}))
