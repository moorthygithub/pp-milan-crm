import React, { useState } from "react";
import Layout from "../../../layout/Layout";
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";
import toast from "react-hot-toast";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import SelectInput from "../../../components/common/SelectInput";

const groupNames = [
  { value: "group1", label: "Group 1" },
  { value: "group2", label: "Group 2" },
  { value: "group3", label: "Group 3" },
  { value: "group4", label: "Group 4" },
  { value: "group5", label: "Group 5" },
  { value: "group6", label: "Group 6" },
  { value: "group7", label: "Group 7" },
  { value: "group8", label: "Group 8" },
];

const AddContact = () => {
  const [contact, setContact] = useState({
    contact_name: "",
    contact_mobile: "",
    contact_email: "",
    contact_address: "",
    contact_group: [],
    contact_state: "",
    contact_pincode: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const [mobileError, setMobileError] = useState("");

  const handleGroupChange = (event) => {
    const { value } = event.target;
    setContact((prev) => ({
      ...prev,
      contact_group: value, // Store the selected groups as an array
    }));
  };

  const validateOnlyDigits = (inputtxt) => /^\d*$/.test(inputtxt); // Simplified validation

  const onInputChange = (name, value) => {
    if (name === "contact_mobile" && validateOnlyDigits(value)) {
      setContact({ ...contact, contact_mobile: value });
    } else {
      setContact({ ...contact, [name]: value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);

    if (mobileError) {
      toast.error("Please fix the errors before submitting.");
      setIsButtonDisabled(false);
      return;
    }
    const groupString = contact.contact_group.join(",");

    const data = {
      contact_name: contact.contact_name,
      contact_mobile: contact.contact_mobile,
      contact_email: contact.contact_email,
      contact_address: contact.contact_address,
      contact_group: groupString,
      contact_pincode: contact.contact_pincode,
      contact_state: contact.contact_state,
    };

    try {
      await axios.post(`${BASE_URL}/panel-create-group`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Contact added successfully!");
      navigate("/Contact");
      setContact({
        contact_name: "",
        contact_mobile: "",
        contact_email: "",
        contact_address: "",
        contact_state: "",
        contact_pincode: "",
        contact_group: "", // Reset to empty string after successful submit
      });
    } catch (error) {
      toast.error("Error adding contact!");
      console.error(error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const FormLabel = ({ children, required }) => (
    <label className="block text-sm font-semibold text-black mb-1">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  const inputClass =
    "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 border-green-500";

  return (
    <Layout>
      <div className="bg-[#FFFFFF] p-4 rounded-lg">
        <div className="sticky top-0 p-2 mb-4 border-b-2 border-green-500 rounded-lg bg-[#E1F5FA]">
          <h2 className="px-5 text-black text-lg flex items-center gap-2">
            Add Contact
          </h2>
        </div>
        <form
          autoComplete="off"
          onSubmit={onSubmit}
          className="w-full max-w-7xl mx-auto p-6 space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <FormLabel required> Name</FormLabel>
              <input
                type="text"
                name="contact_name"
                value={contact.contact_name}
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <FormLabel required>Mobile No</FormLabel>
              <input
                name="contact_mobile"
                type="tel"
                maxLength={10}
                value={contact.contact_mobile}
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
                className={inputClass}
                required
              />
              {mobileError && (
                <p className="text-red-500 text-sm mt-1">{mobileError}</p>
              )}
            </div>

            <FormControl sx={{ width: "100%" }}>
              <FormLabel required>Group Name</FormLabel>
              <Select
                labelId="demo-group-name-label"
                id="demo-group-name"
                multiple
                value={contact.contact_group} // Now it's an array
                onChange={handleGroupChange} // Handles multi-selection
                input={
                  <OutlinedInput
                    sx={{
                      width: "100%",
                      fontSize: "0.75rem",
                      border: "1px solid #4caf50",
                      borderRadius: "8px",
                      "&:focus": {
                        outline: "none",
                        borderColor: "#42a5f5",
                        boxShadow: "0 0 0 1px rgba(66, 165, 245, 0.5)",
                      },
                    }}
                    size="small"
                  />
                }
              >
                {groupNames.map((group) => (
                  <MenuItem key={group.value} value={group.value}>
                    {group.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div>
              <FormLabel required>Email</FormLabel>
              <input
                type="email"
                name="contact_email"
                value={contact.contact_email}
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
                className={inputClass}
                required
              />
            </div>
          </div>
          <div>
            <div>
              <FormLabel required>Address</FormLabel>
              <textarea
                name="contact_address"
                value={contact.contact_address}
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
                rows="3"
                className={inputClass}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            <div>
              <SelectInput
                label="State"
                options={groupNames}
                required
                value={contact.contact_state || ""}
                name="contact_state"
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
              />
            </div>

            <div>
              <FormLabel required>Pincode</FormLabel>
              <input
                name="contact_pincode"
                type="tel"
                maxLength={6}
                value={contact.contact_pincode}
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
                className={inputClass}
                required
              />
              {mobileError && (
                <p className="text-red-500 text-sm mt-1">{mobileError}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-4">
            <Button
              className="w-36 text-white bg-blue-600"
              type="submit"
              disabled={isButtonDisabled || mobileError}
            >
              {isButtonDisabled ? "Submitting..." : "Submit"}
            </Button>
            <Button
              className="w-36 text-white bg-red-600"
              onClick={() => navigate("/Contact")}
            >
              Back
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddContact;
