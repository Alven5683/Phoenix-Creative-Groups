// DEPRECATED: This file is no longer used. The page is now in app/website-cost-calculator/page.tsx. You can safely delete this file.
"use client";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

interface FormData {
  type: "basic" | "business" | "ecommerce";
  pages: "1-5" | "6-10" | "11-20" | "20+";
  design: "template" | "custom";
  seo: boolean;
  cms: boolean;
  content: boolean;
  responsive: boolean;
  ecommerce: boolean;
  database: boolean;
  name: string;
  email: string;
  message: string;
}

const WebsiteCostCalculator = () => {
  const [formData, setFormData] = useState<FormData>({
    type: "basic",
    pages: "1-5",
    design: "template",
    seo: false,
    cms: false,
    content: false,
    responsive: false,
    ecommerce: false,
    database: false,
    name: "",
    email: "",
    message: "",
  });

  const priceMap = {
    type: { basic: 300, business: 600, ecommerce: 1000 },
    pages: { "1-5": 0, "6-10": 100, "11-20": 200, "20+": 300 },
    design: { template: 0, custom: 500 },
    seo: 250,
    cms: 200,
    content: 50,
    responsive: 150,
    ecommerce: 1000,
    database: 300,
  };

  const fieldLabels: Record<string, string> = {
    seo: "SEO Optimization",
    cms: "CMS Integration",
    content: "Content Writing",
    responsive: "Responsive Design",
    ecommerce: "eCommerce Functionality",
    database: "Database Integration",
  };

  const getTotal = () => {
    let total = 0;
    total += priceMap.type[formData.type];
    total += priceMap.pages[formData.pages];
    total += priceMap.design[formData.design];
    if (formData.seo) total += priceMap.seo;
    if (formData.cms) total += priceMap.cms;
    if (formData.content)
      total += priceMap.content * (formData.pages === "1-5" ? 5 : formData.pages === "6-10" ? 10 : formData.pages === "11-20" ? 20 : 25);
    if (formData.responsive) total += priceMap.responsive;
    if (formData.ecommerce) total += priceMap.ecommerce;
    if (formData.database) total += priceMap.database;
    return total;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Website Cost Calculator | Phoenix Creative Group</title>
        <meta
          name="description"
          content="Instantly calculate website design costs and request a proposal. Get pricing for business, eCommerce, and custom websites."
        />
      </Helmet>

      <Navbar />
      <Toaster />

      {/* 3D Form Section */}
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white to-gray-100 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/60 backdrop-blur-md shadow-2xl ring-1 ring-gray-300/30 p-8 sm:p-10 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Website Design Cost Calculator
            </h2>

            <form
              action="https://formsubmit.co/phoenixtechgroup1998@gmail.com"
              method="POST"
              onSubmit={() => toast.success("Proposal sent!")}
              className="space-y-4"
            >
              {/* Hidden fields */}
              <input type="hidden" name="_subject" value="New Website Quote!" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://phoenix-tech-group.vercel.app/" />
              <input type="hidden" name="Estimated Total" value={`$${getTotal()}`} />

              {/* Website Type */}
              <div>
                <label>Website Type</label>
                <select name="type" onChange={handleChange} required className="w-full p-2 border rounded focus:ring-2 focus:ring-black">
                  <option value="basic">Basic</option>
                  <option value="business">Business</option>
                  <option value="ecommerce">eCommerce</option>
                </select>
              </div>

              {/* Pages */}
              <div>
                <label>Number of Pages</label>
                <select name="pages" onChange={handleChange} required className="w-full p-2 border rounded focus:ring-2 focus:ring-black">
                  <option value="1-5">1-5</option>
                  <option value="6-10">6-10</option>
                  <option value="11-20">11-20</option>
                  <option value="20+">20+</option>
                </select>
              </div>

              {/* Design */}
              <div>
                <label>Design Type</label>
                <select name="design" onChange={handleChange} required className="w-full p-2 border rounded focus:ring-2 focus:ring-black">
                  <option value="template">Template</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              {/* Add-On Features */}
              <h3 className="text-lg font-semibold mt-4">Add-On Features</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(fieldLabels).map(([key, label]) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input type="checkbox" name={key} checked={Boolean(formData[key as keyof FormData])} onChange={handleChange} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              {/* Add-On Hidden Inputs for Email Table */}
              {Object.entries(fieldLabels).map(([key, label]) =>
                formData[key as keyof FormData] ? (
                  <input type="hidden" name={label} value="Yes" key={key} />
                ) : null
              )}

              {/* Contact Details */}
              <div className="space-y-2">
                <input name="name" placeholder="Your Name" onChange={handleChange} required className="w-full p-3 border rounded focus:ring-2 focus:ring-black" />
                <input name="email" type="email" placeholder="Your Email" onChange={handleChange} required className="w-full p-3 border rounded focus:ring-2 focus:ring-black" />
                <textarea name="message" placeholder="Your Message" onChange={handleChange} className="w-full p-3 border rounded focus:ring-2 focus:ring-black" />
              </div>

              {/* Summary */}
              <div className="bg-gray-50 p-4 rounded mt-4 text-sm text-gray-700">
                <strong>Summary:</strong>
                <ul className="mt-2 list-disc list-inside">
                  <li>Type: {formData.type}</li>
                  <li>Pages: {formData.pages}</li>
                  <li>Design: {formData.design}</li>
                  {Object.entries(fieldLabels).map(
                    ([key, label]) =>
                      formData[key as keyof FormData] && <li key={key}>{label}</li>
                  )}
                </ul>
              </div>

              {/* Total and Submit */}
              <div className="text-xl font-bold">Total Estimate: ${getTotal()}</div>
              <button type="submit" className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800">
                Send Proposal
              </button>
            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default WebsiteCostCalculator;
