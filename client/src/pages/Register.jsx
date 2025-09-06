import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Eye, EyeSlash } from '../icons/index';
import { useAuth } from '../contexts/index';
import resetMutation from '../utils/resetMutation';

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { registerMutation } = useAuth();

  const onSubmit = (data) => {
    registerMutation.mutate(data);
  };

  useEffect(() => {
    resetMutation(null, registerMutation);
  }, []);


  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center gap-y-8'>

      <div className='max-w-[400px] sm:w-[400px] flex flex-col items-center gap-y-2'>

        <Link to='/' className='text-white text-2xl  select-none'>

          <span className='text-main'>Z</span>AI

        </Link>

        <h3 className='text-gray-200'>Create your account</h3>

      </div>

      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='max-[400px]:w-full w-[400px] p-4 flex flex-col gap-y-4'>

        <div className='flex flex-col gap-y-2'>
          
          <label htmlFor='username' className='text-white text-xs sm:text-base'>Username</label>

          <input type='text' id='username' {...register('username', { 
            required: { value: true , message: 'Username is required' }, 
            pattern: { value: /^[a-zA-Z0-9.-@_]{3,}$/, message: 'Username must be at least 3 characters and contain only letters, numbers, ., _, @, -' } 
          })} autoComplete='off' onFocus={(e) => resetMutation(e, registerMutation)} className='text-white p-1.5 border-2  border-gray-200 rounded-md focus:border-main focus:outline-none' />
          
          {errors.username && <p className='text-error text-xs'>{errors.username.message}</p>}

          {registerMutation.isError && <p className='text-error text-xs'>{registerMutation.error.response.data?.errors?.username.message}</p>}

        </div>


        <div className='flex flex-col gap-y-2'>
          
          <label htmlFor='password' className='text-white text-xs sm:text-base'>Password</label>
          
          <div className='relative'>
            
            <input type={isPasswordVisible ? 'text' : 'password'} id='password' {...register('password', {
              required: { value: true, message: 'Password is required' }, 
              pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,14}$/, message: 'Password must be 8-14 characters and include uppercase, lowercase, number'  }})} 
              autoComplete='new-password' onFocus={(e) => resetMutation(e, registerMutation)} className='text-white w-full p-1.5 pr-8 border-2 border-gray-200 rounded-md focus:border-main focus:outline-none' />
            
            <button type='button' onClick={() => setIsPasswordVisible((prev) => !prev)} className='text-white absolute right-2 top-3 cursor-pointer select-none'>{isPasswordVisible ? <EyeSlash /> : <Eye />}</button>
          
          </div>
          
          {errors.password && <p className='text-error text-xs'>{errors.password.message}</p>}
          
          {registerMutation.isError && <p className='text-error text-xs'>{registerMutation.error.response.data?.errors?.password.message}</p>}
        
        </div>

        {registerMutation.isError && <p className='text-error text-xs'>{registerMutation.error.response.data.error || 'Filed to register'}</p>}

        <button type='submit' className='btn-main'>{registerMutation.isPending ? 'Registering' : 'Register'}</button>

        <p className='text-white text-xs sm:text-base text-center'>You already have an account? <Link to='/login' className='text-main'>Login</Link></p>

      </form>

    </main>
  )
}

export default Register;