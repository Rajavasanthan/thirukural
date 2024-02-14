import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
function Create() {
  const [chapters, setChapters] = useState([]);
  const [units, setUnits] = useState([]);

  const formik = useFormik({
    initialValues: {
      kuralNumber: "",
      chapterId: "",
      unitId: "",
      poem: "",
      explanations: [
        {
          author: "மு.வ உரை",
          explanation: "",
        },
        {
          author: "சாலமன் பாப்பையா உரை",
          explanation: "",
        },
        {
          author: "கலைஞர் உரை",
          explanation: "",
        },
      ],
    },
    validate: (values) => {
      console.log(values);
    },
    onSubmit: async (values) => {
      try {
        await axios.post(
          "https://65cb0153efec34d9ed86894c.mockapi.io/poems",
          values
        );
        alert("Done");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const getChapters = async () => {
    try {
      const chapterResp = await axios.get(
        "https://6461c1c2491f9402f4aa0565.mockapi.io/chapters"
      );
      console.log(chapterResp);
      setChapters(chapterResp.data);
      formik.setFieldValue("chapterId", 1);

      const unitResp = await axios.get(
        `https://6461c1c2491f9402f4aa0565.mockapi.io/units?chapterId=1`
      );

      setUnits(unitResp.data);
      formik.setFieldValue("unitId", unitResp.data[0].id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChapters();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1>Create Kural</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="col-lg-12">
            <label htmlFor="">Kural Number</label>
            <input
              type="text"
              name="kuralNumber"
              value={formik.values.kuralNumber}
              onChange={formik.handleChange}
              className="form-control"
            />
          </div>
          <div className="col-lg-12">
            <label htmlFor="">Chapter</label>
            <select
              className="form-control"
              name="chapterId"
              value={formik.values.chapterId}
              onChange={async (e) => {
                formik.setFieldValue("chapterId", e.target.value);
                const unitsRes = await axios.get(
                  `https://6461c1c2491f9402f4aa0565.mockapi.io/units?chapterId=${e.target.value}`
                );
                setUnits(unitsRes.data);
                formik.setFieldValue("unitId", unitsRes.data[0].id);
              }}
            >
              {chapters.map((chapter, index) => {
                return (
                  <option key={index} value={chapter.id}>
                    {chapter.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-lg-12">
            <label htmlFor="">Unit</label>
            <select
              className="form-control"
              name="unitId"
              value={formik.values.unitId}
              onChange={formik.handleChange}
            >
              {units.map((unit, index) => {
                return (
                  <option key={index} value={unit.id}>
                    {unit.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-lg-12">
            <label htmlFor="">Kural</label>
            <textarea
              name="poem"
              value={formik.values.poem}
              onChange={formik.handleChange}
              className="form-control"
            ></textarea>
          </div>
          <h2>Explanations</h2>
          <div className="col-lg-12">
            <h4>மு.வ உரை</h4>
          </div>
          <div className="col-lg-12">
            <label htmlFor="">Explanation</label>
            <textarea
              value={formik.values.explanations[0].explanation}
              onChange={(e) =>
                formik.setFieldValue(
                  "explanations[0].explanation",
                  e.target.value
                )
              }
              className="form-control"
            ></textarea>
          </div>

          <div className="col-lg-12">
            <h4>சாலமன் பாப்பையா உரை</h4>
          </div>
          <div className="col-lg-12">
            <label htmlFor="">Explanation</label>
            <textarea
              value={formik.values.explanations[1].explanation}
              onChange={(e) =>
                formik.setFieldValue(
                  "explanations[1].explanation",
                  e.target.value
                )
              }
              className="form-control"
            ></textarea>
          </div>

          <div className="col-lg-12">
            <h4>கலைஞர் உரை</h4>
          </div>
          <div className="col-lg-12">
            <label htmlFor="">Explanation</label>
            <textarea
              value={formik.values.explanations[2].explanation}
              onChange={(e) =>
                formik.setFieldValue(
                  "explanations[2].explanation",
                  e.target.value
                )
              }
              className="form-control"
            ></textarea>
          </div>
          <div className="col-lg-12 mt-2">
            <input type="submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
