import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCookie, setCookie } from "../../utilities/cookieUtils";

const backendUrl = 'http://localhost:5050';

export const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            var accessToken = getCookie('accessToken');
            if (!accessToken) {
                const refreshToken = getCookie('refreshToken');
                if (!refreshToken) {
                    navigate('/login');
                    return;
                }

                try {
                    const response = await axios.post(`${backendUrl}/spotify/refresh-token`, {
                        refreshToken
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log(response)
                    if (response.status === 200) {
                        if (response.data) {
                            setCookie('accessToken', response.data);
                            window.location.reload();
                            navigate('/main/home')
                        } else {
                            throw new Error('No access token received');
                        }
                    } else {
                        throw new Error('Failed to refresh access token');
                    }
                } catch (error) {
                    console.error('Failed to refresh access token:', error);
                    navigate('/login');
                    return;
                }
            }
            try {
                const profileResponse = await axios.get(`${backendUrl}/spotify/profile`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (profileResponse.status === 200) {
                    navigate('/main/home');
                } else {
                    console.error('Failed to fetch profile:', profileResponse);

                    if (profileResponse.status === 401) {
                        const refreshToken = getCookie('refreshToken');
                        try {
                            const response = await axios.post(`${backendUrl}/spotify/refresh-token`, {
                                refreshToken
                            }, {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });

                            if (response.status === 200) {
                                accessToken = response.data.accessToken;
                                setCookie('accessToken', accessToken);
                                // Retry fetching profile with new access token
                                const retryProfileResponse = await axios.get(`${backendUrl}/spotify/profile`, {
                                    headers: {
                                        'Authorization': `Bearer ${accessToken}`
                                    }
                                });

                                if (retryProfileResponse.status === 200) {
                                    navigate('/main/home');
                                } else {
                                    console.error('Retry failed to fetch profile:', retryProfileResponse);
                                    navigate('/login');
                                }
                            } else {
                                throw new Error('Failed to refresh access token');
                            }
                        } catch (error) {
                            console.error('Failed to refresh access token during retry:', error);
                            navigate('/login');
                        }
                    } else {
                        navigate('/login');
                    }
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate]);

    return null;
};
