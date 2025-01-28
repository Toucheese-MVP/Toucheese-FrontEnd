"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import EmailPasswordForm from "./EmailPasswordForm";
import PhoneVerificationForm from "./PhoneVerificationForm";

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  return (
    <div className="relative w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EmailPasswordForm onNext={() => setStep(2)} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PhoneVerificationForm
              onBack={() => setStep(1)}
              onComplete={() => router.push("/welcome")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignUpForm;
