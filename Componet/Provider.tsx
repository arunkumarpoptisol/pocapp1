import { createContext, useContext, useState } from "react";

export const AppContext = createContext({
  theme: "dark",
});

export function useAppcontext() {
  return useContext(AppContext);
}
export function Provider({ children }: any) {
  const [theme, setTheme] = useState("light");

  function ChangeTheme() {
    setTheme(theme == "light" ? "dark" : "light");
  }
  let sharedState = {
    theme: theme,
    ChangeTheme: ChangeTheme,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}
