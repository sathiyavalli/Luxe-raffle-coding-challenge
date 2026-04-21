import Link from 'next/link';

export const AppFooter = () => {
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-600">
              LuxeRaffle offers exciting opportunities to win luxury cars
              through fair and transparent raffles.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-800">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  className="text-gray-600 hover:text-gray-800"
                  aria-label="Facebook - not available in demo"
                  disabled
                >
                  Facebook
                </button>
              </li>
              <li>
                <button 
                  className="text-gray-600 hover:text-gray-800"
                  aria-label="Twitter - not available in demo"
                  disabled
                >
                  Twitter
                </button>
              </li>
              <li>
                <button 
                  className="text-gray-600 hover:text-gray-800"
                  aria-label="Instagram - not available in demo"
                  disabled
                >
                  Instagram
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © 2023 LuxeRaffle. All rights reserved. Gambling can be addictive.
            Please gamble responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
};
