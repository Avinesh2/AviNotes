// GoogleRedirect.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
      return;
    }

    const handleGoogleCallback = async () => {
      dispatch(signInStart());

      try {
        // Get the current URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
        if (!code) {
          throw new Error('No authorization code received');
        }

        // Exchange the code for tokens
        const res = await axios.get(`https://avinotes.onrender.com/api/auth/google/callback?code=${code}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          // Store the user data in Redux
          dispatch(signInSuccess(res.data));
          toast.success("Successfully logged in with Google");
          navigate('/');
        } else {
          throw new Error(res.data.message || 'Authentication failed');
        }
      } catch (err) {
        console.error('Google authentication error:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Failed to authenticate with Google';
        dispatch(signInFailure(errorMessage));
        toast.error(errorMessage);
        navigate('/login');
      }
    };

    handleGoogleCallback();
  }, [dispatch, navigate, currentUser]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing Google authentication...</p>
      </div>
    </div>
  );
};

export default GoogleRedirect;
