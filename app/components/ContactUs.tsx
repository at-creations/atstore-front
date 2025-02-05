import { Mail, Phone, MapPin, Clock } from "lucide-react"

export function ContactUs() {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-8 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-slideUp">
      <h2 className="section-title">Contact Us</h2>
      <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 stagger-animation">
        <div className="flex items-center space-x-4">
          <Mail className="text-blue-500 dark:text-blue-400 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Email</h3>
            <p className="text-gray-600 dark:text-gray-300">info@atcreations.ca</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Phone className="text-blue-500 dark:text-blue-400 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Phone</h3>
            <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <MapPin className="text-blue-500 dark:text-blue-400 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Address</h3>
            <p className="text-gray-600 dark:text-gray-300">123 Creative St, Artville, AC 12345</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Clock className="text-blue-500 dark:text-blue-400 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Business Hours</h3>
            <p className="text-gray-600 dark:text-gray-300">Mon-Fri: 9AM-6PM, Sat: 10AM-4PM</p>
          </div>
        </div>
      </div>
    </section>
  )
}

