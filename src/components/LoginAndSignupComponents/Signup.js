import React, { useState} from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
      Age: age,
    };

    try {
      const response = await fetch('http://localhost:3005/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred');
        setSuccess(false);
      } else {
        const responseData = await response.json();
        localStorage.setItem('token', responseData.token);  // Store JWT token
        localStorage.setItem('userId', responseData.user._id);  // Store user ID
        localStorage.setItem('userFullName', responseData.user.FullName);  // Store full name
        navigate('/home')
        setError(null);
        setSuccess(true);
      }
    } catch (err) {
      setError('Failed to connect to the server');
      setSuccess(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="relative w-full max-w-md">
          <img src="/box.png" alt="Logo" className="w-full h-full mx-auto" />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-white p-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">
          Create a free account to unlock your savor and serve journey
          </h2>
          <div className="flex justify-center space-x-4 mb-6">
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
              <FaGoogle className="text-red-500 mr-2" size={20} />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
              <FaFacebook className="text-blue-600 mr-2" size={20} />
              <span>Facebook</span>
            </button>
          </div>
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">OR</span>
            </div>
          </div>

          {/* Signup form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="absolute right-3 top-2 text-gray-400 cursor-pointer">?</span>
            </div>
            {email && (
              <>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Age"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                  <span className="absolute right-3 top-2 text-gray-400 cursor-pointer">?</span>
                </div>
              </>
            )}
            <button
              type="submit"
              className="w-full bg-gray-800 text-white text-lg font-semibold py-2 rounded-full hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Sign up
            </button>
          </form>

          {/* Error and success message */}
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          {success && (
            <p className="mt-4 text-green-500 text-center">
              Signup successful!
            </p>
          )}

          <p className="mt-4 text-center text-sm text-gray-600">
            By clicking Sign up, I agree to EventServe's{' '}
            <a href="/" className="text-blue-500 hover:underline">Terms</a> and{' '}
            <a href="/" className="text-blue-500 hover:underline">Privacy Policy</a>
          </p>
          <div className="mt-6 text-center text-sm">
            Existing user?{' '}
            <a href="/login" className="text-blue-500 hover:underline">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
