import { useState } from "react";

function FeedbackForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    rating: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      // ⚡ Replace with your n8n webhook production URL
      const webhookUrl =
        "https://n8n-1ejw.onrender.com/webhook/2203fed6-08ec-468b-8806-215db5d6bc27";

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          rating: "",
          description: "",
        });
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
        Feedback Form
      </h2>

      {/* First Name */}
      <div>
        <label className="block mb-1 text-gray-700 dark:text-gray-200">
          First Name *
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block mb-1 text-gray-700 dark:text-gray-200">
          Last Name *
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1 text-gray-700 dark:text-gray-200">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Rating */}
      <div>
        <label className="block mb-1 text-gray-700 dark:text-gray-200">
          Rating *
        </label>
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">Select a rating</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="okay">Okay</option>
          <option value="bad">Bad</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 text-gray-700 dark:text-gray-200">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Describe the reason for your rating..."
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 transition shadow"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {/* Status Message */}
      {success === true && (
        <p className="text-green-600 dark:text-green-400 text-center mt-2">
          ✅ Feedback submitted successfully!
        </p>
      )}
      {success === false && (
        <p className="text-red-600 dark:text-red-400 text-center mt-2">
          ❌ Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

export default FeedbackForm;
