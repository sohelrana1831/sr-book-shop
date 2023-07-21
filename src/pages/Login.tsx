import { loginUser } from '@/redux/features/user/userSlices';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

interface ILogin {
  email: string;
  password: string;
}
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const { users, isLodging, error } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit = (data: ILogin) => {
    // console.log(data);
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    if (users.email && !isLodging) {
      navigate('/');
    }
  }, [users.email, isLodging, navigate]);

  return (
    <>
      <div className="container mt-8">
        <div className="flex gap-8 items-center justify-center ">
          <div className="inline-block border-2 border-gray-200 p-8 rounded-md shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-2xl font-Poppins text-center">
                Log In Your Account
              </h2>
              {error && <span className="text-red-600 py-2">{error}</span>}

              <div className="mt-4 mb-4">
                <label htmlFor="email">Email</label>
                <input
                  className="border border-gray-400 w-full px-4 py-2"
                  placeholder="Enter Email"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>

              <div className="mt-4 mb-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-gray-400 w-full px-4 py-2"
                  {...register('password', { required: true })}
                />
                <Link to="#" className="float-right text-secondary">
                  Forget password?
                </Link>
                {errors.password && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>

              <button
                className="w-full bg-primary text-white mt-4 mb-4  py-2 px-4 rounded-md"
                type="submit"
              >
                submit
              </button>
              <h1 className="py-4">
                Don't Have an Account?
                <Link className="text-primary px-2" to="/signup">
                  Register now
                </Link>
              </h1>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
