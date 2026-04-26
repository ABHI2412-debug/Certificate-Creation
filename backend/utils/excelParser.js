const xlsx = require('xlsx');

/**
 * Parses buffer of an Excel file and returns array of normalized record objects
 * @param {Buffer} fileBuffer - Buffer of the uploaded Excel file
 * @returns {Array} - Array of parsed objects representing rows
 */
const parseExcelBuffer = async (fileBuffer) => {
  try {
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { defval: '' });

    const normalized = jsonData.map((row, idx) => {
      // normalize common header names
      const studentName = String(row.studentName || row.name || row['Student Name'] || row['Full Name'] || '').trim();
      const email = String(row.email || row.Email || '').trim().toLowerCase();
      const course = String(row.course || row.Course || '').trim();
      const grade = String(row.grade || row.Grade || '').trim();
      const certificateId = String(row.certificateId || row.certId || row['Certificate ID'] || row['Cert ID'] || '').trim();
      const issueDate = row.issueDate || row.IssueDate || row.issue_date || row['Issue Date'] || '';

      return {
        studentName,
        email,
        course,
        grade,
        certificateId,
        issueDate, // controller will convert/validate as needed
        raw: row,
        rowNumber: idx + 2 // +2 approximates Excel row number assuming header row
      };
    });

    return normalized;
  } catch (error) {
    throw new Error('Error parsing Excel file: ' + (error && error.message ? error.message : error));
  }
};

module.exports = { parseExcelBuffer };
