import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Eye, EyeSlash } from '../icons/index';
import { useAuth } from '../contexts/index';
import resetMutation from '../utils/resetMutation';

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { loginMutation } = useAuth();

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  useEffect(() => {
    resetMutation(null, loginMutation);
  }, []);


  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center gap-y-8'>

      <div className='max-w-[400px] sm:w-[400px] flex flex-col items-center gap-y-2'>

        <Link to='/' className='text-white text-2xl select-none'>

          <span className='text-main'>Z</span>AI

        </Link>

        <h3 className='text-gray-200'>Login to <span className='text-main'>Z</span>AI</h3>

      </div>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='max-[400px]:w-full w-[400px] p-4 flex flex-col gap-y-4'>

        <div className='flex flex-col gap-y-2'>
          
          <label htmlFor='username' className='text-white text-xs sm:text-base'>Username</label>

          <input type='text' id='username' {...register('username', { 
            required: { value: true , message: 'Username is required' }})} onFocus={(e) => resetMutation(e, loginMutation)} autoComplete='off'
            className='text-white p-1.5 border-2  border-gray-200 rounded-md focus:border-main focus:outline-none'/>
          
          {errors.username && <p className='text-error text-xs'>{errors.username.message}</p>}

          {loginMutation.isError && <p className='text-error text-xs'>{loginMutation.error.response.data?.errors?.username.message}</p>}

        </div>


        <div className='flex flex-col gap-y-2'>
          
          <label htmlFor='password' className='text-white text-xs sm:text-base'>Password</label>
          
          <div className='relative'>
            
            <input type={isPasswordVisible ? 'text' : 'password'} id='password' {...register('password', { 
              required: { value: true, message: 'Password is required' }})} onFocus={(e) => resetMutation(e, loginMutation)} autoComplete='new-password'
              className='text-white w-full p-1.5 pr-8 border-2  border-gray-200 rounded-md focus:border-main  focus:outline-none'  />
            
            <button type='button' onClick={() => setIsPasswordVisible((prev) => !prev)} className='text-white absolute right-2 top-3 cursor-pointer select-none'>{isPasswordVisible ? <EyeSlash /> : <Eye />}</button>
          
          </div>
          
          {errors.password && <p className='text-error text-xs'>{errors.password.message}</p>}

          {loginMutation.isError && <p className='text-error text-xs'>{loginMutation.error.response.data?.errors?.password.message}</p>}
        
        </div>

        {loginMutation.isError && <p className='text-error text-xs'>{loginMutation.error.response.data.error || 'Failed to login'}</p>}

        <button type='submit' className='btn-main'>{loginMutation.isPending ? 'Logging' : 'Login'}</button>

        <p className='text-white text-xs sm:text-base text-center'>You don't have an account? <Link to='/register' className='text-main'>Register</Link></p>

      </form>

    </main>
  )
}

export default Login;