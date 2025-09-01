import { useState } from "react";

const posts = [
  {
    title: "Introduzione al Systems Programming in Rust",
    date: "2025-06-10",
    content: "Oggi parliamo di come Rust possa essere usato per sviluppare sistemi sicuri e performanti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    title: "Come funziona un terminale hacker-style",
    date: "2025-06-01",
    content: "Ho deciso di creare un portfolio ispirato ai terminali, con effetti glitch e digitazione. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    title: "AI e sistemi embedded: prospettive future",
    date: "2025-05-25",
    content: "L'integrazione dell'intelligenza artificiale in sistemi embedded sta cambiando il modo in cui sviluppiamo dispositivi. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
];

const Blog = () => {
  const [expandedPost, setExpandedPost] = useState(null);

  const togglePost = (index) => {
    setExpandedPost(expandedPost === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {posts.map((post, i) => (
        <div key={i} className="border-l-2 border-[#FFB641] pl-2">
          <h3
            className="text-[#FFB641] font-bold cursor-pointer hover:underline"
            onClick={() => togglePost(i)}
          >
            {post.title}
          </h3>
          <p className="text-[#fac570] text-sm">{post.date}</p>
          <p>
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
