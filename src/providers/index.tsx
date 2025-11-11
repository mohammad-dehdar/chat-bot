"use client";

import type { PropsWithChildren } from "react";
import { AuthProvider } from "./auth-provider";
import { RoleProvider } from "@/lib/auth/RoleContext";
import { DataProvider } from "@/features/data/DataContext";
import { env } from "@/config/env";

export default function Providers({ children }: PropsWithChildren) {
    return (
        <AuthProvider
            config={{
                mode: env.NODE_ENV === "development" ? "development" : "production",
                authJobId: 27, // Your auth jobId
            }}
        >
            <RoleProvider>
                <DataProvider>{children}</DataProvider>
            </RoleProvider>
        </AuthProvider>
    );
}