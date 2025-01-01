const xlsx = require('xlsx');

const parseExcel = (filePath) => {
    try {
        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rawData = xlsx.utils.sheet_to_json(sheet);

        if (rawData.length === 0) {
            throw new Error('Excel file is empty or invalid');
        }

        return rawData.map((row, index) => {
            const normalizedRow = {
                nameOfTheCandidate: row['Name of the Candidate'] || '',
                email: row['Email'] || '',
                mobileNo: row['Mobile No.'] || '',
                dateOfBirth: row['Date of Birth'] || '',
                workExperience: row['Work Experience'] || '',
                resumeTitle: row['Resume Title'] || '',
                currentLocation: row['Current Location'] || '',
                postalAddress: row['Postal Address'] || '',
                currentEmployer: row['Current Employer'] || '',
                currentDesignation: row['Current Designation'] || '',
            };

            Object.keys(normalizedRow).forEach(key => {
                if (!normalizedRow[key] && ['nameOfTheCandidate', 'email'].includes(key)) {
                    console.warn(`Row ${index + 1} is missing required field: ${key}`);
                }
            });

            return normalizedRow;
        });
    } catch (error) {
        console.error("Error parsing Excel file:", error.message);
        throw new Error('Failed to parse Excel file');
    }
};

module.exports = { parseExcel };
