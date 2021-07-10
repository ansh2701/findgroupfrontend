import { useState } from "react";
import { getStrapiURL } from "../lib/api";
import { FaLink } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Form.module.css";

const Form = ({ categories, types }) => {
  const [values, setValues] = useState({
    name: "",
    link: "",
    email: "",
    description: "",
    category: 1,
    type: 2,
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name !== "link") {
      value = value.toUpperCase();
    }
    setValues({ ...values, [name]: value });
  };

  const handleRelationChange = (e) => {
    const { name, value } = e.target;
    (name === "type" ? types : categories).filter((val) => {
      if (val.name === value) {
        setValues({ ...values, [name]: val.id });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      return toast.error(" Fill all fields...", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    console.log(JSON.stringify(values));
    const res = await fetch(getStrapiURL("/links"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error(" Something Went Wrong...", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(" YaY Link submitted", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            <span className={styles.number}>
              <FaLink />
            </span>{" "}
            Link Info
          </legend>
          <input
            type="text"
            name="name"
            placeholder="Group Name *"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email *"
            onChange={handleChange}
          />
          <input
            type="url"
            name="link"
            placeholder="Group Link *"
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Group description"
            onChange={handleChange}
          ></textarea>
          <label htmlFor="job">Type of Group</label>
          <select id="job" name="type" onChange={handleRelationChange}>
            {types.map((type, index) => {
              return (
                <option value={type.name} key={index}>
                  {type.name}
                </option>
              );
            })}
          </select>
          <label htmlFor="job">Category</label>
          <select id="job" name="category" onChange={handleRelationChange}>
            {categories.map((type, index) => {
              return (
                <option value={type.name} key={index}>
                  {type.name}
                </option>
              );
            })}
          </select>
        </fieldset>
        <input type="submit" value="Apply" />
      </form>
    </div>
  );
};

export default Form;
