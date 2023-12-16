import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserAuthWrapper = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const { user, loggedIn, isLoading} = useSelector( (state) => state.userAuthSlice);
    console.log(loggedIn)

    useEffect(() => {
        if (!loggedIn && !isLoading) {
            router.push('/signin');
        }
      }, [loggedIn, isLoading, router]);

    // Render the WrappedComponent if authenticated, otherwise null
    return loggedIn ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default UserAuthWrapper;
