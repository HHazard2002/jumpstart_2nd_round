import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AirtableContext = createContext();

export const useAirtable = () => {
  return useContext(AirtableContext);
};

export const AirtableProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("yes");
      const baseId = "appabWgUqx5k2dLuN";
      const tableName = "Candidates";
      const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;
      const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });

        console.log("Data :", response);
        const transformedData = response.data.records.map((record) => ({
          id: record.id,
          name: record.fields["First name"],
          lastName: record.fields["Second name"],
          education: Array.isArray(record.fields["Education"])
            ? record.fields["Education"]
            : [record.fields["Education"]],
          roles: record.fields["Roles suitable for"],
          salary: record.fields["Salary expectations"],
          description: record.fields["Something they're proud of"],
          email: record.fields["Email address"],
          image: record.fields.Photo ? record.fields.Photo[0].url : null,
          linkedin: record.fields["LinkedIn"],
        }));
        setData(transformedData);
        console.log(
          "Data fetched and transformed successfully:",
          transformedData
        );

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AirtableContext.Provider value={{ data, loading, error }}>
      {children}
    </AirtableContext.Provider>
  );
};
