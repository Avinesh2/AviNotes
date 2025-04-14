// GoogleRedirect.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      dispatch(signInStart());

      try {
        // Wait for a short delay to ensure the cookie is set
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const res = await axios.get("https://avinotes.onrender.com/api/auth/checkAuth", {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(signInSuccess(res.data));
          toast.success("Successfully logged in with Google");
          navigate('/');
        } else {
          dispatch(signInFailure("Authentication failed"));
          toast.error("Failed to authenticate with Google");
          navigate('/login');
        }
      } catch (err) {
        dispatch(signInFailure(err.message));
        toast.error(err.message || "Failed to authenticate with Google");
        navigate('/login');
      }
    };

    handleGoogleCallback();
  }, [dispatch, navigate]);

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
