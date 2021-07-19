// ---------------------------------------------------

export default function AppBar(theme) {
  return {
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          backgroundImage: 'none'
        }
      }
    }
  };
}
