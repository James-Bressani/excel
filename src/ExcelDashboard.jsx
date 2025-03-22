import React, { useState, useEffect } from 'react';

const ExcelDashboard = () => {
  const [activeTab, setActiveTab] = useState('basics');
  const [activeSection, setActiveSection] = useState('introduction');
  const [inputValues, setInputValues] = useState({
    sum1: 10,
    sum2: 20,
    sum3: 30,
    lookupValue: "B001",
    ifValue: 75,
    countIfValue: "East"
  });
  
  // Add Open Sans font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Apply font to the entire document
    document.body.style.fontFamily = "'Open Sans', sans-serif";
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate VLOOKUP result
  const calculateVlookup = () => {
    const dataTable = [
      { id: "B001", product: "Laptop", price: 999 },
      { id: "B002", product: "Monitor", price: 299 },
      { id: "B003", product: "Keyboard", price: 89 },
      { id: "B004", product: "Mouse", price: 49 },
      { id: "B005", product: "Headphones", price: 129 }
    ];
    
    const result = dataTable.find(item => item.id === inputValues.lookupValue);
    return result ? result.price : "N/A";
  };

  // Calculate IF result
  const calculateIf = () => {
    const score = parseFloat(inputValues.ifValue);
    if (isNaN(score)) return "Invalid input";
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  };

  // Calculate COUNTIF
  const calculateCountIf = () => {
    const salesData = [
      { region: "East", sales: 5000 },
      { region: "West", sales: 7500 },
      { region: "East", sales: 6200 },
      { region: "North", sales: 4800 },
      { region: "South", sales: 8100 },
      { region: "East", sales: 5900 },
      { region: "West", sales: 7100 },
    ];
    
    return salesData.filter(item => item.region === inputValues.countIfValue).length;
  };

  // Sample data for pivot table
  const samplePivotData = [
    { product: "Laptop", category: "Electronics", region: "East", sales: 5400 },
    { product: "Monitor", category: "Electronics", region: "West", sales: 3200 },
    { product: "Keyboard", category: "Accessories", region: "East", sales: 1800 },
    { product: "Mouse", category: "Accessories", region: "South", sales: 1400 },
    { product: "Laptop", category: "Electronics", region: "West", sales: 6100 },
    { product: "Headphones", category: "Accessories", region: "North", sales: 2300 },
    { product: "Monitor", category: "Electronics", region: "East", sales: 2900 },
  ];

  // Simplified pivot calculation (sum sales by category)
  const pivotByCategory = {};
  samplePivotData.forEach(item => {
    if (!pivotByCategory[item.category]) {
      pivotByCategory[item.category] = 0;
    }
    pivotByCategory[item.category] += item.sales;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="mx-auto max-w-6xl bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
        <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full opacity-20 transform translate-x-1/3 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-300 rounded-full opacity-20 transform -translate-x-1/3 translate-y-1/2"></div>
          <h1 className="text-3xl font-bold relative z-10">Excel Formulas Learning Dashboard</h1>
          <p className="mt-2 text-blue-100 max-w-2xl">Interactive guide to Excel formulas and functions for data analysis</p>
        </header>
        
        {/* Navigation Tabs */}
        <div className="flex bg-white px-6 py-2 border-b border-gray-200 shadow-sm">
          <button 
            onClick={() => setActiveTab('basics')}
            className={`px-6 py-3 font-semibold rounded-t-lg transition-all duration-200 mx-1 ${activeTab === 'basics' 
              ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'}`}
          >
            Basic Functions
          </button>
          <button 
            onClick={() => setActiveTab('lookup')}
            className={`px-6 py-3 font-semibold rounded-t-lg transition-all duration-200 mx-1 ${activeTab === 'lookup' 
              ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'}`}
          >
            Lookup Functions
          </button>
          <button 
            onClick={() => setActiveTab('conditional')}
            className={`px-6 py-3 font-semibold rounded-t-lg transition-all duration-200 mx-1 ${activeTab === 'conditional' 
              ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'}`}
          >
            Conditional Functions
          </button>
          <button 
            onClick={() => setActiveTab('pivot')}
            className={`px-6 py-3 font-semibold rounded-t-lg transition-all duration-200 mx-1 ${activeTab === 'pivot' 
              ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'}`}
          >
            Pivot Tables
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 bg-gradient-to-br from-white to-blue-50">
          {/* Basic Functions */}
          {activeTab === 'basics' && (
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Basic Excel Functions</h2>
              </div>
              
              {/* SUM Function */}
              <div className="mb-8 p-6 border-l-4 border-blue-500 rounded-lg bg-white shadow-md">
                <div className="flex items-center">
                  <div className="text-blue-500 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-700">SUM Function</h3>
                </div>
                <p className="mb-4 mt-2 text-gray-700">The SUM function adds all the numbers in a range of cells, providing totals for financial reports, budgets, and data analysis.</p>
                
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-400 mb-4 shadow-sm">
                  <p className="font-mono text-blue-800 font-semibold">Syntax: =SUM(number1, [number2], ...)</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-3 flex items-center text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                    </svg>
                    Interactive Example:
                  </h4>
                  <div className="bg-white p-5 rounded-lg shadow-inner border border-blue-100">
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Value 1</label>
                        <input 
                          type="number" 
                          name="sum1"
                          value={inputValues.sum1}
                          onChange={handleInputChange}
                          className="block w-full border border-blue-200 rounded-md shadow-sm p-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Value 2</label>
                        <input 
                          type="number" 
                          name="sum2"
                          value={inputValues.sum2}
                          onChange={handleInputChange}
                          className="block w-full border border-blue-200 rounded-md shadow-sm p-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Value 3</label>
                        <input 
                          type="number" 
                          name="sum3"
                          value={inputValues.sum3}
                          onChange={handleInputChange}
                          className="block w-full border border-blue-200 rounded-md shadow-sm p-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Result</label>
                        <div className="block w-full border border-green-200 rounded-md shadow-sm p-3 bg-green-50 text-green-800 font-semibold">
                          {parseFloat(inputValues.sum1) + parseFloat(inputValues.sum2) + parseFloat(inputValues.sum3)}
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                      <p className="text-sm text-blue-800 font-mono">Formula: =SUM({inputValues.sum1}, {inputValues.sum2}, {inputValues.sum3})</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 mb-2 bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-100 shadow-sm">
                  <h4 className="font-semibold mb-2 text-blue-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Common Use Cases:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Calculate totals in financial reports and income statements
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Sum values across multiple rows or columns in large datasets
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Create budget calculations and forecasting models
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* AVERAGE Function */}
              <div className="mb-8 p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-blue-700">AVERAGE Function</h3>
                <p className="mb-2">The AVERAGE function returns the average (arithmetic mean) of its arguments.</p>
                
                <div className="bg-yellow-50 p-2 rounded border border-yellow-200 mb-3">
                  <p className="font-mono">Syntax: =AVERAGE(number1, [number2], ...)</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Example:</h4>
                  <div className="mb-2">
                    <p>Using the values from above:</p>
                    <p className="font-mono bg-gray-100 p-1 rounded">
                      =AVERAGE({inputValues.sum1}, {inputValues.sum2}, {inputValues.sum3}) = {((parseFloat(inputValues.sum1) + parseFloat(inputValues.sum2) + parseFloat(inputValues.sum3))/3).toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="mb-2">
                  <h4 className="font-medium mb-1">Common Use Cases:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li>Calculate average sales per period</li>
                    <li>Determine average scores on tests</li>
                    <li>Find average inventory levels</li>
                  </ul>
                </div>
              </div>
              
              {/* COUNT Function */}
              <div className="mb-8 p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-blue-700">COUNT Function</h3>
                <p className="mb-2">The COUNT function counts the number of cells that contain numbers.</p>
                
                <div className="bg-yellow-50 p-2 rounded border border-yellow-200 mb-3">
                  <p className="font-mono">Syntax: =COUNT(value1, [value2], ...)</p>
                </div>
                
                <div className="mb-2">
                  <h4 className="font-medium mb-1">Related Functions:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li><strong>COUNTA</strong>: Counts cells that are not empty</li>
                    <li><strong>COUNTBLANK</strong>: Counts empty cells</li>
                    <li><strong>COUNTIF</strong>: Counts cells that meet a specific condition</li>
                  </ul>
                </div>
              </div>
              
              {/* MAX and MIN Functions */}
              <div className="mb-8 p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-blue-700">MAX and MIN Functions</h3>
                <p className="mb-2">These functions return the largest and smallest values in a set of values.</p>
                
                <div className="bg-yellow-50 p-2 rounded border border-yellow-200 mb-3">
                  <p className="font-mono">Syntax: =MAX(number1, [number2], ...)</p>
                  <p className="font-mono">Syntax: =MIN(number1, [number2], ...)</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Example:</h4>
                  <div className="mb-2">
                    <p>Using the values from above:</p>
                    <p className="font-mono bg-gray-100 p-1 rounded">
                      =MAX({inputValues.sum1}, {inputValues.sum2}, {inputValues.sum3}) = {Math.max(parseFloat(inputValues.sum1), parseFloat(inputValues.sum2), parseFloat(inputValues.sum3))}
                    </p>
                    <p className="font-mono bg-gray-100 p-1 rounded mt-1">
                      =MIN({inputValues.sum1}, {inputValues.sum2}, {inputValues.sum3}) = {Math.min(parseFloat(inputValues.sum1), parseFloat(inputValues.sum2), parseFloat(inputValues.sum3))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lookup Functions */}
          {activeTab === 'lookup' && (
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Lookup Functions</h2>
              </div>
              
              {/* VLOOKUP Function */}
              <div className="mb-8 p-6 border-l-4 border-blue-500 rounded-lg bg-white shadow-md">
                <div className="flex items-center">
                  <div className="text-blue-500 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-700">VLOOKUP Function</h3>
                </div>
                <p className="mb-4 mt-2 text-gray-700">VLOOKUP searches for a value in the first column of a table and returns a value in the same row from a column you specify. Perfect for cross-referencing data across different tables.</p>
                
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-400 mb-4 shadow-sm">
                  <p className="font-mono text-blue-800 font-semibold mb-2">Syntax: =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])</p>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="font-semibold text-blue-600 mb-1">lookup_value</p>
                      <p className="text-sm text-gray-700">Value to search for in the first column of the table</p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="font-semibold text-blue-600 mb-1">table_array</p>
                      <p className="text-sm text-gray-700">Table where data is retrieved</p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="font-semibold text-blue-600 mb-1">col_index_num</p>
                      <p className="text-sm text-gray-700">Column number in the table to retrieve value from</p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="font-semibold text-blue-600 mb-1">range_lookup</p>
                      <p className="text-sm text-gray-700">TRUE = approximate match (default), FALSE = exact match</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Interactive Example:</h4>
                  
                  <div className="mb-4">
                    <p className="mb-2">Product Table:</p>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price ($)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-2">B001</td>
                          <td className="px-6 py-2">Laptop</td>
                          <td className="px-6 py-2">999</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-2">B002</td>
                          <td className="px-6 py-2">Monitor</td>
                          <td className="px-6 py-2">299</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-2">B003</td>
                          <td className="px-6 py-2">Keyboard</td>
                          <td className="px-6 py-2">89</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-2">B004</td>
                          <td className="px-6 py-2">Mouse</td>
                          <td className="px-6 py-2">49</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-2">B005</td>
                          <td className="px-6 py-2">Headphones</td>
                          <td className="px-6 py-2">129</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Enter Product ID</label>
                      <select
                        name="lookupValue"
                        value={inputValues.lookupValue}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      >
                        <option value="B001">B001</option>
                        <option value="B002">B002</option>
                        <option value="B003">B003</option>
                        <option value="B004">B004</option>
                        <option value="B005">B005</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">VLOOKUP Result (Price)</label>
                      <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100">
                        ${calculateVlookup()}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm">Formula: =VLOOKUP("{inputValues.lookupValue}", ProductTable, 3, FALSE)</p>
                </div>
                
                <div className="mb-2">
                  <h4 className="font-medium mb-1">Tips for VLOOKUP:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li>Always search for lookup value in the first column of your table</li>
                    <li>Use FALSE for exact matches (recommended in most cases)</li>
                    <li>If using TRUE, ensure your data is sorted in ascending order</li>
                    <li>VLOOKUP can't look to the left - the value must be to the right of lookup column</li>
                  </ul>
                </div>
                
                <div className="mt-4 bg-blue-50 p-3 rounded border border-blue-200">
                  <h4 className="font-medium text-blue-700">INDEX/MATCH Alternative:</h4>
                  <p className="text-sm mb-2">INDEX/MATCH is a more flexible alternative to VLOOKUP:</p>
                  <p className="font-mono text-sm">=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))</p>
                  <p className="text-sm mt-1">Advantages: Can look in any direction, more resistant to column insertions/deletions</p>
                </div>
              </div>
              
              {/* XLOOKUP Function */}
              <div className="mb-8 p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-blue-700">XLOOKUP Function (Excel 2019+)</h3>
                <p className="mb-2">XLOOKUP is the successor to VLOOKUP, designed to overcome its limitations.</p>
                
                <div className="bg-yellow-50 p-2 rounded border border-yellow-200 mb-3">
                  <p className="font-mono">Syntax: =XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])</p>
                </div>
                
                <div className="mb-2">
                  <h4 className="font-medium mb-1">Advantages of XLOOKUP:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li>Can return values from columns to the left or right</li>
                    <li>Built-in error handling with the [if_not_found] parameter</li>
                    <li>Can search from first match or last match</li>
                    <li>Can do exact, approximate, wildcard or regex matching</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Conditional Functions */}
          {activeTab === 'conditional' && (
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Conditional Functions</h2>
              </div>
              
              {/* IF Function */}
              <div className="mb-8 p-6 border-l-4 border-blue-500 rounded-lg bg-white shadow-md">
                <div className="flex items-center">
                  <div className="text-blue-500 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-700">IF Function</h3>
                </div>
                <p className="mb-4 mt-2 text-gray-700">The IF function performs a logical test and returns one value if the condition is TRUE and another if FALSE, enabling conditional logic in your spreadsheets.</p>
                
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-400 mb-4 shadow-sm">
                  <p className="font-mono text-blue-800 font-semibold">Syntax: =IF(logical_test, value_if_true, value_if_false)</p>
                  <div className="flex justify-center mt-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm max-w-lg">
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-800 p-2 rounded-full h-8 w-8 flex items-center justify-center font-bold mr-3">?</div>
                        <div>
                          <p className="font-semibold text-gray-800">How it works:</p>
                          <p className="text-gray-600 text-sm mt-1">Excel evaluates the logical_test. If TRUE, it returns value_if_true; if FALSE, it returns value_if_false.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Interactive Example:</h4>
                  <p className="mb-2">Grade calculation based on score:</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Enter Score (0-100)</label>
                      <input 
                        type="number" 
                        name="ifValue"
                        value={inputValues.ifValue}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Grade Result</label>
                      <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100">
                        {calculateIf()}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm">Formula example for A grade: =IF(score >= 90, "A", IF(score >= 80, "B", IF(score >= 70, "C", IF(score >= 60, "D", "F"))))</p>
                </div>
                
                <div className="mb-2">
                  <h4 className="font-medium mb-1">Tips for IF Function:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li>You can nest up to 64 IF functions (though avoid deep nesting for readability)</li>
                    <li>Consider IFS function for multiple conditions (Excel 2016+)</li>
                    <li>Can be combined with other functions like AND, OR for complex conditions</li>
                  </ul>
                </div>
              </div>
              
              {/* COUNTIF/SUMIF Functions */}
              <div className="mb-8 p-4 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-blue-700">COUNTIF/SUMIF Functions</h3>
                <p className="mb-2">These functions count or sum values that meet specific criteria.</p>
                
                <div className="bg-yellow-50 p-2 rounded border border-yellow-200 mb-3">
                  <p className="font-mono">COUNTIF Syntax: =COUNTIF(range, criteria)</p>
                  <p className="font-mono">SUMIF Syntax: =SUMIF(range, criteria, [sum_range])</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Interactive Example:</h4>
                  <p className="mb-2">Count occurrences of a specific region in sales data:</p>
                  
                  <div className="mb-4">
                    <p className="mb-2">Sales Data:</p>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                          <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr><td className="px-6 py-2">East</td><td className="px-6 py-2">5000</td></tr>
                        <tr><td className="px-6 py-2">West</td><td className="px-6 py-2">7500</td></tr>
                        <tr><td className="px-6 py-2">East</td><td className="px-6 py-2">6200</td></tr>
                        <tr><td className="px-6 py-2">North</td><td className="px-6 py-2">4800</td></tr>
                        <tr><td className="px-6 py-2">South</td><td className="px-6 py-2">8100</td></tr>
                        <tr><td className="px-6 py-2">East</td><td className="px-6 py-2">5900</td></tr>
                        <tr><td className="px-6 py-2">West</td><td className="px-6 py-2">7100</td></tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Enter Region</label>
                      <select
                        name="countIfValue"
                        value={inputValues.countIfValue}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      >
                        <option value="East">East</option>
                        <option value="West">West</option>
                        <option value="North">North</option>
                        <option value="South">South</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">COUNTIF Result</label>
                      <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100">
                        {calculateCountIf()}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm">Formula: =COUNTIF(A2:A8, "{inputValues.countIfValue}")</p>
                </div>
                
                <div className="mb-2">
                  <h4 className="font-medium mb-1">Related Functions:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li><strong>COUNTIFS/SUMIFS</strong>: Allow multiple criteria</li>
                    <li><strong>AVERAGEIF/AVERAGEIFS</strong>: Calculate averages with one or more conditions</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Pivot Tables */}
          {activeTab === 'pivot' && (
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Pivot Tables</h2>
              </div>
              
              <div className="mb-8 p-6 border-l-4 border-blue-500 rounded-lg bg-white shadow-md">
                <div className="flex items-center">
                  <div className="text-blue-500 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-700">Understanding Pivot Tables</h3>
                </div>
                <p className="mb-4 mt-2 text-gray-700">Pivot Tables are Excel's most powerful data analysis tool. They allow you to summarize and analyze large datasets quickly by reorganizing (or "pivoting") the data to show meaningful summaries and insights that would be difficult to see otherwise.</p>
                <div className="bg-blue-50 p-4 border border-blue-100 rounded-lg mb-4">
                  <div className="flex">
                    <div className="text-blue-500 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-blue-800">Pivot Tables transform hundreds or thousands of rows of data into meaningful summaries with just a few clicks.</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Sample Data:</h4>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {samplePivotData.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2">{item.product}</td>
                          <td className="px-4 py-2">{item.category}</td>
                          <td className="px-4 py-2">{item.region}</td>
                          <td className="px-4 py-2">${item.sales}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Simple Pivot Table Example (Sales by Category):</h4>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(pivotByCategory).map(([category, sales]) => (
                        <tr key={category}>
                          <td className="px-6 py-2">{category}</td>
                          <td className="px-6 py-2">${sales}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">How to Create a Pivot Table in Excel:</h4>
                  <ol className="list-decimal pl-5 text-sm space-y-1">
                    <li>Select your data range including headers</li>
                    <li>Go to Insert tab → PivotTable</li>
                    <li>Confirm the data range and choose where to place the pivot table</li>
                    <li>Drag fields to the appropriate areas:
                      <ul className="list-disc pl-5 mt-1">
                        <li><strong>Rows</strong>: Categories you want to group by (e.g., Product, Region)</li>
                        <li><strong>Columns</strong>: Additional categories for cross-tabulation</li>
                        <li><strong>Values</strong>: Numeric fields you want to calculate (Sum, Count, Average, etc.)</li>
                        <li><strong>Filters</strong>: Fields to filter the entire pivot table</li>
                      </ul>
                    </li>
                  </ol>
                </div>
                
                <div className="mb-2">
                  <h4 className="font-medium mb-1">Powerful Pivot Table Features:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li><strong>Value Field Settings</strong>: Change calculations from Sum to Count, Average, Min, Max, etc.</li>
                    <li><strong>Grouping</strong>: Group dates by year, quarter, month; numbers into ranges</li>
                    <li><strong>Calculated Fields</strong>: Create custom calculations within the pivot table</li>
                    <li><strong>Slicers</strong>: Visual filters that make it easy to filter data</li>
                    <li><strong>Pivot Charts</strong>: Create charts directly from pivot tables</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExcelDashboard;
