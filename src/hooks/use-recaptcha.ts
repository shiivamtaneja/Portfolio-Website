"use client";

import { useCallback } from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

interface UseRecaptchaReturn {
  executeRecaptcha: () => Promise<string>;
}

function useRecaptcha(): UseRecaptchaReturn {
  const loadRecaptcha = useCallback(() => {
    const existingScript = document.querySelector("#recaptcha-script");

    if (window.grecaptcha) {
      return Promise.resolve();
    }

    if (existingScript) {
      return new Promise<void>((resolve, reject) => {
        existingScript.addEventListener("load", () => resolve(), {
          once: true,
        });
        existingScript.addEventListener(
          "error",
          () => reject(new Error("Failed to load reCAPTCHA")),
          { once: true },
        );
      });
    }

    return new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.id = "recaptcha-script";
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load reCAPTCHA"));

      document.head.appendChild(script);
    });
  }, []);

  const executeRecaptcha = useCallback(async () => {
    await loadRecaptcha();

    return new Promise<string>((resolve, reject) => {
      window.grecaptcha.ready(function () {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_KEY!, { action: "submit" })
          .then((token: string) => {
            resolve(token);
          })
          .catch((error: unknown) => {
            console.error("[Recaptcha Error]", error);

            reject(error);
          });
      });
    });
  }, [loadRecaptcha]);

  return { executeRecaptcha };
}

export default useRecaptcha;
