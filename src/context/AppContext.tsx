"use client";

import React, { createContext, useContext, useState } from "react";
import { CulturalObject } from "@/types";

interface AppContextType {
  selectedObject: CulturalObject | null;
  setSelectedObject: (obj: CulturalObject | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedObject, setSelectedObject] = useState<CulturalObject | null>(null);

  return (
    <AppContext.Provider value={{ selectedObject, setSelectedObject }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}
