import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginV5() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Login logic here
        setTimeout(() => setLoading(false), 1000);
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md p-8 rounded-2x1 border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl">
            <h1 className="text-3x1 font-bold text-white mb-2 text-center">Welcome Back!</h1>
            <p className="text-zinc-400 text-center mb-6">Login to your account.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* form fields and button go here */}
            </form>
            </div>
            
        </div>
    )
}