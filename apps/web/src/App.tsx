import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Technology from '@/pages/Technology';
import Concept from '@/pages/Concept';
import HowItWorks from '@/pages/HowItWorks';
import Partnership from '@/pages/Partnership';
import NotFound from '@/pages/NotFound';
import ScrollToTop from '@/components/ScrollToTop';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="qui-sommes-nous" element={<About />} />
          <Route path="notre-technologie" element={<Technology />} />
          <Route path="le-concept" element={<Concept />} />
          <Route path="comment-ca-marche" element={<HowItWorks />} />
          <Route path="partenariat" element={<Partnership />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
