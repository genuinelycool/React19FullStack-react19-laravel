import { useEffect, useState } from "react";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [seconds, setSeconds] = useState(0);

  // 1. Mounting phase
  // 2. Updating phase
  // 3. Clean up phase

  // 1. Mounting
  useEffect(() => {
    console.log("Mounting");

    // fetch("https://jsonplaceholder.typicode.com/posts")
    fetch(`https://jsonplaceholder.typicode.com/posts?q=${query}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");

        return res.json();
      })
      .then((data) => setPosts(data));
    // }, []);
  }, [query]);

  // 3. Clean up
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, []);

  // set post search
  const changeHandler = (e) => {
    // console.log(e.target.value);
    setQuery(e.target.value);
  };

  return (
    <div>
      <div>Seconds: {seconds}</div>

      <h4>Posts Listing</h4>

      <input
        type="text"
        onChange={changeHandler}
        placeholder="Search Post... "
      />

      <table>
        <thead>
          <th>ID</th>
          <th>Title</th>
          <th>Body</th>
        </thead>

        <tbody>
          {posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <tr>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                </tr>
              ))}
            </>
          ) : (
            <p>No posts found</p>
          )}
        </tbody>
      </table>
    </div>
  );
};
