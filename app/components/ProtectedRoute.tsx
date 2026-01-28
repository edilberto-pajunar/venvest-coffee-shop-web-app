"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../login/service/auth_service";
import { COFFEE_PALETTE } from "../constants/theme";
import { Activity } from "lucide-react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div 
                className="min-h-screen flex items-center justify-center"
                style={{ backgroundColor: COFFEE_PALETTE.background }}
            >
                <div className="text-center">
                    <Activity 
                        className="w-8 h-8 mx-auto mb-2 animate-spin" 
                        style={{ color: COFFEE_PALETTE.primary }} 
                    />
                    <p className="text-sm" style={{ color: COFFEE_PALETTE.textSecondary }}>
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}
