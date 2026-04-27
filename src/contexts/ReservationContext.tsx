import { createContext, useContext, useState, useCallback } from "react";

interface ReservationContextValue {
  isOpen: boolean;
  openWidget: () => void;
  closeWidget: () => void;
}

const ReservationContext = createContext<ReservationContextValue>({
  isOpen: false,
  openWidget: () => {},
  closeWidget: () => {},
});

export const ReservationProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openWidget  = useCallback(() => setIsOpen(true),  []);
  const closeWidget = useCallback(() => setIsOpen(false), []);

  return (
    <ReservationContext.Provider value={{ isOpen, openWidget, closeWidget }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => useContext(ReservationContext);
