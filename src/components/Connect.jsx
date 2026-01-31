import React from 'react';
import { motion } from 'framer-motion';

export default function Connect() {
  return (
    <section id="connect" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Let's Connect</h2>
              <p className="mt-4 text-xl text-gray-300">
                I'm always excited to collaborate on interesting projects or discuss new technologies. Feel free to reach out!
              </p>
            </div>
            
            <div className="space-y-6">
              <motion.a 
                href="mailto:luan.yq.shay@gmail.com"
                className="flex items-center justify-center space-x-4 bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-700"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-full bg-emerald-900/50 flex items-center justify-center text-emerald-400 font-bold text-xl">
                  ✉️
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-100">Email</h3>
                  <p className="text-gray-300">l****y@gmail.com</p>
                </div>
              </motion.a>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <motion.a 
                  href="https://github.com/ShayLuan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 bg-gray-900 text-white rounded-xl p-5 w-full sm:w-auto hover:bg-gray-800 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <span className="text-2xl">🐙</span>
                  <span className="font-medium text-lg">GitHub Profile</span>
                </motion.a>
                
                <motion.a 
                  href="https://linkedin.com/in/shay-luan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 bg-blue-600 text-white rounded-xl p-5 w-full sm:w-auto hover:bg-blue-700 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  <span className="text-2xl">🔗</span>
                  <span className="font-medium text-lg">LinkedIn</span>
                </motion.a>
              </div>
            </div>
            
            <p className="text-gray-300 mt-4">
              I'm currently open to internship opportunities for{' '}
              <span className="relative inline-block">
                <motion.strong
                  initial={{ opacity: 0, scale: 0.5, x: -50, backgroundPosition: '200% 50%' }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                    x: 0
                  }}
                  viewport={{ once: true }}
                  animate={{
                    backgroundPosition: ['200% 50%', '-100% 50%']
                  }}
                  transition={{ 
                    opacity: { duration: 1.2, delay: 0.3 },
                    scale: { duration: 1.2, delay: 0.3, type: "spring", stiffness: 150 },
                    x: { duration: 1.2, delay: 0.3, type: "spring", stiffness: 150 },
                    backgroundPosition: { 
                      duration: 2.5, 
                      repeat: Infinity, 
                      ease: "linear", 
                      delay: 1.5 
                    }
                  }}
                  className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 via-emerald-300 to-teal-400 bg-[length:200%_auto]"
                  style={{ 
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Summer/Fall 2026
                </motion.strong>
                {/* Sparkle particles */}
                {[...Array(6)].map((_, i) => {
                  const positions = [
                    { left: '10%', top: '-15px' },
                    { left: '30%', top: '-20px' },
                    { left: '50%', top: '-15px' },
                    { left: '70%', top: '-20px' },
                    { left: '20%', top: '25px' },
                    { left: '80%', top: '25px' }
                  ];
                  return (
                    <motion.span
                      key={i}
                      className="absolute text-emerald-300 pointer-events-none z-10"
                      initial={{ 
                        opacity: 0,
                        scale: 0,
                        rotate: 0
                      }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1.2, 0.8, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: 1.5 + (i * 0.4),
                        ease: "easeInOut"
                      }}
                      style={{
                        left: positions[i].left,
                        top: positions[i].top,
                        fontSize: '0.6em'
                      }}
                    >
                      ✨
                    </motion.span>
                  );
                })}
                {/* Shimmer sweep */}
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ 
                    x: ['-100%', '200%'],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                    width: '50%',
                    height: '100%',
                    transform: 'skewX(-20deg)'
                  }}
                />
              </span>
              {' '}and collaborative projects!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

