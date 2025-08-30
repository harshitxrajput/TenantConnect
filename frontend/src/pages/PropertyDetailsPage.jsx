import { useState } from "react";
import { Calendar } from "lucide-react";
import Navbar from "../components/Navbar";

const PropertyDetailsPage = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const nightlyRate = 145;
  const cleaningFee = nightlyRate * 0.08;
  const serviceFee = nightlyRate * 0.06;

  // Example calculation
  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
        )
      : 0;
  const total = nights * nightlyRate + (nights ? cleaningFee + serviceFee : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="w-full mx-auto p-6 mt-20 flex justify-center items-start gap-20">
        {/* Left Section - Property Details */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Cozy Studio in City Center
          </h1>
          <p className="text-gray-600">San Francisco, CA</p>

          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="Living Room"
              className="w-full h-60 object-cover rounded-xl"
            />
            <img
              src="https://images.unsplash.com/photo-1615874959474-d609969a20ed"
              alt="Kitchen"
              className="w-full h-60 object-cover rounded-xl"
            />
            <img
              src="https://images.unsplash.com/photo-1600566752355-35792bedcfea"
              alt="Bathroom"
              className="w-full h-60 object-cover rounded-xl col-span-2"
            />
          </div>

          {/* Info */}
          <div>
            <p className="text-lg text-gray-800 mt-4">1 beds · 1 baths</p>
            <p className="text-gray-600 mt-2">
              A bright, thoughtfully designed studio in the heart of the city.
              Steps from cafes, transit, and parks. Ideal for solo travelers or
              couples.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["studio", "city", "wifi", "self check-in"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Host */}
          <div className="flex items-center gap-3 mt-6 border-t pt-4">
            <img
              src="https://i.pravatar.cc/100?img=5"
              alt="Host"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-900">Hosted by Maya</p>
              <p className="text-sm text-gray-500">Superhost · 5 years</p>
            </div>
          </div>
        </div>

        {/* Right Section - Booking Card */}
        <div className="w-md">
          <div className="bg-white rounded-2xl shadow-md p-6">
            {/* Pricing */}
            <p className="text-xl font-semibold">
              From <span className="text-2xl">${nightlyRate}/night</span>
            </p>

            {/* Inputs */}
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-sm text-gray-600">Check-in</label>
                <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
                  <Calendar size={18} className="text-gray-400 mr-2" />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="flex-1 bg-transparent outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Check-out</label>
                <div className="flex items-center border rounded-lg px-3 py-2 mt-1">
                  <Calendar size={18} className="text-gray-400 mr-2" />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="flex-1 bg-transparent outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Guests</label>
                <input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2 mt-1 outline-none"
                />
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="mt-6 space-y-2 text-gray-700 text-sm">
              <div className="flex justify-between">
                <span>
                  {nights} night(s) × ${nightlyRate}
                </span>
                <span>${nights * nightlyRate}</span>
              </div>
              <div className="flex justify-between">
                <span>Cleaning (8%)</span>
                <span>${nights ? cleaningFee.toFixed(2) : 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Service (6%)</span>
                <span>${nights ? serviceFee.toFixed(2) : 0}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Button */}
            <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition">
              Request to book
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              You won’t be charged yet. The host will confirm your booking.
            </p>
          </div>

          {/* Tenants Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Current Tenants
            </h3>
            <div className="flex -space-x-3">
              <img
                src="https://i.pravatar.cc/100?img=11"
                alt="Tenant"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
              <img
                src="https://i.pravatar.cc/100?img=32"
                alt="Tenant"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
              <img
                src="https://i.pravatar.cc/100?img=45"
                alt="Tenant"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 text-sm font-medium border-2 border-white shadow-sm">
                +2
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              5 tenants currently staying in this property.
            </p>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Reviews</h3>

            <div className="space-y-4">
              {/* Review 1 */}
              <div className="border-b pb-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/100?img=21"
                    alt="Reviewer"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="font-medium text-gray-800">Sophia</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Amazing stay! The studio was spotless and close to everything.
                </p>
              </div>

              {/* Review 2 */}
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/100?img=29"
                    alt="Reviewer"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="font-medium text-gray-800">Daniel</p>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Very cozy place, the host was super friendly. Definitely coming back!
                </p>
              </div>
            </div>

            <button className="w-full mt-4 text-green-600 hover:text-green-700 text-sm font-medium">
              View all reviews →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PropertyDetailsPage;
