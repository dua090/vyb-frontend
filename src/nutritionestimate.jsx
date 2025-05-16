import React, { useState } from "react";
import './App.css'
import axios from "axios";

function NutritionEstimator() {
  const [dishName, setDishName] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setData(null);
    setError(null);

    try {
      const response = await axios.post("https://recipe-vyb.onrender.com/estimate", {
        dishName: dishName,
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-10">
        {/* Top Heading */}
        <h1 className="text-4xl font-extrabold text-center mb-10 text-white bg-gradient-to-r from-orange-400 to-red-500 py-4 rounded-xl shadow-lg tracking-wide">
          🍽️ Nutrition Estimator
        </h1>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
          <input
            type="text"
            placeholder="Enter Dish Name"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            className="flex-1 p-3 border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-md text-white font-semibold ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            }`}
          >
            {loading ? "Loading..." : "Estimate"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Result Display */}
        {data && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-orange-600 mb-6 text-center">
              {data.dish_name}
              {data.dish_type && (
                <span className="text-gray-500 ml-1">({data.dish_type})</span>
              )}
            </h2>

            {/* Nutrition Table */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg text-gray-700 mb-2">
                Estimated Nutrition per Serving:
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full leading-normal shadow-md rounded-lg">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Nutrient
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(data.estimated_nutrition_per_serving).map(
                      ([key, value]) => (
                        <tr key={key}>
                          <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm capitalize">
                            {key}
                          </td>
                          <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                            {value}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Ingredient List */}
            <div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2">
                Ingredients Used:
              </h3>
              <ul className="divide-y divide-gray-200 rounded-md shadow-sm">
                {data.ingredients_used.map((item, index) => (
                  <li key={index} className="px-4 py-3 bg-white text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-800">
                        {item.ingredient}
                      </span>
                      <span className="text-gray-600">
                        {item.quantity} ({item.weight_grams}g)
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NutritionEstimator;
