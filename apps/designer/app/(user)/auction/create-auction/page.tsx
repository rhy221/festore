// app/create-auction/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateAuctionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startingPrice: '',
    bidIncrement: '',
    startTime: '',
    endTime: '',
    images: [''],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  };

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      images: newImages.length > 0 ? newImages : [''],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        startingPrice: Number(formData.startingPrice),
        bidIncrement: Number(formData.bidIncrement) || 1000,
        startTime: new Date(formData.startTime).toISOString(),
        endTime: new Date(formData.endTime).toISOString(),
        images: formData.images.filter((img) => img.trim() !== ''),
      };

      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:3003/auctions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (token ?? "")
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to create auction');
      }

      const data = await res.json();
      alert('Auction created successfully!');
      router.push(`/auction/${data._id}`);
    } catch (error: any) {
      console.error('Error creating auction:', error);
      alert(error.message || 'Failed to create auction');
    } finally {
      setLoading(false);
    }
  };

  // Set minimum datetime to current time
  const now = new Date();
  const minDateTime = now.toISOString().slice(0, 16);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Create New Auction</h1>
        <p className="text-gray-600">List your item for auction</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Vintage Rolex Watch"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe your item in detail..."
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium mb-2">Images (URLs)</label>
          <div className="space-y-3">
            {formData.images.map((img, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="url"
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addImageField}
            className="mt-3 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            + Add Another Image
          </button>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startingPrice" className="block text-sm font-medium mb-2">
              Starting Price (VND) *
            </label>
            <input
              type="number"
              id="startingPrice"
              name="startingPrice"
              value={formData.startingPrice}
              onChange={handleChange}
              required
              min="0"
              step="1000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1000000"
            />
          </div>

          <div>
            <label htmlFor="bidIncrement" className="block text-sm font-medium mb-2">
              Bid Increment (VND)
            </label>
            <input
              type="number"
              id="bidIncrement"
              name="bidIncrement"
              value={formData.bidIncrement}
              onChange={handleChange}
              min="0"
              step="1000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="10000"
            />
            <p className="text-sm text-gray-600 mt-1">Minimum amount for each bid increase</p>
          </div>
        </div>

        {/* Timing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium mb-2">
              Start Time *
            </label>
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              min={minDateTime}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="endTime" className="block text-sm font-medium mb-2">
              End Time *
            </label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              min={formData.startTime || minDateTime}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Creating Auction...' : 'Create Auction'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-4 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Preview */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-2xl font-bold mb-2">{formData.title || 'Auction Title'}</h3>
          <p className="text-gray-700 mb-4">{formData.description || 'Auction description...'}</p>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>
              Starting Price:{' '}
              <strong className="text-blue-600">
                {formData.startingPrice
                  ? new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(Number(formData.startingPrice))
                  : '0 ₫'}
              </strong>
            </span>
            {formData.bidIncrement && (
              <span>
                Bid Increment:{' '}
                <strong>
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(Number(formData.bidIncrement))}
                </strong>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}