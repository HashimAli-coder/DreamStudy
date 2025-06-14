import React, { useState, useEffect } from 'react';
import { FaSearch, FaUniversity } from 'react-icons/fa';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';
import fullyFundedData from '../fullyFundedScholarships.json';
import partialFundedData from '../partialfunded.json';
import Navbar from "./Navbar";
import Footer from "./Footer";
import 'flag-icons/css/flag-icons.min.css';

import { Link } from 'react-router-dom';

const ApplicationPage = () => {
  const [degree, setDegree] = useState('');
  const [country, setCountry] = useState('');
  const [scholarshipType, setScholarshipType] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Combine all data
    const allData = [...fullyFundedData, ...Object.values(partialFundedData).flat()];
  
    const total = allData.length;
  
    // Shuffle data to randomize eligibility
    const shuffled = [...allData]; // Clone the data to avoid modifying the original array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
  
    const eligibleCount = Math.floor(total / 2); // Calculate 50% of the total items
  
    // Randomly assign eligibility status (50% eligible, 50% not eligible)
    const updated = shuffled.map((item, index) => ({
      ...item,
      eligibilityStatus: Math.random() < 0.5 ? 'eligible' : 'not eligible', // Random eligibility
    }));
  
    setFilteredData(updated); // Set the filtered data
  }, [fullyFundedData, partialFundedData]);
  
  
  

  const handleSearch = () => {
    setLoading(true); // Show loader
  
    setTimeout(() => {
      const normalizedDegree = degree.trim().toLowerCase();
      const normalizedCountry = country.trim().toLowerCase();
      const normalizedType = scholarshipType.trim().toLowerCase();
  
      // Choose data source based on type
      let baseData = [];
      if (normalizedType === 'fully') {
        baseData = fullyFundedData;
      } else if (normalizedType === 'partial') {
        baseData = Object.values(partialFundedData).flat();
      } else {
        baseData = [...fullyFundedData, ...Object.values(partialFundedData).flat()];
      }
  
      // Filter by degree
      let filtered = baseData;
      if (normalizedDegree) {
        filtered = filtered.filter((s) => {
          const degreeField = s?.eligibility?.degreeLevel || s?.degreeLevel;
          if (!degreeField) return false;
          const degreeString = Array.isArray(degreeField)
            ? degreeField.join(', ').toLowerCase()
            : degreeField.toLowerCase();
          return degreeString.includes(normalizedDegree);
        });
      }
  
      // Filter by country (handle UK alias)
      if (normalizedCountry) {
        filtered = filtered.filter((s) => {
          const sCountry = s.country?.trim().toLowerCase();
          return (
            sCountry === normalizedCountry ||
            (normalizedCountry === 'united kingdom' && sCountry === 'uk')
          );
        });
      }
  
      const total = filtered.length;
  
      // Handle edge cases
      if (total <= 1) {
        const singleResult = filtered.map(item => ({
          ...item,
          eligibilityStatus: 'eligible',
        }));
        setFilteredData(singleResult);
        setLoading(false);
        return;
      }
  
      // Randomly mark 50% as eligible
      const eligibleCount = Math.floor(total / 2);
      const indices = Array.from({ length: total }, (_, i) => i);
  
      // Shuffle indices using Fisher-Yates algorithm
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
  
      const eligibleIndices = new Set(indices.slice(0, eligibleCount));
  
      const updated = filtered.map((item, index) => ({
        ...item,
        eligibilityStatus: eligibleIndices.has(index) ? 'eligible' : 'not eligible',
      }));
  
      setFilteredData(updated);
      setLoading(false); // Hide loader after 1 second (simulated delay)
    }, 1000);
  };
  
  
  return (
    <div className="bg-[#0a1930] text-white min-h-screen flex flex-col">
      <Navbar />

      <Link
        to="/career-counseling"
        className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 group"
      >
        <div className="bg-gray-600 hover:bg-fuchsia-600 text-white shadow-2xl rounded-l-2xl py-6 px-4 flex flex-col items-center justify-center gap-4 transition-all duration-300 cursor-pointer w-16 h-60">
          <span className="text-lg font-bold transform rotate-90 whitespace-nowrap leading-tight text-center tracking-tight">
            Find what's best for you
          </span>
        </div>
      </Link>

      <div className="flex flex-col items-center py-10 px-4 sm:px-8 md:px-20 mt-28">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 text-fuchsia-500 flex items-center pb-3 animate-fadeIn text-center">
          <FaUniversity className="mr-3 text-fuchsia-500 animate-bounce" />
          University Applications
        </h1>

        {/* Filters */}
        <div className="bg-white/10 p-4 sm:p-6 md:p-8 rounded-xl shadow-xl backdrop-blur-md w-full max-w-6xl text-gray-200 border border-white/10">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex-1">
              <label className="text-sm font-semibold text-fuchsia-400">Degree</label>
              <select
                className="w-full p-3 rounded-lg bg-gray-800 text-white shadow-inner"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              >
                <option value="">Select Degree</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-semibold text-fuchsia-400">Country</label>
              <select
                className="w-full p-3 rounded-lg bg-gray-800 text-white shadow-inner"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">🌍 Select Country</option>
                <option value="Turkey">🇹🇷 Turkey</option>
                <option value="United Kingdom">🇬🇧 United Kingdom</option>
                <option value="United States">🇺🇸 United States</option>
                <option value="Germany">🇩🇪 Germany</option>
                <option value="Canada">🇨🇦 Canada</option>
                <option value="Australia">🇦🇺 Australia</option>
                <option value="France">🇫🇷 France</option>
                <option value="Romania">🇷🇴 Romania</option>
                <option value="Saudi Arabia">🇸🇦 Saudi Arabia</option>
                <option value="Hungary">🇭🇺 Hungary</option>
                <option value="China">🇨🇳 China</option>
                <option value="Cyprus">🇨🇾 Cyprus</option>
                <option value="Malta">🇲🇹 Malta</option>
                <option value="Ireland">🇮🇪 Ireland</option>
                <option value="Germany, Spain, France">🇩🇪🇪🇸🇫🇷 Germany, Spain, France</option>
                <option value="Multiple Countries">🌐 Multiple Countries</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-semibold text-fuchsia-400">Scholarship Type</label>
              <select
                className="w-full p-3 rounded-lg bg-gray-800 text-white shadow-inner"
                value={scholarshipType}
                onChange={(e) => setScholarshipType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="fully">Fully Funded</option>
                <option value="partial">Partial Funded</option>
              </select>
            </div>
          </div>

          <div className="w-full">
            <button
              onClick={handleSearch}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <FaSearch className="mr-2" /> Search Scholarships
            </button>
          </div>
        </div>

        {/* Circle Loader */}
        {loading && (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full border-t-4 border-orange-500 border-solid w-24 h-24"></div>
          </div>
        )}

        {/* Results */}
        {!loading && (
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 w-full max-w-7xl">
            {filteredData.length === 0 ? (
              <div className="col-span-3 text-center text-lg text-gray-300">
                No scholarships found. Try different filters.
              </div>
            ) : (
              filteredData.map((scholarship, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.03] transition duration-300 flex flex-col justify-between h-[520px] border border-white/10"
                >
                  <img
                    src={scholarship.image}
                    alt={scholarship.scholarshipName || scholarship.university}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-5 flex-1">
                    <h2 className="text-xl font-bold text-orange-400 mb-3 flex items-center gap-2">
                      🎓 {scholarship.scholarshipName || scholarship.university}
                    </h2>
                    <p className="text-sm mb-1">🏛 University: {scholarship.university}</p>
                    <p className="text-sm mb-1">📍 Location: {scholarship.location || 'N/A'}</p>
                    <p className="text-sm mb-1">🌍 Country: {scholarship.country}</p>
                    <p className="text-sm mb-1">
                      🎯 Degree: {
                        Array.isArray(scholarship.eligibility?.degreeLevel || scholarship.degreeLevel)
                          ? (scholarship.eligibility?.degreeLevel || scholarship.degreeLevel).join(' | ')
                          : scholarship.eligibility?.degreeLevel || scholarship.degreeLevel || 'N/A'
                      }
                    </p>
                    <p className="text-sm mb-1">⏰ Deadline: {scholarship.deadline}</p>
                  </div>

                  <div className="p-4 bg-gray-800 border-t border-white/10">
                    <div
                      className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full shadow-md w-fit ${
                        scholarship.eligibilityStatus === 'eligible'
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'
                      }`}
                    >
                      {scholarship.eligibilityStatus === 'eligible' ? <BsCheckCircle /> : <BsXCircle />}
                      {scholarship.eligibilityStatus === 'eligible' ? 'Eligible' : 'Not Eligible'}
                    </div>
                    <button
                      onClick={() => window.location.href = '/coming-soon'}
                      className="w-full bg-orange-600 hover:bg-orange-700 transition text-white p-3 mt-4 rounded-lg font-semibold"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ApplicationPage;
