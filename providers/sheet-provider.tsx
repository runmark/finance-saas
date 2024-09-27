"use client";

import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet";
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import { useMountedState } from "react-use";

export const SheetProvider = () => {
  const isMounted = useMountedState();
  if (!isMounted) return null;

  // const [isMounted, setIsMounted] = useState(false);
  // useEffect(() => {
  //     setIsMounted(true);
  // }, []);

  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  );
};
