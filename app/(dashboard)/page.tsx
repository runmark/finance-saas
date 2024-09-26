"use client";

import { Button } from "@/components/ui/button";
import { useNewAccountState } from "@/features/accounts/hooks-state/use-new-account-state";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  const { isOpen, open, close } = useNewAccountState();

  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>

      <Button onClick={open}>open the account sheet</Button>
    </div>
  );
}
