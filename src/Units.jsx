import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
function Units() {
  const parms = useParams();
  const [units, setUnits] = useState([]);
  let getUnits = async () => {
    try {
      console.log(parms);
      const unitResp = await axios.get(
        `https://6461c1c2491f9402f4aa0565.mockapi.io/units?chapterId=${parms.chapterId}`
      );
      setUnits(unitResp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUnits();
  }, []);
  return (
    <ul>
      {units.map((unit, index) => {
        return (
          <li key={index}>
            <Link to={`/chapter/${parms.chapterId}/unit/${unit.id}`}>
              {unit.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Units;
