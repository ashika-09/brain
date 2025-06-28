import { Twitter, Facebook, Instagram } from 'lucide-react'
import Button from './Button';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-[3vw] font-bold text-center mb-12"
        >
          Get in Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 mt-1 bg-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"/>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 mt-1 bg-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 mt-1 bg-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>
            <Button  variant='bg-blue-500 justify-center' text="Send Message"/>

          </form>
          <div
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Contact Information</h3>
              <p className="text-gray-300 mb-2">Email: info@ideaforge.com</p>
              <p className="text-gray-300 mb-4">Phone: +91 8755474558</p>
              <h4 className="text-xl font-semibold text-white mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-teal-400 transition duration-300">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition duration-300">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-teal-400 transition duration-300">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

