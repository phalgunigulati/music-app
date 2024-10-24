import { useEffect, useState } from 'react'

function App() {
  const NO_CODE_API_KEY = process.env.REACT_APP_NO_CODE_API_KEY;
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [tracks, setTracks] = useState([]);

  const getTracks = async () => {
    setIsLoading(true);
    try{
      console.log("API Key:", NO_CODE_API_KEY);
      const data = await fetch(`https://v1.nocodeapi.com/phalguni27/spotify/${NO_CODE_API_KEY}/search?q=${keyword === "" ? "trending" : keyword}&type=track`);
      const response = await data.json();
      if (response.error) {
        console.error(`API error: ${response.error} - ${response.info}`);
        throw new Error(response.info);
      }
      const tracks = response.tracks?.items;
      if (!tracks) {
        console.error("No tracks found in API response");
        throw new Error("No tracks found");
      }
    setTracks(tracks);
   
    } catch(error) {
      console.error("Error fetching tracks:", error); // Log any errors

    }
    finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    console.log("Updated tracks:", tracks);
}, [tracks]);

  useEffect(() => {
    getTracks();
  }, []);

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Wave
          </a>

          <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">

            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              className="form-control me-2 w-75"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button onClick={getTracks} className="btn btn-outline-success">
              Search
            </button>

          </div>
        </div>
      </nav>

      <div className='container'>
        <div className={`row ${isLoading ? "" : "d-none"}`}>
          <div className='col-12 py-5 text-center'>
            <>
              <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </>

          </div>
        </div>
        <div className='row'>

          {tracks.map((element) => {
            return (
              <div key={element.id} className="col-lg-3 col-md-6 py-2">
                <div className="card">
                  <img src={element.album.images[0].url} className="card-img-top" alt="album cover" />
                  <div className="card-body">
                    <h5 className="card-title">{element.name}</h5>
                    <p className="card-text">
                      Artist: {element.album.artists[0].name}
                    </p>
                    <p className="card-text">
                      Release Date: {element.album.release_date}
                    </p>
                    <audio className="w-100"
                      src={element.preview_url}
                      controls>
                    </audio>
                  </div>
                </div>

              </div>
            )
          })}

        </div>
      </div>

    </>
  );
}

export default App;
