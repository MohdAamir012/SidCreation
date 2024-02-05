const XLSX = require('xlsx');
const fs = require('fs');

const write = ({ file, sheet = 'Sheet1', data }) => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Add a worksheet to the workbook
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheet);
    
    // Write the workbook to a file
    XLSX.writeFile(workbook, file);
};

module.exports = write ;
