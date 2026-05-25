import React from "react";

import {
  useApproveReviewMutation,
  useGetPendingReviewsQuery,
} from "../../redux/apis/review.api";
import { Review } from "../../models/review";

const ReviewApprovalComponent = () => {
  const { data: reviews = [], isLoading } =
    useGetPendingReviewsQuery({});

  const [approveReview] = useApproveReviewMutation();

  const handleApprove = async (id: string) => {
    try {
      await approveReview(id);

      alert("Review approved successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        Loading pending reviews...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Pending Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review: Review) => (
          <div
            key={review._id}
            className="border rounded-xl p-5 shadow-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.imgSrc}
                alt={review.name}
                className="w-14 h-14 rounded-full"
              />

              <div>
                <h3 className="font-bold text-lg">
                  {review.name}
                </h3>

                <p className="text-gray-500">
                  {review.role}
                </p>
              </div>
            </div>

            <p className="mb-4 text-gray-700">
              {review.feedback}
            </p>

            <button
              onClick={() => handleApprove(review._id)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewApprovalComponent;