"use client";

import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet";
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import EditCategorySheet from "@/features/categories/components/edit-category-sheet";
import { NewCategorySheet } from "@/features/categories/components/new-category-sheet";

export const SheetProvider = () => {
  // const isMounted = useMountedState();
  // if (!isMounted) return null;

  // const [isMounted, setIsMounted] = useState(false);
  // useEffect(() => {
  //     setIsMounted(true);
  // }, []);

  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />

      <NewCategorySheet />
      <EditCategorySheet />
    </>
  );
};
