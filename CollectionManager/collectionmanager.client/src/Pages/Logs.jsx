import { useState, useEffect } from "react";
import axios_instance from "../utils/apiconfig";

const Logs = () => {
  const [logs, setLogs] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    await axios_instance
      .get("/api/informationlogs")
      .then((res) => {
        console.log(res.data);
        setLogs(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {logs && (
        <ul>
          {logs.map((item) => (
            <li key={item.id}>
              {item.updatedAt} {item.message}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Logs;
