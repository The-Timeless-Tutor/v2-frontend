import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const WorldcoinOAuthCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { setIsAuthenticated } = useAuth();

    useEffect(() => {
        const exchangeCodeForToken = async () => {
            const code = new URLSearchParams(location.search).get("code");

            if (!code) {
                console.error("Worldcoin authorization code not found.");
                navigate("/login", { replace: true });
                return;
            }

            try {
                const response = await fetch(
                    `${backendUrl}registration/callback`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ code }),
                    }
                );

                if (!response.ok) {
                    console.error("Failed to exchange Worldcoin code for token.");
                    navigate("/login", { replace: true });
                    return;
                }

                const data = await response.json();
                console.log("Worldcoin token exchange successful:", data);
                setIsAuthenticated(true);
                navigate("/"); // Redirect user upon successful authentication
            } catch (error) {
                console.error("Error exchanging Worldcoin code for token:", error);
                navigate("/login", { replace: true });
            }
        };

        exchangeCodeForToken();
    }, [location, navigate, backendUrl, setIsAuthenticated]);

    return <div>Processing Worldcoin OAuth callback. Please wait...</div>;
};

export default WorldcoinOAuthCallback;
