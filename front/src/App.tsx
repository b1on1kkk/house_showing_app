import { useEffect, useState } from "react";

import queryString from "query-string";

import styles from "./App.module.css";

// redux
import { useDispatch } from "react-redux";
import { getHouses } from "./store/features/houses/houses.slice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { NewHouseHandler } from "./store/features/houses/houses.slice";
import { getAvgPrice } from "./store/features/avg_cost/avg_cost.slice";
import { getAvgPriceOfAllRooms } from "./store/features/avg_cost_by_rooms/avg_cost_by_rooms";
//

// components
import HouseCard from "./components/HouseCard/HouseCard";
import NewPost from "./components/NewPost/NewPost";
//

// static
import { template } from "./static/newPostTemplate";
import { cities } from "./static/cities";
//

// utils
import { PushingQueryState } from "./utils/PushingQueryState";
import { ClearQuery } from "./utils/ClearQuery";
//

function App() {
  // redux
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.api.houses);
  const avg_of_all = useSelector((state: RootState) => state.get_avg_data.data);
  const avg_of_all_rooms = useSelector(
    (state: RootState) => state.get_avg_data_of_all.data
  );
  //

  const [newPost, setNewPost] = useState<boolean>(false);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);

  // queries
  const [queryArray, setQueryArray] = useState<string[]>([]);
  const [locationQueryStr, setLocationQueryStr] = useState<string>("");
  const [pricingQueryStr, setPricingQueryStr] = useState<string>("");
  //

  useEffect(() => {
    const queryParameters = new URLSearchParams();

    if (locationQueryStr !== "") {
      queryArray.map((city) => {
        queryParameters.append("location", city);
      });

      PushingQueryState(queryParameters);
    }

    if (pricingQueryStr !== "") {
      queryParameters.append("price_range", pricingQueryStr);

      PushingQueryState(queryParameters);
    }

    if (!queryParameters.toString()) {
      ClearQuery();
    }

    if (window.location.search !== "") {
      dispatch(getHouses(window.location.search));
      dispatch(getAvgPrice());
      dispatch(getAvgPriceOfAllRooms());
    } else {
      dispatch(getAvgPriceOfAllRooms());
      dispatch(getHouses(""));
      dispatch(getAvgPrice());
    }
  }, [locationQueryStr, pricingQueryStr, queryArray, dispatch]);

  return (
    <main className="container">
      <div className="row">
        <div className={`${styles.statistics} col-12`}>
          <div className="row">
            <div className="col-4">
              {avg_of_all_rooms.length > 0 && (
                <>
                  {avg_of_all_rooms.map((e, idx) => {
                    return (
                      <h4 key={idx}>
                        Avg of {e.number_of_rooms} room houses is{" "}
                        {e.avg_price.toFixed(1)} $
                      </h4>
                    );
                  })}
                </>
              )}
            </div>
            <h4 className="col-4">There are {data.length} houses</h4>
            {avg_of_all.length > 0 && (
              <h4 className="col-4">
                Avg of all is: {avg_of_all[0].avg_price.toFixed(1)} $
              </h4>
            )}
          </div>
        </div>

        <div className="col-2">
          <div className={styles.filter}>
            <div className={styles.filtering_checkboxes}>
              <h3>Sorting by location:</h3>
              {cities.map((e, idx) => {
                return (
                  <div className={styles.inputs_wrapper} key={idx}>
                    <label htmlFor="location">{e}</label>
                    <input
                      type="checkbox"
                      id="location"
                      value={e}
                      onClick={(target) => {
                        if (target.currentTarget.checked) {
                          const buffArray = [
                            ...queryArray,
                            target.currentTarget.value
                          ];

                          const queryParams = queryString.stringify(
                            { location: buffArray },
                            { arrayFormat: "bracket" }
                          );

                          setLocationQueryStr(queryParams);
                          setQueryArray(buffArray);
                        } else {
                          const buffArray = [
                            ...queryArray.filter(
                              (location) =>
                                location !== target.currentTarget.value
                            )
                          ];

                          const queryParams = queryString.stringify(
                            { location: buffArray },
                            { arrayFormat: "bracket" }
                          );

                          setLocationQueryStr(queryParams);
                          setQueryArray(buffArray);
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className={styles.filtering_by_price_range}>
              <h3>Sorting by price:</h3>
              <div className={styles.input_price_wrapper}>
                <input
                  type="number"
                  placeholder="from"
                  value={from}
                  onChange={(e) => setFrom(parseInt(e.target.value))}
                />
                <input
                  type="number"
                  placeholder="to"
                  value={to}
                  onChange={(e) => setTo(parseInt(e.target.value))}
                />
                <div className={styles.filter_menu_buttons}>
                  <button
                    onClick={() =>
                      setPricingQueryStr(JSON.stringify({ to: to, from: from }))
                    }
                  >
                    Filter!
                  </button>
                  <button
                    onClick={() => {
                      dispatch(getHouses(""));
                      ClearQuery();
                    }}
                  >
                    Cancel all!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.houses_wrapper} col-10`}>
          {data && (
            <>
              {data.map((house) => {
                return <HouseCard house={house} />;
              })}
            </>
          )}

          {newPost ? (
            <div className={`${styles.adding_new_post} col-12`}>
              <NewPost
                new_added_house={data[data.length - 1]}
                add_more_modal_setter={setNewPost}
              />
            </div>
          ) : (
            <>
              {window.location.search === "" && (
                <div
                  className={`${styles.add_new_post} col-6`}
                  onClick={() => {
                    dispatch(
                      NewHouseHandler({
                        data: {
                          house: { ...template.house, id: data.length + 1 },
                          extensions: { ...template.extensions }
                        },
                        status: "push"
                      })
                    );

                    setNewPost(true);
                  }}
                >
                  <img src="/add.png" alt="" />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
