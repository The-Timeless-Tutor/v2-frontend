import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setSession, clearSession } from 'src/utils/authUtils'; // Assuming utils.js is in the same directory
import { useAuth } from "src/contexts/AuthContext";

const OAuthCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { setIsAuthenticated } = useAuth();

    useEffect(() => {
        const exchangeCodeForToken = async () => {
            const code = new URLSearchParams(location.search).get("code");
            if (!code) {
                console.error("Authorization code not found.");
                navigate("/signup", { replace: true });
                return;
            }

            try {
                const response = await fetch(`${backendUrl}api/google_login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ code }),
                });

                if (!response.ok) {
                    console.error("Failed to exchange code for token.");
                    clearSession(); // Ensure session is clear on failure
                    navigate("/signup", { replace: true });
                    return;
                }

                const data = await response.json();
                console.log("Token exchange successful:", data);

                // Save the session details using setSession
                setSession({
                    access_token: data.data.access_token,
                    refresh_token: data.data.refresh_token,
                    access_token_expiry: data.data.access_token_expiry,
                    refresh_token_expiry: data.data.refresh_token_expiry,
                });

                setIsAuthenticated(true); // Ensure setIsAuthenticated is updated accordingly
                navigate("/"); // Navigate to a welcome or dashboard page
            } catch (error) {
                console.error("Error exchanging code for token:", error);
                clearSession(); // Ensure session is clear on error
                navigate("/signup", { replace: true });
            }
        };

        exchangeCodeForToken();
    }, [location, navigate, backendUrl, setIsAuthenticated]);

    return <div>Processing OAuth callback. Please wait...</div>;
};

export default OAuthCallback;
