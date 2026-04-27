import { OPENTABLE_URL } from "@/constants";

export const MobileBookButton = () => {
  return (
    <a
      href={OPENTABLE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-4 right-4 z-[90] lg:hidden bg-primary text-primary-foreground text-center py-3 text-sm tracking-[0.2em] font-body font-medium rounded shadow-lg"
    >
      BOOK A TABLE
    </a>
  );
};
