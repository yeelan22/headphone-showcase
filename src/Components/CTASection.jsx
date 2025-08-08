import { motion } from 'framer-motion';
import { CustomButton } from './CustomButton';

export function CTASection() {
  return (
    <section id='cta' className="w-full text-primary-text py-12 px-4 text-center relative overflow-hidden h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto relative z-20 flex flex-col items-center gap-4">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="heading text-center"
        >
          Ready to Experience the Future?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg text-secondary-text"
        >
          Free shipping. 30-day trial.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <CustomButton type="button">Get Yours Now</CustomButton>
        </motion.div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-secondary-accent/40 blur-[150px] opacity-30 -translate-x-1/2 -translate-y-1/2 rounded-full z-0" />
      </div>
    </section>
  );
}
