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
                  <p className="text-gray-300">luan.yq.shay@gmail.com</p>
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
              I'm currently open to internship opportunities for <strong>Summer/Fall 2026</strong> and collaborative projects!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

