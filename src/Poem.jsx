import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function Poem() {
  const params = useParams();
  const [poem, setPoem] = useState(null);
  const getPoems = async () => {
    try {
      const poemResp = await axios.get(
        `https://65cb0153efec34d9ed86894c.mockapi.io/poems/${params.poemId}`
      );
      setPoem(poemResp.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPoems();
  }, []);
  return (
    <div>
      <p>{poem?.poem}</p>

      {poem?.explanations.map((explanation) => {
        return (
          <>
            <h1>{explanation.author}</h1>
            <p>{explanation.explanation}</p>
          </>
        );
      })}
    </div>
  );
}

export default Poem;
