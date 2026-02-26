"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight, ShieldCheck, BarChart3 } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, TorusKnot, Environment } from "@react-three/drei";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-gradient-to-br from-[#f8fbff] via-white to-[#edf4ff]">
      <div className="absolute -left-20 -top-28 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-600"
            >
              <Zap className="h-4 w-4 text-indigo-600" />
              Next-Gen Brand Experience
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl"
            >
              We Build Digital Brands That Scale
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg text-gray-600"
            >
              Strategic design, responsive development, and growth-driven execution for teams that want a premium digital presence and better conversion outcomes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 py-3 font-semibold text-white transition hover:bg-gray-800"
              >
                Schedule Discovery Call
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-7 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                View Case Studies
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 grid grid-cols-2 gap-4"
            >
              <div className="rounded-2xl border border-gray-200 bg-white/80 p-4">
                <p className="text-2xl font-bold text-gray-900">120+</p>
                <p className="text-sm text-gray-600">Projects Delivered</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white/80 p-4">
                <p className="text-2xl font-bold text-gray-900">97%</p>
                <p className="text-sm text-gray-600">Client Satisfaction</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white/70 p-4 shadow-xl backdrop-blur-xl">
              <div className="h-[360px] w-full rounded-2xl bg-gradient-to-br from-[#eef4ff] to-[#e7fbff]">
                <Canvas camera={{ position: [0, 0, 7], fov: 52 }} style={{ width: "100%", height: "100%" }}>
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[4, 4, 4]} intensity={0.8} />
                  <TorusKnot args={[1.6, 0.45, 160, 28]}>
                    <meshStandardMaterial color="#4f46e5" metalness={0.65} roughness={0.2} />
                  </TorusKnot>
                  <Environment preset="city" />
                  <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
                </Canvas>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold text-gray-700">Enterprise-ready quality</span>
            </div>
            <div className="absolute -right-4 top-8 flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg">
              <BarChart3 className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-semibold text-gray-700">Growth-focused execution</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
