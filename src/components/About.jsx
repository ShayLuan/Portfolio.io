import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>About Me</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a second year Computer Science student at Concordia University with a passion for building practical applications. They can be web-based, embedded, or automated... basically anything that can be done with a computer, as long as they serve a purpose.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, you can find me cooking up delicious meals (let's be honest, it's just the organic version of coding), participating in hackathons, or exploring new technologies. I'm also an avid reader, and let's not forget the most dominant hobby of the century: gaming!
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm currently focusing on backend development with C++ and expanding my frontend knowledge with React.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <span className="px-4 py-2 bg-emerald-900/50 text-emerald-300 rounded-full font-medium">CS Student</span>
              <span className="px-4 py-2 bg-teal-900/50 text-teal-300 rounded-full font-medium">Bare-metal Enthusiast</span>
              <span className="px-4 py-2 bg-green-900/50 text-green-300 rounded-full font-medium">Open source lover</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Profile picture container */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full p-1 shadow-xl w-64 h-64 md:w-80 md:h-80">
                <div className="bg-gray-700 border-4 border-gray-600 rounded-full overflow-hidden w-full h-full flex items-center justify-center">
                  <img 
                    src="/profile-picture.jpeg" 
                    alt="Shay Luan"
                    className="w-full h-full object-cover rounded-full"
                    style={{ objectPosition: '10% top' }}
                  />
                </div>
              </div>
              
              {/* Decorative badge */}
              <div className="absolute -bottom-6 -right-6 bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 max-w-xs">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 flex flex-col items-center justify-center text-white font-bold text-sm leading-none gap-0.5">
                      <span>2nd</span>
                      <span>Year</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-bold text-lg text-gray-100">Computer Science</h3>
                    <p className="text-gray-400 text-sm mt-1">Concordia University</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

