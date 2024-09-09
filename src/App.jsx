import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

const availableSchemas = [
  { label: "firstname", value: "first_name" },
  { label: "lastname", value: "last_name" },
  { label: "gender", value: "gender" },
  { label: "age", value: "age" },
  { label: "account name", value: "account_name" },
  { label: "city", value: "city" },
  { label: "state", value: "state" },
];

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]); 
  const [unselectedSchemas, setUnselectedSchemas] = useState(availableSchemas); 

  const openPopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const addNewSchema = () => {
    setSchemas([...schemas, { label: "Select schema", value: "" }]); 
  };

  const handleSchemaChange = (index, value) => {
    const selectedOption = unselectedSchemas.find((schema) => schema.value === value);
    const updatedSchemas = [...schemas];
    updatedSchemas[index] = selectedOption;

    setSchemas(updatedSchemas);
    setUnselectedSchemas(unselectedSchemas.filter((schema) => schema.value !== value));
  };

  const handleRemoveSchema = (index) => {
    const removedSchema = schemas[index];
    const updatedSchemas = schemas.filter((_, i) => i !== index);
    setSchemas(updatedSchemas);
    setUnselectedSchemas([...unselectedSchemas, removedSchema]);
  };

  const handleSaveSegment = async () => {
    const data = {
      segment_name: segmentName,
      schema: schemas.map((schema) => ({ [schema.value]: schema.label })),
    };

    console.log(data, "DATA");

    const webhookUrl = "https://webhook.site/a3ff8e9d-8ca3-473a-b858-31e610df4eb4";

    await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    openPopup();
  };

  return (
    <div className="min-h-screen flex items-center bg-gray-100 p-4">
      <button
        className="bg-teal-600 text-white px-4 py-2 rounded-md"
        onClick={openPopup}
      >
        Save segment
      </button>

      <div
        className={`fixed top-0 right-0 w-full md:w-1/2 h-full bg-white shadow-lg transform ${
          isPopupOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="flex p-6 gap-4 bg-teal-500">
          <button className="text-white text-bold text-3xl" onClick={openPopup}>
            <IoIosArrowBack/>
          </button>
          <h2 className="font-bold text-2xl text-white">Saving Segment</h2>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 w-full flex-grow overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Saving Segment</h2>
          <h3 className="text-black mb-2">Enter the Name of the Segment</h3>
          <input
            type="text"
            placeholder="Name of the segment"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <div className="border-2 border-blue-500 p-4 rounded-lg mb-4">
            <p className="mb-3">To save your segment, you need to add schemas to build the query ⬇️</p>
            {schemas.map((schema, index) => (
              <div key={index} className="flex items-center mb-2">
                <select
                  value={schema.value || ""}
                  onChange={(e) => handleSchemaChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="" disabled>Select schema</option> 
                  {unselectedSchemas.concat(schema).filter((s) => s.label !== "Select schema").map((s) => (   
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <button
                  className="ml-2 text-3xl text-teal-500 bg-teal-100 px-3 py-1 font-bold"
                  onClick={() => handleRemoveSchema(index)}
                >
                  <span className="pb-2">-</span>
                </button>
              </div>
            ))}
            <button
              onClick={addNewSchema}
              className=" text-teal-500 whitespace-nowrap underline-offset-4 underline"
            >
              + Add to schema
            </button>
          </div>
        </div>

        <div className="p-6 flex gap-4 bg-[#F6F8F8] border-t border-gray-300">
          <button
            onClick={handleSaveSegment}
            className="bg-[#52C0B4] text-white px-4 py-2 rounded-md"
          >
            Save the Segment
          </button>
          <button
            onClick={openPopup}
            className="text-[#EC676A] bg-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
