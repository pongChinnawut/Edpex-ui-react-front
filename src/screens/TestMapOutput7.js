import React from "react";
import { Button } from "react-bootstrap";

export default function TestMapOutput7() {
  const [analysisCategory, setanalysisCategory] = React.useState(new Map());
  let analysisCategory_in = new Map();
  const data = [
    {
      id: 1,
      description: "จำนวนครั้งไฟดับ",
      category: "7.1",
      subCategory: "7.1ก",
      smallSubCategory: "1",
    },
    {
      id: 2,
      description: "จำนวนครั้งน้ำดับ",
      category: "7.1",
      subCategory: "7.1ก",
      smallSubCategory: "2",
    },
    {
      id: 3,
      description: "จำนวนคนล้ม",
      category: "7.1",
      subCategory: "7.1ข",
      smallSubCategory: "1",
    },
    {
      id: 4,
      description: "จำนวนคนโนจี้",
      category: "7.2",
      subCategory: "7.2ก",
      smallSubCategory: "3",
    },
    {
      id: 5,
      description: "จำนวนคนนน",
      category: "7.2",
      subCategory: "7.2ข",
      smallSubCategory: "1",
    },
    {
      id: 6,
      description: "จำนวนไฟไหม้",
      category: "7.3",
      subCategory: "7.3ก",
      smallSubCategory: "10",
    },
    {
      id: 7,
      description: "จำนวนคนบ้า",
      category: "7.3",
      subCategory: "7.3ข",
      smallSubCategory: "3",
    },
  ];

  React.useEffect(() => {
    // let analysisCategory = new Map();
    let outputData1 = [];
    let outputData2 = [];
    let outputData3 = [];
    let outputData4 = [];
    let outputData5 = [];

    if (data) {
      data.map((roundData, index) => {
        console.log(index);
        if (roundData.category == "7.1") {
          outputData1.push(roundData);
        } else if (roundData.category == "7.2") {
          outputData2.push(roundData);
        } else if (roundData.category == "7.3") {
          outputData3.push(roundData);
        } else if (roundData.category == "7.4") {
          outputData4.push(roundData);
        } else if (roundData.category == "7.5") {
          outputData5.push(roundData);
        }
      });
      analysisCategory_in.set("7.1", outputData1);
      analysisCategory_in.set("7.2", outputData2);
      analysisCategory_in.set("7.3", outputData3);
      analysisCategory_in.set("7.4", outputData4);
      analysisCategory_in.set("7.5", outputData5);
      setanalysisCategory(analysisCategory_in);

      // console.log(analysisCategory_in);
    }
  }, []);

  const point = ["7.1", "7.2", "7.3", "7.4", "7.5"];

  const alertID = (id) => {
    console.log(">>>" + id);
  };
  return (
    <div>
      {analysisCategory.get("7.1") &&
        analysisCategory.has("7.1") &&
        analysisCategory.get("7.1").map((data_round) => (
          <div>
            <div style={{ display: "flex" }}>
              <h1>{`${data_round.subCategory}${data_round.smallSubCategory} ${data_round.description}`}</h1>
              <Button onClick={() => alertID(data_round.id)}>กราฟ</Button>
            </div>
            <h4>{data_round.id}</h4>
          </div>
        ))}
      {/* {analysisCategory.get("7.2") &&
        analysisCategory.has("7.2") &&
        analysisCategory.get("7.2").map((data_round) => (
          <div>
            <div style={{ display: "flex" }}>
              <h1>{`${data_round.subCategory}${data_round.smallSubCategory} ${data_round.description}`}</h1>
              <Button onClick={() => alertID(data_round.id)}>กราฟ</Button>
            </div>
            <h4>{data_round.id}</h4>
          </div>
        ))}
      {analysisCategory.get("7.3") &&
        analysisCategory.has("7.3") &&
        analysisCategory.get("7.3").map((data_round) => (
          <div>
            <div style={{ display: "flex" }}>
              <h1>{`${data_round.subCategory}${data_round.smallSubCategory} ${data_round.description}`}</h1>
              <Button onClick={() => alertID(data_round.id)}>กราฟ</Button>
            </div>
            <h4>{data_round.id}</h4>
          </div>
        ))}
        {analysisCategory.get("7.4") &&
        analysisCategory.has("7.4") &&
        analysisCategory.get("7.4").map((data_round) => (
          <div>
            <div style={{ display: "flex" }}>
              <h1>{`${data_round.subCategory}${data_round.smallSubCategory} ${data_round.description}`}</h1>
              <Button onClick={() => alertID(data_round.id)}>กราฟ</Button>
            </div>
            <h4>{data_round.id}</h4>
          </div>
        ))}
        {analysisCategory.get("7.5") &&
        analysisCategory.has("7.5") &&
        analysisCategory.get("7.5").map((data_round) => (
          <div>
            <div style={{ display: "flex" }}>
              <h1>{`${data_round.subCategory}${data_round.smallSubCategory} ${data_round.description}`}</h1>
              <Button onClick={() => alertID(data_round.id)}>กราฟ</Button>
            </div>
            <h4>{data_round.id}</h4>
          </div>
        ))} */}
    </div>
  );
}
