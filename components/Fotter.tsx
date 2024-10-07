import { Button } from "./common/button";
import { Input } from "./common/input";

export default function Footer() {
  return (
    <footer className="bg-purple-900 dark:bg-gray-900 text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">SolanaBlinks</h3>
            <p className="text-purple-200 dark:text-purple-300">
              Empowering Shopify merchants with blockchain technology blink
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Contact", link: "mailto:thrishank.kalluru@gmail.com" },
                { name: "Privacy Policy", link: "/privacy-policy" },
                { name: "Terms of Service", link: "/terms-of-service" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="hover:text-purple-300 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {[
                {
                  name: "Twitter",
                  link: "https://twitter.com/blinkify",
                },
                {
                  name: "Telegram",
                  link: "https://t.me/thris3",
                },
                {
                  name: "Discord",
                  link: "https://discord.com/invite/thrishank",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="hover:text-purple-300 transition-colors flex items-center space-x-2"
                >
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <form className="flex">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-r-none dark:bg-gray-800 dark:text-white"
              />
              <Button
                type="submit"
                className="rounded-l-none bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-purple-800 dark:border-gray-700 text-center text-purple-300 dark:text-purple-400">
          © 2023 SolanaBlinks. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
