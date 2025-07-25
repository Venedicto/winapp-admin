import React, { useState } from 'react';
import Input from '../ui/Input';
import { useLoginMutation } from '../../services/auth';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  
  // Usar la mutation de login
  const loginMutation = useLoginMutation();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Validación del email
    if (!email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El formato del email no es válido';
    }

    // Validación de la contraseña
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Limpiar errores si la validación es exitosa
      setErrors({});
      
      // Ejecutar la mutation de login
      loginMutation.mutate(
        { email, password },
        {
          onError: (error) => {
            // Mostrar error en el formulario
            setErrors({ 
              email: error.message.includes('email') ? error.message : undefined,
              password: error.message.includes('password') || error.message.includes('contraseña') ? error.message : undefined,
            });
          }
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto flex rounded-3xl shadow-2xl overflow-hidden bg-white">
        {/* Left side - Welcome section */}
        <div className="w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 flex flex-col justify-between p-12 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-40 right-16 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-8 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-500"></div>
          </div>
          
          <div className="z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-8 backdrop-blur-sm">
            <img src="/images/iso.svg" alt="WinApp" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-5xl font-bold mb-6 text-white leading-tight">
              BIENVENIDOS
            </h1>
            <p className="text-xl text-purple-100 leading-relaxed mb-8">
              Administra la app de la manera más rápida y sencilla. 
            </p>
            <div className="flex space-x-4 text-purple-200">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                <span className="text-sm">Gestión completa</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                <span className="text-sm">Interfaz intuitiva</span>
              </div>
            </div>
          </div>
          
          {/* 3D House illustration */}
          <div className="z-10 flex justify-center">
            <img 
              src="/images/house-with-shop.png" 
              alt="Casa con tienda 3D" 
              className="w-64 h-64 object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-1/2 p-12 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-gray-800 mb-3">Iniciar Sesión</h2>
              <p className="text-gray-600">Ingresa tus credenciales para continuar</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <Input
                name="email"
                type="email"
                placeholder="tu@email.com"
                label="Correo Electrónico"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                isInvalid={!!errors.email}
                errorMessage={errors.email}
                className="text-sm"
              />
              
              <Input
                name="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                label="Contraseña"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
                errorMessage={errors.password}
                className="text-sm"
              />
              
              <div className="flex items-center justify-between text-sm mb-6">
                <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              
              <button
              onClick={handleSubmit}
              disabled={loginMutation.isPending}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
             
              {loginMutation.isPending ? 'Procesando...' : 'Ingresar'}
            </button>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
