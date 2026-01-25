"use client";

import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TorusKnot, Environment } from '@react-three/drei';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-gray-50 to-white overflow-hidden">
      {/* 3D Animated Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} style={{ width: '100%', height: '100%' }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={0.7} />
          <TorusKnot args={[1.7, 0.5, 128, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#a259ff" metalness={0.7} roughness={0.2} />
          </TorusKnot>
          <Environment preset="sunset" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
        </Canvas>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center space-x-3 mb-8"
          >
            <Zap className="h-16 w-16 text-black" />
            <span className="text-4xl font-bold text-black">Phoenix Creative Group</span>
          </motion.div>

          {/* Updated Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-black mb-8 leading-tight"
          >
            Your Digital Partner for{' '}
            <span className="bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Software & Marketing
            </span>
          </motion.h1>

          {/* Updated Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            We help businesses grow through cutting-edge software development and result-driven marketing strategies — all under one roof.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
              onClick={() => window.location.href = '/website-cost-calculator'}
            >
              <span>Start Your Project</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-black text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-black hover:text-white transition-colors"
              onClick={() => window.location.href = '/portfolio'}
            >
              View Portfolio
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
