export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-[hsl(45,78%,53%)] rounded-lg flex items-center justify-center mr-3">
                <i className="fas fa-graduation-cap text-white text-xl"></i>
              </div>
              <span className="text-lg md:text-xl font-bold font-kurdish">فێربوونا ئینگلیزی</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md font-kurdish text-sm md:text-base">
              پلاتفۆرمەکێ تایبەت بۆ فێربوونا زمانێ ئینگلیزی ب شێوەیەکا کوردی و کلتووری
            </p>
            <div className="flex space-x-reverse space-x-4">
              <a href="#" className="text-gray-400 hover:text-[hsl(45,78%,53%)] transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[hsl(45,78%,53%)] transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[hsl(45,78%,53%)] transition-colors">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 font-kurdish text-sm md:text-base">بەستەرێن خێرا</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-[hsl(45,78%,53%)] transition-colors font-kurdish text-sm">ماڵەوە</a></li>
              <li><a href="/lessons" className="text-gray-300 hover:text-[hsl(45,78%,53%)] transition-colors font-kurdish text-sm">وانان</a></li>
              <li><a href="/vocabulary" className="text-gray-300 hover:text-[hsl(45,78%,53%)] transition-colors font-kurdish text-sm">وشان</a></li>
              <li><a href="/progress" className="text-gray-300 hover:text-[hsl(45,78%,53%)] transition-colors font-kurdish text-sm">پێشڤەچوون</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4 font-kurdish">پشتگیری</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-[hsl(45,78%,53%)] transition-colors font-kurdish">ڕێبەری بەکارهێنان</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[hsl(45,78%,53%)] transition-colors font-kurdish">پەیوەندی</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[hsl(45,78%,53%)] transition-colors font-kurdish">پرسیارە دووبارەکان</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[hsl(45,78%,53%)] transition-colors font-kurdish">ڕاپۆرتی کێشە</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 font-kurdish">
            © ٢٠٢٤ فێربوونی ئینگلیزی. هەموو مافەکان پارێزراون.
          </p>
        </div>
      </div>
    </footer>
  );
}
