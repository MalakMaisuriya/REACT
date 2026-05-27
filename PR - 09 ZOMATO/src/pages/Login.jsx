import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRestaurant, clearError } from '../redux/authSlice';
import toast from 'react-hot-toast';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChefHat,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Clock3,
  TrendingUp,
  Utensils,
} from 'lucide-react';
import '../styles/Auth.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((s) => s.auth);

  useEffect(() => {
    if (token) navigate('/dashboard', { replace: true });
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error('Please enter your email and password');

    const result = await dispatch(loginRestaurant(form));
    if (loginRestaurant.fulfilled.match(result)) {
      toast.success('Welcome back');
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-wrapper login-shell">
      <section className="auth-left login-hero" aria-label="Zomato partner benefits">
        <div className="auth-left-content">
          <div className="brand-logo">
            <ChefHat size={38} />
            <span>Zomato Partner</span>
          </div>

          <p className="auth-kicker">Partner command center</p>
          <h1 className="auth-headline">Your next order is already moving.</h1>
          <p className="auth-subline">
            Sign in to watch live orders, update menu availability, and keep your kitchen running on time.
          </p>

          <div className="login-insights" aria-label="Dashboard highlights">
            <div className="login-insight">
              <Clock3 size={20} />
              <div>
                <span>Live queue</span>
                <strong>Track orders instantly</strong>
              </div>
            </div>
            <div className="login-insight">
              <Utensils size={20} />
              <div>
                <span>Menu control</span>
                <strong>Switch items on or off</strong>
              </div>
            </div>
            <div className="login-insight">
              <TrendingUp size={20} />
              <div>
                <span>Daily view</span>
                <strong>Revenue and status at a glance</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="auth-right login-panel">
        <div className="login-card-topline">
          <span>Restaurant login</span>
          <strong>Fast. Secure. Focused.</strong>
        </div>

        <div className="auth-card login-card">
          <div className="auth-card-header">
            <div className="zomato-pill"><ShieldCheck size={14} /> Secure partner login</div>
            <h2>Welcome back, chef</h2>
            <p>Use your partner credentials to open the restaurant dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="partner@restaurant.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  placeholder="Your secure password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="eye-toggle"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={18} className="spin" /> Signing in
                </>
              ) : (
                <>
                  Open dashboard <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="auth-footer-text">
            Starting with Zomato Partner?{' '}
            <Link to="/register" className="auth-link">Create an account</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
