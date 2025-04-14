// GoogleRedirect.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const GoogleRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoogleUser = async () => {
      dispatch(signInStart());

      try {
        const res = await axios.get("https://avinotes.onrender.com/api/auth/checkAuth", {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(signInSuccess(res.data));
          navigate('/');
        } else {
          dispatch(signInFailure("Something went wrong"));
          navigate('/login');
        }
      } catch (err) {
        dispatch(signInFailure(err.message));
        navigate('/login');
      }
    };

    fetchGoogleUser();
  }, []);

  return <div>Redirecting...</div>;
};

export default GoogleRedirect;
