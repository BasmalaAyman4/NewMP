import MainLayout from "@/Component/MainLayout";
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react"
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import NextNProgress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import { Store, persistor } from "@/Component/Redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
function App({ Component, pageProps: { session, ...pageProps } }) {
  const [isVisible, setIsVisible] = useState(false);
  const { locale, locales, push } = useRouter()

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);
  const [direction, setDirection] = useState('rtl');

  useEffect(() => {
    if (locale === 'ar') {
      setDirection('rtl');
    } else {
      setDirection('ltr');
    }
  }, [locale]);
  return (
  <>
      <NextNProgress height={10} color="#f0f1ab" />
      <SessionProvider session={session}>
        <div dir={direction}>
          <MainLayout>
            <Provider store={Store}>
              <PersistGate persistor={persistor}>
                
                <Component {...pageProps} />
             
                <button
                  onClick={scrollToTop}
                  style={{
                    display: isVisible ? 'block' : 'none',
                    position: 'fixed',
                    bottom: '80px',
                    right: '20px',
                    padding: '5px',
                    border: 'none',
                    borderRadius: '50px',
                    backgroundColor: '#222',
                    color: 'white',
                    cursor: 'pointer',
                    zIndex: 1000,
                    width: '50px',
                    height: '50px'
                  }}
                >
                  <KeyboardArrowUpIcon />
                </button>
              </PersistGate>
            </Provider>
          </MainLayout>
      </div>
      </SessionProvider>
  </>
  )
}
export default App