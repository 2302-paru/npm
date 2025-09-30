import React, { useEffect, useState } from "react";

const Resources = () => {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return alert("No userId found. Please login first.");

    const fetchData = async () => {
      try {
        // 1️⃣ Get user info
        const resUser = await fetch(
          `http://localhost:5000/api/users/${userId}`
        );
        const userData = await resUser.json();
        setUser(userData);

        // 2️⃣ Get videos based on interests
        let url = "http://localhost:5000/api/videos";
        if (userData.role === "mentee" && userData.interests.length > 0) {
          const query = userData.interests.join(",");
          url += `?interests=${query}`;
        }

        const resVideos = await fetch(url);
        const videosData = await resVideos.json();
        setVideos(videosData);
      } catch (err) {
        console.error("Error fetching resources:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-6">
        {user?.role === "mentee" ? "Recommended for you" : "All Resources"}
      </h1>

      {videos.length === 0 ? (
        <p>No videos available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div key={video._id} className="bg-gray-900 p-2 rounded-lg">
              <h2 className="font-semibold mb-2">{video.title}</h2>
              <iframe
                width="100%"
                height="200"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Resources;
