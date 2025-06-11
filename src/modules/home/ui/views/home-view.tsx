"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const HomeView = () => {
  const { data } = authClient.useSession();
  const router = useRouter();
  return (
    <>
      {data ? (
        <div>
          <p>Loggedin as {data?.user?.name}</p>
          <Button
            onClick={() => {
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.refresh();
                  },
                },
              });
            }}
          >
            Sign out
          </Button>
        </div>
      ) : (
        <p>Home page</p>
      )}
    </>
  );
};

export default HomeView;
