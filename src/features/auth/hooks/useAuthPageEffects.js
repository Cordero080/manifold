import { useState, useEffect, useRef } from 'react';
import { quantumCollapse } from '@utils/coreHelpers';

const portalWorlds = [
  { colors: ['#ff00cc', '#00fff7', '#1a003a'], label: 'Fractal' },
  { colors: ['#ffea00', '#7300ffff', '#003a2a'], label: 'Nebula' },
  { colors: ['#ff3300', '#cc00ff', '#0a0f1a'], label: 'Being' },
  { colors: ['#00ff33', '#00aaff', '#003a3a'], label: '' },
  { colors: ['#cfccbeff', '#056864ff', '#210205ff'], label: 'Singularity' },
];

export function useAuthPageEffects() {
  const [portalState, setPortalState] = useState(() => quantumCollapse(portalWorlds));
  const [navScrolled, setNavScrolled] = useState(false);
  const bgRef = useRef(null);
  const fgRef = useRef(null);

  useEffect(() => {
    const handleParallax = (e) => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      const progress = Math.min(1, scrollY / maxScroll);
      let mx = 0,
        my = 0;
      if (e && e.type === 'mousemove') {
        mx = e.clientX / window.innerWidth - 0.5;
        my = e.clientY / window.innerHeight - 0.5;
      }
      const motionDampen = 1 - progress * 0.3;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${mx * 15 * motionDampen}px, ${-scrollY * 0.04 + my * 8 * motionDampen}px, 0)`;
        bgRef.current.style.opacity = String(1 - progress * 0.4);
      }
      if (fgRef.current) {
        fgRef.current.style.transform = `translate3d(${mx * 45 * motionDampen}px, ${-scrollY * 0.12 + my * 25 * motionDampen}px, 0)`;
        fgRef.current.style.opacity = String(0.9 - progress * 0.6);
      }
    };
    window.addEventListener('scroll', handleParallax);
    window.addEventListener('mousemove', handleParallax);
    handleParallax();
    return () => {
      window.removeEventListener('scroll', handleParallax);
      window.removeEventListener('mousemove', handleParallax);
    };
  }, []);

  useEffect(() => {
    const handleQuantumCollapse = () => setPortalState(quantumCollapse(portalWorlds));
    window.addEventListener('scroll', handleQuantumCollapse);
    window.addEventListener('click', handleQuantumCollapse);
    return () => {
      window.removeEventListener('scroll', handleQuantumCollapse);
      window.removeEventListener('click', handleQuantumCollapse);
    };
  }, []);

  useEffect(() => {
    const handleNavScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();
    return () => window.removeEventListener('scroll', handleNavScroll);
  }, []);

  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const handleMouseMove = (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return { portalState, navScrolled, bgRef, fgRef };
}
