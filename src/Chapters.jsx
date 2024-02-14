import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function Chapters() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const getChapters = async () => {
    try {
      const chapterResp = await axios.get(
        "https://6461c1c2491f9402f4aa0565.mockapi.io/chapters"
      );
      console.log(chapterResp);
      setChapters(chapterResp.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChapters();
  }, []);
  return (
    <div className="container text-center">
      {loading ? (
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          {chapters.map((chapter, index) => {
            return (
              <div key={index} className="card mb-3">
                <img
                  src={`https://place-hold.it/1920x300?text=${chapter.name}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <Link to={`/chapter/${chapter.id}`}>
                    <h5 className="card-title">{chapter.name}</h5>
                  </Link>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Chapters;
