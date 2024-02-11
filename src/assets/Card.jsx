import React, { useState, useEffect } from "react";
import axios from "axios";

const Card = ({ imgURL, title, genre, summary }) => {
  const [details, setDetails] = useState(false);
  return (
    <div className="h-[400px] w-[210px] rounded-lg overflow-hidden bg-gray-100 shadow-md">
      {details === false && (
        <div >
          <img
            src={imgURL}
            alt={title}
            className="w-full h-[280px] object-cover relative"
          />
          <div className="p-4">
            <h1 className="text-lg font-extrabold">{title}</h1>
            <p className="text-red-500 font-bold ">{genre}</p>
            <button
              onClick={() => setDetails(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2"
            >
              View Details
            </button>
          </div>
        </div>
      )}

      {details === true && (
        <div className="mt-2 text-sm text-black-400 p-2 h-[400px] overflow-y-scroll">
          <p>{summary}</p>
          <button
              onClick={() => setDetails(false)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2"
            >Close Details</button>
        </div>

      )}
    </div>
  );
};

export default function App() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/search/shows?q=all")
      .then((response) => {
        setShows(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-5 ">
      {shows?.map((show) => (
        <Card
          key={show?.show?.id}
          imgURL={
            show?.show?.id === 65759
              ? "https://m.media-amazon.com/images/S/pv-target-images/cb93f53b9b6888349851126da5aecc9343a6beee7a9ec235a4854a9d1bc5484d.jpg"
              : show?.show?.image?.medium
          }
          title={show?.show?.name}
          genre={show?.show?.genres}
          summary={show?.show?.summary.replace(/<[^>]*>/g, "")}
        />
      ))}
    </div>
  );
}
