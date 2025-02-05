export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">&copy; {currentYear} AT Creations. All rights reserved.</p>
      </div>
    </footer>
  )
}

