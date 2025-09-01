const Contacts = () => {
  return (
    <div className="space-y-2">
      <p>Email: <a href="mailto:youremail@example.com" className="underline text-green-200">youremail@example.com</a></p>
      <p>GitHub: <a href="https://github.com/username" target="_blank" className="underline text-green-200">github.com/username</a></p>
      <p>LinkedIn: <a href="https://linkedin.com/in/username" target="_blank" className="underline text-green-200">linkedin.com/in/username</a></p>
    </div>
  );
};

export default Contacts;
