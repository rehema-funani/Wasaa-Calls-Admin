import { useState } from "react"
import { motion } from "framer-motion"
import { LogIn } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useAuth } from "../../hooks/useAuth"

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // The axios interceptor will handle error toasts automatically.
    await login(email, password).finally(() => {
      setLoading(false);
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg">
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <LogIn className="text-blue-600 w-8 h-8" />
              <h1 className="text-2xl font-bold text-center">
                WasaaChat Admin Login
              </h1>
              <p className="text-gray-500 text-center">
                Sign in to access the calls monitoring dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                loading={loading}
                className="w-full flex items-center justify-center gap-2"
              >
                {!loading && <LogIn className="w-4 h-4" />} {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
