import { DataStore } from "aws-amplify";
import { createContext, useContext, useEffect, useState } from "react";
import { School } from "../src/models";

export const SchooolContext = createContext({});

export function useSchoolcontext() {
  return useContext(SchooolContext);
}
export function SchoolProvider({ children }: any) {
  const [school, setSchool] = useState({});
  const schoolId = "7eb7dd4f-6944-4136-b482-ff7023d728f9";
  useEffect(() => {
    const subscription = DataStore.observeQuery(School, (c) =>
      c.id("eq", schoolId)
    ).subscribe((msg) => {
      console.log(msg);
      setSchool(msg);
    });

    return () => {
      subscription && subscription.unsubscribe();
    };
  }, []);

  return (
    <SchooolContext.Provider value={school}>{children}</SchooolContext.Provider>
  );
}
