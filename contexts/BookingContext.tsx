"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import type { BookingData } from "./types";

interface BookingContextType {
  booking: BookingData;
  setBooking: React.Dispatch<
    React.SetStateAction<BookingData>
  >;
  resetBooking: () => void;
}

const BookingContext = createContext<
  BookingContextType | undefined
>(undefined);

export function BookingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [booking, setBooking] =
    useState<BookingData>({});

  function resetBooking() {
    setBooking({});
  }

  return (
    <BookingContext.Provider
      value={{
        booking,
        setBooking,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error(
      "useBooking deve ser utilizado dentro do BookingProvider."
    );
  }

  return context;
}