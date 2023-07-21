import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { createUser } from '@/redux/features/user/userSlices';
interface ISingup {
  email: string;
  password: string;
  reEnterPassword: string;
}
export default function Signup() {
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISingup>();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: ISingup) => {
    console.log(data);
    if (data.reEnterPassword !== data.password) {
      setError('Passwords do not match');
    } else {
      setError('');
    }

    dispatch(createUser({ email: data.email, password: data.password }));
  };

  return (
    <>
      <div className="container mt-8">
        <div className="flex gap-8 items-center justify-center ">
          <div className="inline-block border-2 border-gray-200 p-8 rounded-md shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-2xl font-Poppins text-center">
                Log In Your Account
              </h2>
              {error && (
                <span className="text-red-600 text-center py-2">{error}</span>
              )}
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
                {errors.password && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>

              <div className="mt-4 mb-4">
                <label htmlFor="password">Re-enter Password</label>
                <input
                  type="password"
                  placeholder="Re-enter Password"
                  className="border border-gray-400 w-full px-4 py-2"
                  {...register('reEnterPassword', { required: true })}
                />
                {errors.reEnterPassword && (
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
                Already have an account?
                <Link className="text-primary px-2" to="/login">
                  Log in
                </Link>
              </h1>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
