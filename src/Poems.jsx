import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
function Poems() {
  const params = useParams();
  const [poems, setPoems] = useState([]);
  const getPoems = async () => {
    try {
      console.log(params);
      const poemResp = await axios.get(
        `https://65cb0153efec34d9ed86894c.mockapi.io/poems?unitId=${params.unitId}`
      );
      setPoems(poemResp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPoems();
  }, []);
  return (
    <div>
      {poems.map((poem, index) => {
        return (
          <p key={index}>
            <Link
              to={`/chapter/${params.chapterId}/unit/${params.unitId}/poem/${poem.id}`}
            >
              {poem.poem}
            </Link>
          </p>
        );
      })}
    </div>
  );
}

export default Poems;
