import { useState } from "react";
import posts from "../contents/blogPosts"; // importa i post dal file separato

const Blog = () => {
  const [expandedPost, setExpandedPost] = useState(null);

  const togglePost = (index) => {
    setExpandedPost(expandedPost === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {posts.map((post, i) => (
        <div key={i} className="border-l-2 text-celestial pl-2">
          <h3
            className="text-amber-medium font-bold cursor-pointer hover:underline"
            onClick={() => togglePost(i)}
          >
            {post.title}
          </h3>
          <p className="text-celestial-dark text-sm">{post.date}</p>
          <p className="text-celestial">
            {expandedPost === i
              ? post.content
              : post.content.length > 100
              ? post.content.substring(0, 100) + "..."
              : post.content}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Blog;
